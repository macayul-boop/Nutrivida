import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import FormularioCrearReservaSecreatario from './FormularioCrearReservaSecretario'

// 1. MOCKEAR LOS SERVICIOS
vi.mock('../services/servicioService', () => ({
  obtenerServicios: vi.fn(),
}))

vi.mock('../services/usuarioService', () => ({
  obtenerNutricionistasSimplificados: vi.fn(),
  obtenerClientesSimplificados: vi.fn(),
}))

vi.mock('../services/reservaService', () => ({
  obtenerHorasDisponibles: vi.fn(),
}))


import { obtenerServicios } from '../services/servicioService'
import { obtenerNutricionistasSimplificados, obtenerClientesSimplificados } from '../services/usuarioService'
import { obtenerHorasDisponibles } from '../services/reservaService'

beforeEach(() => {
    vi.clearAllMocks()

    // 2. DEFINIR LAS RESPUESTAS POR DEFECTO PARA CADA SERVICIO
    obtenerServicios.mockResolvedValue({
      data: [{
        id: 1,
        nombre: 'Primera consulta nutricional',
        descripcion: 'Descripcion',
        modalidad: 'PRESENCIAL',
        precio: 30000,
        duracionMinutos: 30,
      },
      {
        descripcion: "Seguimiento mensual: medición de indicadores y ajuste del plan vigente.",
        duracionMinutos: 30,
        id: 2,
        modalidad: "PRESENCIAL",
        nombre: "Control nutricional (seguimiento)",
        precio: 25000
      }]
    })

    obtenerNutricionistasSimplificados.mockResolvedValue({
      data: [{
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
      {
        horarioNutricionista: [
            {
              id: 1,
              diaSemana: "lunes",
              horaEntrada: "09:00:00",
              horaSalida: "14:00:00"
            },
            {
              id: 2,
              diaSemana: "miercoles",
              horaEntrada: "10:00:00",
              horaSalida: "18:00:00"
            }
        ],
        id: 5,
        nombre: "lucas"
      }]
    })

    obtenerClientesSimplificados.mockResolvedValue({
      data:[{
        id: 1,
        nombre: "santiago",
        rutCliente: "624345261"
      },
      {
        id: 2,
        nombre: "sofia",
        rutCliente: "731892834"
      }]
    })

    obtenerHorasDisponibles.mockResolvedValue({
      data: ['09:00', '10:00', '11:00'],
    })
  })


describe('FormularioCrearReservaSecreatario', () => {

  it('muestra todos los selectores y la información del primer servicio', async () => {
    render(<FormularioCrearReservaSecreatario onCerrarModal={vi.fn()} onGuardar={vi.fn()} />)

    // Esperar a que los datos asíncronos se carguen y se renderice el formulario
    expect(await screen.findByLabelText(/cliente/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tipo consulta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nutricionista/i)).toBeInTheDocument()

    // Verificar datos del servicio seleccionado por defecto (el primero de la lista)
    expect(screen.getByText('PRESENCIAL')).toBeInTheDocument()
    expect(screen.getByText('$30000')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
  })

  it('permite cambiar el cliente, tipo de consulta y nutricionista', async () => {
    const user = userEvent.setup()
    render(<FormularioCrearReservaSecreatario onCerrarModal={vi.fn()} onGuardar={vi.fn()} />)

    const selectCliente = screen.getByLabelText(/cliente/i)
    const selectConsulta = screen.getByLabelText(/tipo consulta/i)
    const selectNutricionista = screen.getByLabelText(/nutricionista/i)

    await user.selectOptions(selectCliente, '2')
    await user.selectOptions(selectConsulta, '2')
    await user.selectOptions(selectNutricionista, '5')

    expect(selectCliente).toHaveValue('2')
    expect(selectConsulta).toHaveValue('2')
    expect(selectNutricionista).toHaveValue('5')
  })

  it('muestra mensajes de error si se presiona Reservar sin haber elegido fecha y hora', async () => {
    const user = userEvent.setup()
    const mockGuardar = vi.fn()

    render(<FormularioCrearReservaSecreatario onCerrarModal={vi.fn()} onGuardar={mockGuardar} />)

    const botonReservar = await screen.findByRole('button', { name: /reservar/i })
    await user.click(botonReservar)

    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()
    expect(mockGuardar).not.toHaveBeenCalled()
  })

  it('ejecuta la función onCerrarModal al presionar el botón Cancelar', async () => {
    const user = userEvent.setup()
    const mockCerrarModal = vi.fn()

    render(<FormularioCrearReservaSecreatario onCerrarModal={mockCerrarModal} onGuardar={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(mockCerrarModal).toHaveBeenCalled()
  })

})