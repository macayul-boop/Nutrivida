import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import AdministracionServicios from './AdministracionServicios'

describe('AdministracionServicios', () => {

  it('renderiza los encabezados y los servicios iniciales', () => {
    render(<AdministracionServicios />)

    expect(screen.getByRole('heading', { name: 'Servicios' })).toBeInTheDocument()
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Precio')).toBeInTheDocument()
    expect(screen.getByText('Duracion')).toBeInTheDocument()
    expect(screen.getByText('Modalidad')).toBeInTheDocument()
    expect(screen.getByText('Acciones')).toBeInTheDocument()
    expect(screen.getByText('Primera consulta nutricional')).toBeInTheDocument()
    expect(screen.getByText('Control nutricional')).toBeInTheDocument()
  })

  it('abre el formulario al presionar Crear servicio', async () => {
    const user = userEvent.setup()
    render(<AdministracionServicios />)

    await user.click(screen.getByRole('button', { name: 'Crear servicio' }))

    expect(screen.getByPlaceholderText('Nombre del servicio')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('crea un servicio y lo agrega al listado', async () => {
    const user = userEvent.setup()
    render(<AdministracionServicios />)

    await user.click(screen.getByRole('button', { name: 'Crear servicio' }))
    await user.type(screen.getByPlaceholderText('Nombre del servicio'), 'Consulta deportiva')
    await user.type(screen.getByPlaceholderText('35000'), '40000')
    await user.type(screen.getByPlaceholderText('60'), '50')
    await user.selectOptions(screen.getByRole('combobox'), 'Online')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('Consulta deportiva')).toBeInTheDocument()
    expect(screen.getByText('$40000')).toBeInTheDocument()
    expect(screen.getByText('50 minutos')).toBeInTheDocument()
  })

  it('edita un servicio existente', async () => {
    const user = userEvent.setup()
    render(<AdministracionServicios />)

    const botones = screen.getAllByRole('button')
    const botonEditar = botones[1]
    await user.click(botonEditar)

    const inputNombre = screen.getByPlaceholderText('Nombre del servicio')
    await user.clear(inputNombre)
    await user.type(inputNombre, 'Consulta nutricional actualizada')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('Consulta nutricional actualizada')).toBeInTheDocument()
    expect(screen.queryByText('Primera consulta nutricional')).not.toBeInTheDocument()
  })

  it('mantiene el servicio cuando se cancela su eliminación', async () => {
    const user = userEvent.setup()
    render(<AdministracionServicios />)

    const botones = screen.getAllByRole('button')
    const botonEliminar = botones[2]
    await user.click(botonEliminar)

    expect(screen.getByText('¿Estas seguro que quieres eliminar el servicio?')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.getByText('Primera consulta nutricional')).toBeInTheDocument()
  })

  it('elimina un servicio al confirmar la acción', async () => {
    const user = userEvent.setup()
    render(<AdministracionServicios />)

    const botones = screen.getAllByRole('button')
    const botonEliminar = botones[2]
    await user.click(botonEliminar)
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))

    expect(screen.queryByText('Primera consulta nutricional')).not.toBeInTheDocument()
  })

})