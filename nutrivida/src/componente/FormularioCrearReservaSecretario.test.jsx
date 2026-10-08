import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioCrearReservaSecreatario from './FormularioCrearReservaSecretario'

describe('FormularioCrearReservaSecreatario', () => {

  it('muestra todos los selectores y la información del servicio', () => {
    render(<FormularioCrearReservaSecreatario onCerrarModal={vi.fn()} onGuardar={vi.fn()} />)

    expect(screen.getByLabelText(/cliente/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tipo consulta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nutricionista/i)).toBeInTheDocument()

    expect(screen.getByText('Presencial')).toBeInTheDocument()
    expect(screen.getByText('$30000')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
  })

  it('permite cambiar el cliente, tipo de consulta y nutricionista', async () => {
    const user = userEvent.setup()
    render(<FormularioCrearReservaSecreatario onCerrarModal={vi.fn()} onGuardar={vi.fn()} />)

    const selectCliente = screen.getByLabelText(/cliente/i)
    const selectConsulta = screen.getByLabelText(/tipo consulta/i)
    const selectNutricionista = screen.getByLabelText(/nutricionista/i)

    await user.selectOptions(selectCliente, '8')
    await user.selectOptions(selectConsulta, '2')
    await user.selectOptions(selectNutricionista, '6')
    
    expect(selectCliente).toHaveValue('8')
    expect(selectConsulta).toHaveValue('2')
    expect(selectNutricionista).toHaveValue('6')
  })

  it('muestra mensajes de error si se presiona Reservar sin haber elegido fecha y hora', async () => {
    const user = userEvent.setup()
    const mockGuardar = vi.fn()

    render(<FormularioCrearReservaSecreatario onCerrarModal={vi.fn()} onGuardar={mockGuardar} />)

    await user.click(screen.getByRole('button', { name: /reservar/i }))

    expect(screen.getByText('Selecciona un dia')).toBeInTheDocument()

    expect(mockGuardar).not.toHaveBeenCalled()
  })

  it('ejecuta la función onCerrarModal al presionar el botón Cancelar', async () => {
    const user = userEvent.setup()
    const mockCerrarModal = vi.fn()

    render(<FormularioCrearReservaSecreatario onCerrarModal={mockCerrarModal} onGuardar={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(mockCerrarModal).toHaveBeenCalled()
  })

})