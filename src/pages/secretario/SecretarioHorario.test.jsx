import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach} from 'vitest'
import SecretarioHorario from './SecretarioHorario'

vi.mock('../../services/usuarioService.js', () => ({
  obtenerNutricionistasSimplificados: vi.fn(),
}))

vi.mock('../../services/reservaService.js', () => ({
  obtenerReservasDeUnNutricionista: vi.fn(),
}))

import { obtenerNutricionistasSimplificados } from '../../services/usuarioService'
import { obtenerReservasDeUnNutricionista } from '../../services/reservaService'

describe('SecretarioHorario', () => {

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
        { id: 2, diaSemana: 'miercoles', horaEntrada: '10:00:00', horaSalida: '18:00:00' },
      ],
    },
  ]

  const reservasMock = [
    {
      id: 1,
      idNutricionista: 6,
      idCliente: 1,
      nombreConsulta: 'Primera consulta nutricional',
      fecha: '2026-11-10',
      horaInicio: '10:30',
      estado: 'RESERVADA',
      datosClientes: {
        id: 1,
        nombre: 'Santiago',
        rutCliente: '624345261',
      },
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()

    // Respuestas predeterminadas de los servicios
    obtenerNutricionistasSimplificados.mockResolvedValue({
      data: nutricionistasMock,
    })

    obtenerReservasDeUnNutricionista.mockResolvedValue({
      data: reservasMock,
    })
  })

  it('renderiza la vista inicial con el título, el selector de nutricionista y el mensaje "Selecciona un dia"', async () => {
    render(<SecretarioHorario />)

    expect(screen.getByRole('heading', { name: /horarios agenda/i })).toBeInTheDocument()

    // Esperar a que los nutricionistas se carguen en el select
    const selectNutricionista = await screen.findByLabelText(/nutricionista/i)
    expect(selectNutricionista).toBeInTheDocument()
    
    // Verifica que por defecto se seleccione el ID del primer nutricionista (6 en nuestro mock)
    expect(selectNutricionista).toHaveValue('6')
    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()
  })

  it('permite cambiar de nutricionista y resetea la fecha seleccionada', async () => {
    const user = userEvent.setup()
    render(<SecretarioHorario />)

    const selectNutricionista = await screen.findByLabelText(/nutricionista/i)

    // Hacer clic en el primer día disponible del SelectorDia
    const botonesDias = screen.getAllByRole('button')
    await user.click(botonesDias[0])

    // El mensaje de "Selecciona un dia" desaparece al elegir una fecha
    expect(screen.queryByText('Selecciona un dia')).not.toBeInTheDocument()

    // Cambiar al segundo nutricionista (ID: 5)
    await user.selectOptions(selectNutricionista, '5')

    expect(selectNutricionista).toHaveValue('5')
    // Al cambiar de nutricionista, la fecha se resetea a null y vuelve el mensaje inicial
    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()
  })

  it('muestra las reservas o el mensaje "No hay citas" al hacer clic en un día del calendario', async () => {
    const user = userEvent.setup()
    render(<SecretarioHorario />)

    await screen.findByLabelText(/nutricionista/i)

    const botonesDias = screen.getAllByRole('button')
    await user.click(botonesDias[0])

    // Verificar que se llamó al servicio para obtener las reservas del nutricionista y fecha seleccionada
    expect(obtenerReservasDeUnNutricionista).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Selecciona un dia')).not.toBeInTheDocument()

    const mensajeNoHayCitas = screen.queryByText('No hay citas')
    const reservaCliente = screen.queryByText(/santiago/i)

    expect(mensajeNoHayCitas || reservaCliente).toBeTruthy()
  })

})