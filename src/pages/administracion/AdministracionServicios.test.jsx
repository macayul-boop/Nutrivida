import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import AdministracionServicios from './AdministracionServicios'
import { obtenerServicios, crearServicio, editarServicio, eliminarServicio } from '../../services/servicioService'

vi.mock('../../services/servicioService', ()=>({
    obtenerServicios: vi.fn(),
    crearServicio: vi.fn(),
    editarServicio: vi.fn(),
    eliminarServicio: vi.fn()
}))

const servicio = {
    id: 42,
    nombre: 'Control nutricional',
    descripcion: 'Seguimiento nutricional',
    precio: 25000,
    duracionMinutos: 30,
    modalidad: 'PRESENCIAL'
}

describe('AdministracionServicios', ()=>{
    beforeEach(()=>{
        vi.resetAllMocks()
        obtenerServicios.mockResolvedValue({data:[servicio]})
    })

    it('carga los servicios del backend', async ()=>{
        render(<AdministracionServicios/>)
        expect(screen.getByRole('status')).toHaveTextContent('Cargando servicios')
        expect(await screen.findByText(servicio.nombre)).toBeInTheDocument()
        expect(screen.getByText('30 minutos')).toBeInTheDocument()
        expect(screen.getByText('Presencial')).toBeInTheDocument()
    })

    it('reintenta la carga y distingue una lista vacía de un error', async ()=>{
        const user = userEvent.setup()
        obtenerServicios.mockRejectedValueOnce(new Error('Sin conexión'))
        obtenerServicios.mockResolvedValueOnce({data:[]})
        render(<AdministracionServicios/>)

        expect(await screen.findByRole('alert')).toHaveTextContent('No se pudieron cargar')
        await user.click(screen.getByRole('button', {name:'Volver a intentar'}))
        expect(await screen.findByText('No hay servicios registrados.')).toBeInTheDocument()
    })

    it('crea un servicio y vuelve a leer la lista con el ID del servidor', async ()=>{
        const user = userEvent.setup()
        const nuevo = {
            nombre:'Consulta online',
            descripcion:'Consulta por videollamada',
            precio:30000,
            duracionMinutos:45,
            modalidad:'ONLINE'
        }
        crearServicio.mockImplementation(async (datos)=>{
            const creado = {id:85, ...datos}
            obtenerServicios.mockResolvedValue({data:[servicio, creado]})
            return {data:creado}
        })
        render(<AdministracionServicios/>)
        await screen.findByText(servicio.nombre)

        await user.click(screen.getByRole('button', {name:'Crear servicio'}))
        const form = within(screen.getByRole('dialog', {name:'Crear servicio'}))
        await user.type(form.getByLabelText('Nombre'), nuevo.nombre)
        await user.type(form.getByLabelText('Descripción'), nuevo.descripcion)
        await user.type(form.getByLabelText('Precio'), String(nuevo.precio))
        await user.type(form.getByLabelText('Duración en minutos'), String(nuevo.duracionMinutos))
        await user.selectOptions(form.getByLabelText('Modalidad'), nuevo.modalidad)
        await user.click(form.getByRole('button', {name:'Guardar'}))

        expect(crearServicio).toHaveBeenCalledWith(nuevo)
        expect(await screen.findByText(nuevo.nombre)).toBeInTheDocument()
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('edita con el ID original y muestra el nombre de la lista actualizada', async ()=>{
        const user = userEvent.setup()
        const actualizado = {...servicio, nombre:'Control avanzado'}
        editarServicio.mockImplementation(async ()=>{
            obtenerServicios.mockResolvedValue({data:[actualizado]})
            return {data:{...actualizado, nombre:actualizado.descripcion}}
        })
        render(<AdministracionServicios/>)

        await user.click(await screen.findByRole('button', {name:'Editar Control nutricional'}))
        const form = within(screen.getByRole('dialog', {name:'Editar servicio'}))
        expect(form.getByLabelText('Descripción')).toHaveValue(servicio.descripcion)
        await user.clear(form.getByLabelText('Nombre'))
        await user.type(form.getByLabelText('Nombre'), actualizado.nombre)
        await user.click(form.getByRole('button', {name:'Guardar'}))

        expect(editarServicio).toHaveBeenCalledWith(servicio.id, {
            nombre:actualizado.nombre,
            descripcion:servicio.descripcion,
            precio:servicio.precio,
            duracionMinutos:servicio.duracionMinutos,
            modalidad:servicio.modalidad
        })
        expect(await screen.findByText(actualizado.nombre)).toBeInTheDocument()
    })

    it('no elimina si se cierra la confirmación', async ()=>{
        const user = userEvent.setup()
        render(<AdministracionServicios/>)

        await user.click(await screen.findByRole('button', {name:'Eliminar Control nutricional'}))
        await user.click(within(screen.getByRole('dialog')).getByRole('button', {name:'Cancelar'}))

        expect(eliminarServicio).not.toHaveBeenCalled()
        expect(screen.getByText(servicio.nombre)).toBeInTheDocument()
    })

    it('mantiene la confirmación si falla y retira el servicio tras el DELETE exitoso', async ()=>{
        const user = userEvent.setup()
        eliminarServicio.mockRejectedValueOnce(new Error('Sin conexión'))
        eliminarServicio.mockImplementationOnce(async ()=>{
            obtenerServicios.mockResolvedValue({data:[]})
        })
        render(<AdministracionServicios/>)

        await user.click(await screen.findByRole('button', {name:'Eliminar Control nutricional'}))
        const modal = within(screen.getByRole('dialog'))
        expect(modal.getByText(/se eliminarán las reservas asociadas/)).toBeInTheDocument()
        await user.click(modal.getByRole('button', {name:'Eliminar'}))

        expect(await modal.findByRole('alert')).toHaveTextContent('No se pudo eliminar')
        expect(screen.getByText(servicio.nombre)).toBeInTheDocument()
        await user.click(modal.getByRole('button', {name:'Eliminar'}))

        expect(eliminarServicio).toHaveBeenLastCalledWith(servicio.id)
        expect(await screen.findByText('No hay servicios registrados.')).toBeInTheDocument()
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
})
