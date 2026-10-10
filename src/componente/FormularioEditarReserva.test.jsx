import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioEditarReserva from './FormularioEditarReserva'

describe('FormularioEditarReserva', () => {

  const reservaPrueba = {
    id: 100,
    idCliente: 7,
    nombreCliente: 'Benjamin',
    rutCliente: '222606498',
    idConsulta: 1,
    idNutricionista: 2, 
    nombreNutricionista: 'Carolina',
    fecha: '10/10/2026',
    horaInicio: '10:00',
    estado: 'Reservado'
  }

  it('obtiene y muestra la información del servicio según la prop datos', () => {
    render(
      <FormularioEditarReserva
        datos={reservaPrueba}
        onCerrarModal={vi.fn()}
        onGuardar={vi.fn()}
      />
    )
    expect(screen.getByText('Presencial')).toBeInTheDocument()
    expect(screen.getByText('$30000')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
  })

  it('ejecuta la función onCerrarModal al presionar Cancelar', async () => {
    const user = userEvent.setup()
    const mockCerrarModal = vi.fn()

    render(
      <FormularioEditarReserva
        datos={reservaPrueba}
        onCerrarModal={mockCerrarModal}
        onGuardar={vi.fn()}
      />
    )

    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(mockCerrarModal).toHaveBeenCalled()
  })

  it('muestra mensajes de error si intenta guardar sin haber seleccionado día ni hora', async () => {
    const user = userEvent.setup()
    const mockGuardar = vi.fn()

    render(
      <FormularioEditarReserva
        datos={reservaPrueba}
        onCerrarModal={vi.fn()}
        onGuardar={mockGuardar}
      />
    )
    await user.click(screen.getByRole('button', { name: /reservar/i }))

    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()

    expect(mockGuardar).not.toHaveBeenCalled()
  })

  it('envía los datos actualizados cuando se selecciona un día disponible', async () => {
    const user = userEvent.setup()
    const mockGuardar = vi.fn()
    const mockCerrarModal = vi.fn()

    render(
      <FormularioEditarReserva
        datos={reservaPrueba}
        onCerrarModal={mockCerrarModal}
        onGuardar={mockGuardar}
      />
    )

    const botonesDias = screen.getAllByRole('button')
    await user.click(botonesDias[0])

    await user.click(screen.getByRole('button', { name: /reservar/i }))
    expect(screen.queryByText('Selecciona un dia')).not.toBeInTheDocument()
  })

})