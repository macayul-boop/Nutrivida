import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import NutricionistaFichaClinica from './NutricionistaFichaClinica'
import axiosClient from '../../api/axiosClient'


vi.mock('../../api/axiosClient', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn()
  }
}))

const mockPaciente = {
  id: 1,
  rut: '222606497',
  nombre: 'Matias',
  apellidos: 'Igancion Cayul',
  email: 'example@gmail.com',
  telefono: '+56963391571'
}

const mockFicha = {
  planAlimentacion: 'Toma 5 litros de agua diario',
  informes: [
    { id: 1, fecha: '4/10/2026', peso: 80, talla: 175, circunferenciaCintura: 85, descripcion: 'El paciente indica...' },
    { id: 2, fecha: '5/10/2026', peso: 79, talla: 175, circunferenciaCintura: 84, descripcion: 'El paciente indica...' },
    { id: 3, fecha: '6/10/2026', peso: 78, talla: 175, circunferenciaCintura: 83, descripcion: 'El paciente indica...' }
  ]
}


describe('NutricionistaFichaClinica', () => {

  beforeEach(() => {
    vi.clearAllMocks()

    axiosClient.get.mockImplementation((url) => {
      if (url === '/usuarios/pacientes'){
        return Promise.resolve({ data:mockPaciente})
      }
      if (url ==='/fichas-clinicas'){
        return Promise.resolve({ data: mockFicha})
      }
      return Promise.reject(new Error('Endpoint no mockeado'))
    })

    axiosClient.put.mockResolvedValue({status: 204})
  })

  it('muestra el título principal y la caja de búsqueda al iniciar', () => {
    render(<NutricionistaFichaClinica />)

    expect(screen.getByText('Historial Clinico')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/ingresa un rut/i)).toBeInTheDocument()
    expect(screen.queryByText('Matias Igancion Cayul')).not.toBeInTheDocument()
  })

  it('busca un cliente por RUT y despliega su información e informes', async () => {
    const user = userEvent.setup()
    render(<NutricionistaFichaClinica />)

    const inputRut = screen.getByPlaceholderText(/ingresa un rut/i)
    const botonBuscar = screen.getByRole('button', { name: /buscar/i })

    await user.type(inputRut, '222606497')
    await user.click(botonBuscar)


    expect(await screen.findByText('Matias Igancion Cayul')).toBeInTheDocument()
    expect(screen.getByText('+56963391571')).toBeInTheDocument()
    expect(screen.getByText('example@gmail.com')).toBeInTheDocument()

    expect(screen.getByText('4/10/2026')).toBeInTheDocument()
    expect(screen.getByText('5/10/2026')).toBeInTheDocument()
    expect(screen.getByText('6/10/2026')).toBeInTheDocument()

    expect(axiosClient.get).toHaveBeenCalledWith('/usuarios/pacientes', { params: { rut: '222606497' } })
    expect(axiosClient.get).toHaveBeenCalledWith('/fichas-clinicas', { params: { rut: '222606497' } })
  })

  it('permite editar el plan de alimentación del usuario', async () => {
    const user = userEvent.setup()
    render(<NutricionistaFichaClinica />)

    await user.type(screen.getByPlaceholderText(/ingresa un rut/i), '222606497')
    await user.click(screen.getByRole('button', { name: /buscar/i }))

    await screen.findByText('Matias Igancion Cayul')

    await user.click(screen.getByRole('button', { name: 'Editar' }))

    const textareaPlan = screen.getByPlaceholderText('Agrega información extra...')
    await user.clear(textareaPlan)
    await user.type(textareaPlan, 'Nueva dieta balanceada rica en proteínas')

    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(await screen.findByText('Nueva dieta balanceada rica en proteínas')).toBeInTheDocument()

    expect(axiosClient.put).toHaveBeenCalledWith('/fichas-clinicas/1/plan', {
      planAlimentacion: 'Nueva dieta balanceada rica en proteínas'
    })
  })
})