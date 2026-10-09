import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import NutricionistaAgenda from './NutricionistaAgenda'

describe('NutricionistaAgenda', () => {

  it('muestra el título principal y el mensaje "Selecciona un dia" al cargar', () => {
    render(<NutricionistaAgenda />)

    expect(screen.getByRole('heading', { name: /agenda/i })).toBeInTheDocument()

    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()
    expect(screen.queryByText('No hay citas')).not.toBeInTheDocument()
  })

  it('renderiza los botones del calendario SelectorDia', () => {
    render(<NutricionistaAgenda />)

    const botonesDias = screen.getAllByRole('button')
    expect(botonesDias.length).toBeGreaterThan(0)
  })

  it('hace desaparecer el mensaje inicial al hacer clic en un día del calendario', async () => {
    const user = userEvent.setup()
    render(<NutricionistaAgenda />)

    const botonesDias = screen.getAllByRole('button')

    await user.click(botonesDias[0])

    expect(screen.queryByText('Selecciona un dia')).not.toBeInTheDocument()
  })

  it('muestra "No hay citas" o las reservas correspondientes dependiendo de la fecha seleccionada', async () => {
    const user = userEvent.setup()
    render(<NutricionistaAgenda />)

    const botonesDias = screen.getAllByRole('button')

    await user.click(botonesDias[0])

    const mensajeNoHayCitas = screen.queryByText('No hay citas')
    const reservaNombre = screen.queryByText(/matias|benjamin|horacio/i)

    expect(mensajeNoHayCitas || reservaNombre).toBeTruthy()
  })

})