import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import SecretarioHorario from './SecretarioHorario'

describe('SecretarioHorario', () => {

  it('renderiza la vista inicial con el título, el selector de nutricionista y el mensaje "Selecciona un dia"', () => {
    render(<SecretarioHorario />)

    expect(screen.getByRole('heading', { name: /horarios agenda/i })).toBeInTheDocument()

    const selectNutricionista = screen.getByLabelText(/nutricionista/i)
    expect(selectNutricionista).toBeInTheDocument()
    expect(selectNutricionista).toHaveValue('2') 

    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()
  })

  it('permite cambiar de nutricionista y resetea la fecha seleccionada', async () => {
    const user = userEvent.setup()
    render(<SecretarioHorario />)

    const selectNutricionista = screen.getByLabelText(/nutricionista/i)

    const botonesDias = screen.getAllByRole('button')
    await user.click(botonesDias[0])

    expect(screen.queryByText('Selecciona un dia')).not.toBeInTheDocument()

    await user.selectOptions(selectNutricionista, '3')

    expect(selectNutricionista).toHaveValue('3')
    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()
  })

  it('muestra las reservas o el mensaje "No hay citas" al hacer clic en un día del calendario', async () => {
    const user = userEvent.setup()
    render(<SecretarioHorario />)

    const botonesDias = screen.getAllByRole('button')
    await user.click(botonesDias[0])

    expect(screen.queryByText('Selecciona un dia')).not.toBeInTheDocument()

    const mensajeNoHayCitas = screen.queryByText('No hay citas')
    const reservaCliente = screen.queryByText(/matias|benjamin|horacio/i)

    expect(mensajeNoHayCitas || reservaCliente).toBeTruthy()
  })

})