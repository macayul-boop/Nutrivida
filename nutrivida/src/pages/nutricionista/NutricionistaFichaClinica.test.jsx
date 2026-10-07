import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import NutricionistaFichaClinica from './NutricionistaFichaClinica'

describe('NutricionistaFichaClinica', () => {

  it('muestra el título principal y la caja de búsqueda al iniciar', () => {
    render(<NutricionistaFichaClinica />)

    expect(screen.getByText('Historial Clinico')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ingresa un Rut (222606497)')).toBeInTheDocument()
    expect(screen.queryByText('Matias Igancion Cayul')).not.toBeInTheDocument()
  })

  it('busca un cliente por RUT y despliega su información e informes', async () => {
    const user = userEvent.setup()
    render(<NutricionistaFichaClinica />)

    const inputRut = screen.getByPlaceholderText('Ingresa un Rut (222606497)')
    const botonBuscar = screen.getByRole('button', { name: /buscar/i })

    await user.type(inputRut, '222606497')
    await user.click(botonBuscar)

    expect(screen.getByText('Matias Igancion Cayul')).toBeInTheDocument()
    expect(screen.getByText('+56963391571')).toBeInTheDocument()
    expect(screen.getByText('example@gmail.com')).toBeInTheDocument()

    expect(screen.getByText('4/10/2026')).toBeInTheDocument()
    expect(screen.getByText('5/10/2026')).toBeInTheDocument()
    expect(screen.getByText('6/10/2026')).toBeInTheDocument()
  })

  it('permite editar el plan de alimentación del usuario', async () => {
    const user = userEvent.setup()
    render(<NutricionistaFichaClinica />)

    await user.type(screen.getByPlaceholderText('Ingresa un Rut (222606497)'), '222606497')
    await user.click(screen.getByRole('button', { name: /buscar/i }))

    await user.click(screen.getByRole('button', { name: 'Editar' }))

    const textareaPlan = screen.getByPlaceholderText('Agrega información extra...')
    await user.clear(textareaPlan)
    await user.type(textareaPlan, 'Nueva dieta balanceada rica en proteínas')

    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('Nueva dieta balanceada rica en proteínas')).toBeInTheDocument()
  })

})