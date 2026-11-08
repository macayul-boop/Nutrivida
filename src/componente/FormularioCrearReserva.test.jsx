import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import FormularioCrearReserva from './FormularioCrearReserva'

vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: () => ({
    usuario: { id: 10, nombre: 'Matias', rol: 'CLIENTE' },
  }),
}))

vi.mock('../services/servicioService.js', () => ({
  obtenerServicios: vi.fn(),
}))

vi.mock('../services/usuarioService.js', () => ({
  obtenerNutricionistasSimplificados: vi.fn(),
}))

vi.mock('../services/reservaService.js', () => ({
  obtenerHorasDisponibles: vi.fn(),
  crearReserva: vi.fn(),
}))

import { obtenerServicios } from '../services/servicioService'
import { obtenerNutricionistasSimplificados } from '../services/usuarioService'
import { obtenerHorasDisponibles, crearReserva } from '../services/reservaService'

describe('FormularioCrearReserva', () => {

  const nutricionistasMock = [
    {
      id: 6,
      nombre: 'Elena',
      horarioNutricionista: [
        { id: 3, diaSemana: 'martes', horaEntrada: '09:00:00', horaSalida: '18:00:00' },
        { id: 4, diaSemana: 'jueves', horaEntrada: '10:00:00', horaSalida: '18:00:00' },
      ],
    },
    {
      id: 5,
      nombre: 'Lucas',
      horarioNutricionista: [
        { id: 1, diaSemana: 'lunes', horaEntrada: '09:00:00', horaSalida: '14:00:00' },
      ],
    },
  ]

  const serviciosMock = [
    {
      id: 1,
      nombre: 'Primera consulta nutricional',
      modalidad: 'PRESENCIAL',
      descripcion: "descripcion cool",
      precio: 35000,
      duracionMinutos: 50,
    },
    {
      id: 2,
      nombre: 'Control nutricional',
      modalidad: 'PRESENCIAL',
      descripcion: "descripcion cool",
      precio: 25000,
      duracionMinutos: 30,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()

    obtenerNutricionistasSimplificados.mockResolvedValue({
      data: nutricionistasMock,
    })

    obtenerServicios.mockResolvedValue({
      data: serviciosMock,
    })

    obtenerHorasDisponibles.mockResolvedValue({
      data: ['09:00:00', '10:00:00', '11:00:00'],
    })

    crearReserva.mockResolvedValue({
      data: { id: 1, mensaje: 'OK' },
    })
  })

  it('renderiza los selects con las opciones iniciales', async () => {
    render(<FormularioCrearReserva />)

    // Esperar a que se carguen los datos iniciales
    expect(await screen.findByLabelText(/tipo consulta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nutricionista/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reservar/i })).toBeInTheDocument()

    // Verificar datos cargados del servicio por defecto (el primero)
    expect(screen.getByText(/presencial/i)).toBeInTheDocument()
    expect(screen.getByText('$35000')).toBeInTheDocument()
    expect(screen.getByText('50 min')).toBeInTheDocument()
  })

  it('muestra un mensaje de error si se intenta reservar sin seleccionar un día', async () => {
    const user = userEvent.setup()
    render(<FormularioCrearReserva />)

    const botonReservar = await screen.findByRole('button', { name: /reservar/i })
    await user.click(botonReservar)

    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()
  })

  it('permite cambiar de nutricionista', async () => {
    const user = userEvent.setup()
    render(<FormularioCrearReserva />)

    const selectNutricionista = await screen.findByLabelText(/nutricionista/i)
    await user.selectOptions(selectNutricionista, '5')

    expect(selectNutricionista).toHaveValue('5')
  })

  it('completa el flujo de selección de día y envío de reserva', async () => {
    const user = userEvent.setup()
    render(<FormularioCrearReserva />)

    await screen.findByLabelText(/nutricionista/i)

    // Seleccionar el primer día disponible en SelectorDia
    const botonesDias = screen.getAllByRole('button', { name: /nov|dic|ene|feb|mar|abr|may|jun|jul|ago|sep|oct/i })
    await user.click(botonesDias[0])

    // Esperar a que se carguen las horas disponibles y seleccionar una
    const botonHora = await screen.findByRole('button', { name: /09:00/i })
    await user.click(botonHora)

    // Hacer clic en Reservar
    const botonReservar = screen.getByRole('button', { name: /reservar/i })
    await user.click(botonReservar)

    // Verificar que se haya llamado a la función de API para crear la reserva
    expect(crearReserva).toHaveBeenCalledTimes(1)
    expect(await screen.findByText(/¡reserva creada con exito!/i)).toBeInTheDocument()
  })
})