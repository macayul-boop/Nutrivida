import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import SecretarioReserva from './SecretarioReserva'

describe('SecretarioReserva', () => {

  it('renderiza la tabla con los encabezados y la reserva por defecto', () => {
    render(<SecretarioReserva />)

    expect(screen.getByRole('heading', { name: /reservas/i })).toBeInTheDocument()

    expect(screen.getByText('Cliente')).toBeInTheDocument()
    expect(screen.getByText('Nutricionista')).toBeInTheDocument()
    expect(screen.getByText('Fecha y Hora')).toBeInTheDocument()
    expect(screen.getByText('Estado')).toBeInTheDocument()

    expect(screen.getByText('Matias')).toBeInTheDocument()
    expect(screen.getByText('Alavaro')).toBeInTheDocument()
    expect(screen.getByText('Reservado')).toBeInTheDocument()
  })

  it('muestra la lista de reservas al buscar por rut existente', async () => {
    const user = userEvent.setup()
    render(<SecretarioReserva />)

    const inputBuscador = screen.getByPlaceholderText('222606497')
    const botonBuscar = screen.getByRole('button', { name: /buscar/i })

    await user.type(inputBuscador, '222606497')
    await user.click(botonBuscar)

    expect(screen.getByText('Matias')).toBeInTheDocument()
  })


  it('restaura todas las reservas si el buscador se envía vacío', async () => {
    const user = userEvent.setup()
    render(<SecretarioReserva />)

    const inputBuscador = screen.getByPlaceholderText('222606497')
    const botonBuscar = screen.getByRole('button', { name: /buscar/i })

    await user.type(inputBuscador, '999999999')
    await user.click(botonBuscar)
    expect(screen.queryByText('Matias')).not.toBeInTheDocument()

    await user.clear(inputBuscador)
    await user.click(botonBuscar)

    expect(screen.getByText('Matias')).toBeInTheDocument()
  })

  it('abre el modal de FormularioCrearReservaSecretario al presionar "Crear reserva"', async () => {
    const user = userEvent.setup()
    render(<SecretarioReserva />)

    await user.click(screen.getByRole('button', { name: /crear reserva/i }))

    expect(screen.getByLabelText(/cliente/i)).toBeInTheDocument()
  })

})