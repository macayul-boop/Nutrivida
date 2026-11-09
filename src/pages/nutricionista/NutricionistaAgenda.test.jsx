import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import NutricionistaAgenda from './NutricionistaAgenda'
import axiosClient from '../../api/axiosClient'
import { obtenerReservasDeUnNutricionista } from '../../services/reservaService'


vi.mock('../../context/AuthContext', () => ({
  useAuth: ()  => ({
    usuario: { id:5, email: 'nutricionista1@gmail.com'}
  }),
}))

vi.mock('../../api/axiosClient', () => ({
  default: {
    get: vi.fn(),
  },
}))


vi.mock('../../services/reservaService', () => ({
  obtenerReservasDeUnNutricionista: vi.fn(),
}))


describe('NutricionistaAgenda', () => {

  const mockHorarios = [
    {id:1, diaSemana: 'lunes', horaInicio: '09:00', horaFinal: '13:00'},
    {id:2, diaSemana: 'martes', horaInicio: '09:00', horaFinal: '13:00'}
  ]

  const mockReservas = [
    {
      id: 101,
      nombreServicio: 'Consulta Nutricional',
      estado: 'RESERVADA',
      fecha: '2026-11-09',
      horaInicio: '10:00',
      datosClientes: {
        nombre: 'mateo',
        apellidos: 'gonzales',
        rut: '712457293',
      },
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    axiosClient.get.mockResolvedValue({ data: {horarios: mockHorarios}})
    obtenerReservasDeUnNutricionista.mockResolvedValue({data: mockReservas})
  })


  it('muestra el título principal y el mensaje "Selecciona un dia" al cargar', async() => {
    render(<NutricionistaAgenda />)

    expect(screen.getByRole('heading', { name: /agenda/i })).toBeInTheDocument()

    expect(screen.getByText('Selecciona un día')).toBeInTheDocument()
    expect(screen.queryByText('No hay citas')).not.toBeInTheDocument()
  })

  it('renderiza los botones del calendario SelectorDia', async() => {
    render(<NutricionistaAgenda />)

    const botonesDias = await screen.findAllByRole('button')
    expect(botonesDias.length).toBeGreaterThan(0)
  })

  it('hace desaparecer el mensaje inicial al hacer clic en un día del calendario', async () => {
    const user = userEvent.setup()
    render(<NutricionistaAgenda />)

    const botonesDias = await screen.findAllByRole('button')

    await user.click(botonesDias[0])

    await waitFor(() => {
      expect(screen.queryByText(/Selecciona un día/i)).not.toBeInTheDocument()
    })
  })


  it('muestras las reservas o el mensaje vacante según la respuesta de la API', async() => {
    const user = userEvent.setup()
    render(<NutricionistaAgenda />)

    const botonesDias = await screen.findAllByRole('button')
    await user.click(botonesDias[0])

    const clienteNombre = await screen.findByText(/mateo/i)
    expect(clienteNombre).toBeInTheDocument()
  })


  it('muestra "no hay reservas agendadas" si la lista esta vacia', async () => {
    obtenerReservasDeUnNutricionista.mockResolvedValueOnce({data: []})
    const user = userEvent.setup()
    render(<NutricionistaAgenda />)

    const botonesDias = await screen.findAllByRole('button')

    await user.click(botonesDias[0])

    const mensajeVacio = await screen.findByText(/no hay reservas agendadas/i)

    expect(mensajeVacio).toBeInTheDocument()
  })

})