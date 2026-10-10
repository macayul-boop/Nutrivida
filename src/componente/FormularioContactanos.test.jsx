import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import FormularioContactanos from './FormularioContactanos'

// Pruebas de componente: se renderiza el formulario en jsdom y se usa como lo haría
// un usuario (buscando por label/rol y escribiendo con userEvent).
describe('FormularioContactanos', () => {
  it('muestra los errores de campos obligatorios al enviar vacío', async () => {
    const user = userEvent.setup()
    render(<FormularioContactanos />)

    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(screen.getByText('La nombre es obligatoria')).toBeInTheDocument()
    expect(screen.getByText('El email es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El mensaje es obligatorio')).toBeInTheDocument()
  })

  it('rechaza un email con formato inválido', async () => {
    const user = userEvent.setup()
    render(<FormularioContactanos />)

    await user.type(screen.getByLabelText('Nombre'), 'Ana')
    await user.type(screen.getByLabelText('Email'), 'ana-sin-arroba.cl')
    await user.type(screen.getByLabelText('Mensaje'), 'Hola')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(screen.getByText('El formato del email no es válido')).toBeInTheDocument()
    expect(screen.queryByText('La nombre es obligatoria')).not.toBeInTheDocument()
  })

  it('con datos válidos no muestra errores y limpia los campos', async () => {
    const user = userEvent.setup()
    render(<FormularioContactanos />)

    await user.type(screen.getByLabelText('Nombre'), 'Ana')
    await user.type(screen.getByLabelText('Email'), 'ana@nutrivida.cl')
    await user.type(screen.getByLabelText('Mensaje'), 'Quiero agendar una consulta')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(screen.queryByText(/obligatori|no es válido/)).not.toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toHaveValue('')
    expect(screen.getByLabelText('Email')).toHaveValue('')
    expect(screen.getByLabelText('Mensaje')).toHaveValue('')
  })
})
