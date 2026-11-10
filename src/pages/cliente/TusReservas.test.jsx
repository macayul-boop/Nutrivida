import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TusReservas from './TusReservas'
import { obtenerReservasDeUnCliente, editarReservaCliente, cancelarReservaCliente, obtenerHorasDisponibles } from '../../services/reservaService'
import { obtenerUnServicio } from '../../services/servicioService'
import { obtenerNutricionistaSimplificado } from '../../services/usuarioService'

vi.mock('../../services/reservaService', ()=>({
    obtenerReservasDeUnCliente: vi.fn(),
    editarReservaCliente: vi.fn(),
    cancelarReservaCliente: vi.fn(),
    obtenerHorasDisponibles: vi.fn()
}))
vi.mock('../../services/servicioService', ()=>({obtenerUnServicio: vi.fn()}))
vi.mock('../../services/usuarioService', ()=>({obtenerNutricionistaSimplificado: vi.fn()}))

const reserva = {
    id:74,
    idCliente:7,
    idServicio:3,
    idNutricionista:6,
    nombreServicio:'Consulta nutricional',
    datosNutricionista:{id:6, nombre:'Felipe Araya'},
    fecha:'2099-10-15',
    horaInicio:'14:00:00',
    horaTermino:'15:00:00',
    estado:'RESERVADA'
}

describe('TusReservas', ()=>{
    beforeEach(()=>{
        vi.resetAllMocks()
        obtenerReservasDeUnCliente.mockResolvedValue({data:[reserva]})
        obtenerUnServicio.mockResolvedValue({
            data:{id:3, modalidad:'PRESENCIAL', precio:25000, duracionMinutos:60}
        })
        obtenerNutricionistaSimplificado.mockResolvedValue({
            data:{...reserva.datosNutricionista, horarioNutricionista:[{diaSemana:'martes'}]}
        })
        obtenerHorasDisponibles.mockResolvedValue({data:['09:00:00']})
    })

    it('carga las citas del cliente autenticado y separa las próximas del historial', async ()=>{
        obtenerReservasDeUnCliente.mockResolvedValue({data:[
            {...reserva, id:75, nombreServicio:'Consulta anterior', fecha:'2020-01-01'},
            {...reserva, id:76, nombreServicio:'Consulta cancelada', estado:'CANCELADA'},
            {...reserva, id:77, nombreServicio:'Consulta más lejana', fecha:'2099-12-01'},
            reserva
        ]})
        render(<TusReservas/>)
        expect(screen.getByRole('status')).toHaveTextContent('Cargando reservas')
        await screen.findByRole('heading', {name:'Consulta nutricional'})
        expect(obtenerReservasDeUnCliente).toHaveBeenCalledWith()
        const tarjetas = screen.getAllByRole('article')
        expect(tarjetas[0]).toHaveTextContent('Consulta nutricional')
        expect(within(tarjetas[0]).getByText('15/10/2099 · 14:00 – 15:00')).toBeInTheDocument()
        expect(tarjetas[1]).toHaveTextContent('Consulta más lejana')
        expect(within(tarjetas[0]).getByText('Felipe Araya')).toBeInTheDocument()
        expect(tarjetas[2]).toHaveTextContent('Consulta cancelada')
        expect(tarjetas[3]).toHaveTextContent('Consulta anterior')
        expect(within(tarjetas[2]).queryByRole('button')).not.toBeInTheDocument()
        expect(within(tarjetas[3]).queryByRole('button')).not.toBeInTheDocument()
    })

    it('muestra un error de carga y permite reintentar', async ()=>{
        const user = userEvent.setup()
        obtenerReservasDeUnCliente.mockRejectedValueOnce(new Error('Sin conexión'))
        obtenerReservasDeUnCliente.mockResolvedValueOnce({data:[]})
        render(<TusReservas/>)

        expect(await screen.findByRole('alert')).toHaveTextContent('No se pudieron cargar tus reservas')
        await user.click(screen.getByRole('button', {name:'Volver a intentar'}))
        expect(await screen.findByText('No tienes reservas próximas.')).toBeInTheDocument()
    })

    it('consulta los horarios reales y envía solo fecha y hora junto al ID de la reserva', async ()=>{
        const user = userEvent.setup()
        editarReservaCliente.mockImplementation(async (_,datos)=>({
            data:{...reserva, ...datos, horaTermino:'10:00:00'}
        }))
        render(<TusReservas/>)

        await user.click(await screen.findByRole('button', {name:'Cambiar hora'}))
        const form = within(screen.getByRole('dialog', {name:'Cambiar hora'}))
        const dias = within(await form.findByText('Días disponibles').then((nodo)=> nodo.parentElement))
        await user.click(dias.getAllByRole('button', {name:/^\d/})[0])
        await user.click(await form.findByRole('button', {name:'09:00:00 hrs'}))
        await user.click(form.getByRole('button', {name:'Reservar'}))

        expect(obtenerUnServicio).toHaveBeenCalledWith(reserva.idServicio)
        expect(obtenerNutricionistaSimplificado).toHaveBeenCalledWith(reserva.idNutricionista)
        const [, , fecha] = obtenerHorasDisponibles.mock.calls[0]
        expect(obtenerHorasDisponibles).toHaveBeenCalledWith(reserva.idNutricionista, reserva.idServicio, fecha)
        expect(editarReservaCliente).toHaveBeenCalledWith(reserva.id, {fecha, horaInicio:'09:00:00'})
        expect(await screen.findByText(/09:00 – 10:00/)).toBeInTheDocument()
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('mantiene el formulario abierto si el backend rechaza el nuevo horario', async ()=>{
        const user = userEvent.setup()
        editarReservaCliente.mockRejectedValue({response:{status:409}})
        render(<TusReservas/>)

        await user.click(await screen.findByRole('button', {name:'Cambiar hora'}))
        const form = within(screen.getByRole('dialog', {name:'Cambiar hora'}))
        const dias = within(await form.findByText('Días disponibles').then((nodo)=> nodo.parentElement))
        await user.click(dias.getAllByRole('button', {name:/^\d/})[0])
        await user.click(await form.findByRole('button', {name:'09:00:00 hrs'}))
        await user.click(form.getByRole('button', {name:'Reservar'}))

        expect(await form.findByRole('alert')).toHaveTextContent('No se pudo confirmar ese horario')
        expect(screen.getByText(/14:00 – 15:00/)).toBeInTheDocument()
        expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('mueve una cita al historial solo si el backend confirma la cancelación', async ()=>{
        const user = userEvent.setup()
        cancelarReservaCliente.mockRejectedValueOnce(new Error('Sin conexión'))
        cancelarReservaCliente.mockResolvedValueOnce({data:{...reserva, estado:'CANCELADA'}})
        render(<TusReservas/>)

        await user.click(await screen.findByRole('button', {name:'Cancelar', exact:true}))
        const modal = within(screen.getByRole('dialog'))
        await user.click(modal.getByRole('button', {name:'Cancelar reserva'}))

        expect(await modal.findByRole('alert')).toHaveTextContent('No se pudo cancelar la reserva')
        expect(screen.getByText('Reservada')).toBeInTheDocument()
        await user.click(modal.getByRole('button', {name:'Cancelar reserva'}))

        expect(cancelarReservaCliente).toHaveBeenLastCalledWith(reserva.id)
        expect(await screen.findByText('Cancelada')).toBeInTheDocument()
        expect(screen.getByText('No tienes reservas próximas.')).toBeInTheDocument()
        expect(screen.queryByRole('button', {name:'Cambiar hora'})).not.toBeInTheDocument()
    })
})
