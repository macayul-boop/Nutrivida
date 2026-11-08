import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import SecretarioReserva from './SecretarioReserva'

// 1. MOCKEAR LOS SERVICIOS
vi.mock('../../services/usuarioService.js', () => ({
  obtenerReservasDeUnCliente: vi.fn(),
}))

vi.mock('../../services/reservaService.js', () => ({
  obtenerTodasReservas: vi.fn(),
  cancelarReservaSecretario: vi.fn(),
  editarReservaSecretario: vi.fn(),
}))

import { obtenerReservasDeUnCliente } from '../../services/usuarioService'
import { obtenerTodasReservas } from '../../services/reservaService'

describe('SecretarioReserva', () => {

  const listaReservasMock = [
    {
      id: 1,
      idCliente: 1,
      idNutricionista: 6,
      idServicio: 1,
      nombreServicio: "Primera consulta nutricional",
      fecha: "2026-11-05",
      horaInicio: "13:00:00",
      horaTermino: "13:50:00",
      estado: "RESERVADA",
      datosClientes: {
        id: 1,
        nombre: "santiago",
        rutCliente: "624345261"
      },
      datosNutricionista: {
        id: 6,
        nombre: "elena",
        horarioNutricionista: []
      }
    },
    {
      id: 2,
      idCliente: 2,
      idNutricionista: 5,
      idServicio: 1,
      nombreServicio: "Primera consulta nutricional",
      fecha: "2026-11-09",
      horaInicio: "09:50:00",
      horaTermino: "10:40:00",
      estado: "CANCELADA",
      datosClientes: {
        id: 2,
        nombre: "sofia",
        rutCliente: "731892834"
      },
      datosNutricionista: {
        id: 5,
        nombre: "lucas",
        horarioNutricionista: []
      }
    }
  ]


  beforeEach(() => {
    vi.clearAllMocks()

    obtenerTodasReservas.mockResolvedValue({
      data: listaReservasMock
    })

    obtenerReservasDeUnCliente.mockResolvedValue({
      data: [listaReservasMock[0]]
    })
  })

  it('renderiza la tabla con los encabezados y la información cargada', async () => {
    render(<SecretarioReserva />)

    expect(screen.getByRole('heading', { name: /reservas/i })).toBeInTheDocument()

    expect(screen.getByText('Cliente')).toBeInTheDocument()
    expect(screen.getByText('Nutricionista')).toBeInTheDocument()
    expect(screen.getByText('Fecha y Hora')).toBeInTheDocument()
    expect(screen.getByText('Estado')).toBeInTheDocument()

    expect(await screen.findByText('santiago')).toBeInTheDocument()
    expect(screen.getByText('elena')).toBeInTheDocument()
    expect(screen.getByText('RESERVADA')).toBeInTheDocument()
    expect(screen.getByText('sofia')).toBeInTheDocument()
    expect(screen.getByText('CANCELADA')).toBeInTheDocument()
  })

  it('muestra la lista de reservas al buscar por rut existente', async () => {
    const user = userEvent.setup()
    render(<SecretarioReserva />)

    await screen.findByText('santiago')

    const inputBuscador = screen.getByPlaceholderText('222606497')
    const botonBuscar = screen.getByRole('button', { name: /buscar/i })

    await user.type(inputBuscador, '624345261')
    await user.click(botonBuscar)

    expect(obtenerReservasDeUnCliente).toHaveBeenCalledWith('624345261')
    expect(await screen.findByText('santiago')).toBeInTheDocument()
  })

  it('restaura todas las reservas si el buscador se envía vacío', async () => {
    const user = userEvent.setup()
    render(<SecretarioReserva />)

    await screen.findByText('santiago')

    obtenerReservasDeUnCliente.mockResolvedValueOnce({ data: [] })

    const inputBuscador = screen.getByPlaceholderText('222606497')
    const botonBuscar = screen.getByRole('button', { name: /buscar/i })

    await user.type(inputBuscador, '999999999')
    await user.click(botonBuscar)

    await waitFor(() => {
      expect(screen.queryByText('sofia')).not.toBeInTheDocument()
    })

    await user.clear(inputBuscador)
    await user.click(botonBuscar)

    expect(obtenerTodasReservas).toHaveBeenCalledTimes(2)
    expect(await screen.findByText('sofia')).toBeInTheDocument()
  })

})