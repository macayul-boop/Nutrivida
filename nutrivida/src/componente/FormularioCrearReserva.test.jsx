import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import FormularioCrearReserva from './FormularioCrearReserva'

describe('FormularioCrearReserva', () => {

  beforeEach(() => {
    const usuarioSimulado = { id: 10, nombre: 'Matias' }
    localStorage.setItem('sesion_activa', JSON.stringify(usuarioSimulado))
  })

  it('renderiza los selects con las opciones iniciales', () => {
    render(<FormularioCrearReserva />)

    expect(screen.getByLabelText(/tipo consulta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nutricionista/i)).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /reservar/i })).toBeInTheDocument()
  })

  it('muestra un mensaje de error si se intenta reservar sin seleccionar un día', async () => {
    const user = userEvent.setup()
    render(<FormularioCrearReserva />)

    await user.click(screen.getByRole('button', { name: /reservar/i }))

    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()
  })

  it('permite cambiar de nutricionista', async () => {
    const user = userEvent.setup()
    render(<FormularioCrearReserva />)

    const selectNutricionista = screen.getByLabelText(/nutricionista/i)

    await user.selectOptions(selectNutricionista, '6')

    expect(selectNutricionista).toHaveValue('6')
  })

  it('completa el flujo de selección de día y envío de reserva', async () => {
    const user = userEvent.setup()
    const spyConsole = vi.spyOn(console, 'log')

    render(<FormularioCrearReserva />)

    const botonesDias = screen.getAllByRole('button')
    
    await user.click(botonesDias[0])

    await user.click(screen.getByRole('button', { name: /reservar/i }))

    expect(screen.queryByText('Selecciona un dia')).not.toBeInTheDocument()

    spyConsole.mockRestore()
  })

})