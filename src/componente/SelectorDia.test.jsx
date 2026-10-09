import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SelectorDia from './SelectorDia'

describe('SelectorDia', () => {

  // Datos de prueba basándonos en tu objeto de ejemplo
  const horarioPrueba = [
    { dia: "Martes", horaInicio: "14:00", horaTermino: "19:00" },
    { dia: "Viernes", horaInicio: "14:00", horaTermino: "19:00" }
  ]

  it('no renderiza botones si el horario está vacío o es undefined', () => {
    const { container } = render(<SelectorDia horario={[]} />)

    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('renderiza exactamente 7 botones con los días disponibles según el horario', () => {
    render(<SelectorDia horario={horarioPrueba} />)

    const botonesDias = screen.getAllByRole('button')
    expect(botonesDias).toHaveLength(7)
  })

  it('llama a la función onSeleccionarDia con la fecha al hacer clic en un botón', async () => {
    const user = userEvent.setup()
    const mockOnSeleccionarDia = vi.fn()

    render(
      <SelectorDia
        horario={horarioPrueba}
        onSeleccionarDia={mockOnSeleccionarDia}
      />
    )

    const botonesDias = screen.getAllByRole('button')

    await user.click(botonesDias[0])

    expect(mockOnSeleccionarDia).toHaveBeenCalled()
  })

})