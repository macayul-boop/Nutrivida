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

describe('FormularioCrearReservaSecreatario', () => {

  beforeEach(() => {
    vi.clearAllMocks()

    obtenerServicios.mockResolvedValue({
      data: [
        {
          id: 1,
          nombre: 'Primera consulta nutricional',
          descripcion: 'Descripcion',
          modalidad: 'Presencial',
          precio: 30000,
          duracionMinutos: 30,
        },
        {
          id: 2,
          nombre: 'Control nutricional (seguimiento)',
          descripcion: 'Seguimiento mensual.',
          modalidad: 'PRESENCIAL',
          precio: 25000,
          duracionMinutos: 30,
        },
      ],
    })

    obtenerNutricionistasSimplificados.mockResolvedValue({
      data: [
        {
          id: 6,
          nombre: 'elena',
          horarioNutricionista: [
            { id: 3, diaSemana: 'martes', horaEntrada: '09:00:00', horaSalida: '18:00:00' },
          ],
        },
        {
          id: 5,
          nombre: 'lucas',
          horarioNutricionista: [
            { id: 1, diaSemana: 'lunes', horaEntrada: '09:00:00', horaSalida: '14:00:00' },
          ],
        },
      ],
    })

    obtenerClientesSimplificados.mockResolvedValue({
      data: [
        { id: 1, nombre: 'santiago', rutCliente: '624345261' },
        { id: 2, nombre: 'sofia', rutCliente: '731892834' },
      ],
    })

    obtenerHorasDisponibles.mockResolvedValue({
      data: ['09:00', '10:00', '11:00'],
    })
  })

  it('muestra todos los selectores y la información del primer servicio', async () => {
    render(<FormularioCrearReservaSecreatario onCerrarModal={vi.fn()} onGuardar={vi.fn()} />)

    expect(await screen.findByLabelText(/cliente/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tipo consulta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nutricionista/i)).toBeInTheDocument()

    expect(screen.getByText('Presencial')).toBeInTheDocument()
    expect(screen.getByText('$30000')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
  })

  it('permite cambiar el cliente, tipo de consulta y nutricionista', async () => {
    const user = userEvent.setup()
    render(<FormularioCrearReservaSecreatario onCerrarModal={vi.fn()} onGuardar={vi.fn()} />)

    // Usar findByLabelText para esperar que finalice la carga de cargando=false
    const selectCliente = await screen.findByLabelText(/cliente/i)
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

    const botonCancelar = await screen.findByRole('button', { name: /cancelar/i })
    await user.click(botonCancelar)

    expect(mockCerrarModal).toHaveBeenCalledTimes(1)
  })

})