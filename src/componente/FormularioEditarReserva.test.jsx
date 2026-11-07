import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import FormularioEditarReserva from './FormularioEditarReserva'

const reservaMock = {
        datosClientes: {
            id: 1,
            nombre: "santiago",
            rutCliente: "624345261"
        },
        datosNutricionista: {
            horarioNutricionista: [
                {
                    id: 3,
                    diaSemana: "martes",
                    horaEntrada: "09:00:00",
                    horaSalida: "18:00:00"
                },
                {
                    id: 4,
                    diaSemana: "jueves",
                    horaEntrada: "10:00:00",
                    horaSalida: "18:00:00"
                }
            ],
            id: 6,
            nombre: "elena"
        },
        estado: "RESERVADA",
        fecha: "2099-11-05",
        horaInicio: "13:00:00",
        horaTermino: "13:50:00",
        id: 1,
        idCliente: 1,
        idNutricionista: 6,
        idServicio: 1,
        nombreServicio: "Primera consulta nutricional"
    }

// 1. MOCKEAR LOS SERVICIOS
vi.mock('../services/servicioService', () => ({
  obtenerUnServicio: vi.fn(),
}))

vi.mock('../services/usuarioService', () => ({
  obtenerNutricionistaSimplificado: vi.fn(),
}))

vi.mock('../services/reservaService', () => ({
  obtenerHorasDisponibles: vi.fn(),
}))

import { obtenerUnServicio } from '../services/servicioService'
import { obtenerNutricionistaSimplificado } from '../services/usuarioService'
import { obtenerHorasDisponibles } from '../services/reservaService'
  
describe('FormularioEditarReserva', () => {

  beforeEach(() => {
    vi.clearAllMocks()

    // 2. DEFINIR LAS RESPUESTAS POR DEFECTO PARA CADA SERVICIO
    obtenerUnServicio.mockResolvedValue({
      data: {
        id: 1,
        nombre: 'Primera consulta nutricional',
        descripcion: 'Descripcion',
        modalidad: 'PRESENCIAL',
        precio: 30000,
        duracionMinutos: 30,
      }
    })

    obtenerNutricionistaSimplificado.mockResolvedValue({
      data: {
        horarioNutricionista: [
          {
            id: 3,
            diaSemana: "martes",
            horaEntrada: "09:00:00",
            horaSalida: "18:00:00"
          },
          {
            id: 4,
            diaSemana: "jueves",
            horaEntrada: "10:00:00",
            horaSalida: "18:00:00"
          }
        ],
        id: 6,
        nombre: "elena"
      }
    })

    obtenerHorasDisponibles.mockResolvedValue({
      data: ['09:00', '10:00', '11:00'],
    })
  })

  it('obtiene y muestra la información del servicio según la prop datos', async () => {
    render(
      <FormularioEditarReserva
        datos={reservaMock}
        onCerrarModal={vi.fn()}
        onGuardar={vi.fn()}
      />
    )
    expect(obtenerUnServicio).toHaveBeenCalledWith(reservaMock.idServicio)
    expect(obtenerNutricionistaSimplificado).toHaveBeenCalledWith(reservaMock.idNutricionista)

    // Como useEffect es asíncrono, se utiliza findByText (que internamente espera a que aparezca en el DOM)
    expect(await screen.findByText('PRESENCIAL')).toBeInTheDocument()
    expect(await screen.findByText('$30000')).toBeInTheDocument()
    expect(await screen.findByText('30 min')).toBeInTheDocument()
  })

  it('ejecuta la función onCerrarModal al presionar Cancelar', async () => {
    const user = userEvent.setup()
    const mockCerrarModal = vi.fn()

    render(
      <FormularioEditarReserva
        datos={reservaMock}
        onCerrarModal={mockCerrarModal}
        onGuardar={vi.fn()}
      />
    )

    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(mockCerrarModal).toHaveBeenCalled()
  })

  it('muestra mensajes de error si intenta guardar sin haber seleccionado día', async () => {
    const user = userEvent.setup()
    const mockGuardar = vi.fn()

    render(
      <FormularioEditarReserva
        datos={reservaMock}
        onCerrarModal={vi.fn()}
        onGuardar={mockGuardar}
      />
    )

    await screen.findByText('Presencial')
    await user.click(screen.getByRole('button', { name: /reservar/i }))

    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()

    expect(mockGuardar).not.toHaveBeenCalled()
  })

  /* it('envía los datos actualizados cuando se selecciona un día disponible', async () => {
    const user = userEvent.setup()
    const mockGuardar = vi.fn()
    const mockCerrarModal = vi.fn()

    render(
      <FormularioEditarReserva
        datos={reservaPrueba}
        onCerrarModal={mockCerrarModal}
        onGuardar={mockGuardar}
      />
    )

    const botonesDias = screen.getAllByRole('button')
    await user.click(botonesDias[0])

    await user.click(screen.getByRole('button', { name: /reservar/i }))
    expect(screen.queryByText('Selecciona un dia')).not.toBeInTheDocument()
  }) */

})