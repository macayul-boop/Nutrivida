import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioUsuario from './FormularioUsuario'

describe('FormularioUsuario', () => {

  describe('Validaciones del Formulario', () => {

    it('muestra mensajes de campos obligatorios al intentar guardar con el formulario vacio', async () => {
      const user = userEvent.setup()
      const mockGuardar = vi.fn()

      render(<FormularioUsuario onGuardar={mockGuardar} onCerrarModal={vi.fn()} onLimpiarEditable={vi.fn()} />)

      await user.click(screen.getByRole('button', { name: 'Guardar' }))

      expect(screen.getByText('El rut es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('Los apellidos son obligatorios')).toBeInTheDocument()
      expect(screen.getByText('El telefono es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument()
      expect(screen.getByText('Selecciona un rol')).toBeInTheDocument()

      expect(mockGuardar).not.toHaveBeenCalled()
    })

    it('valida formatos incorrectos de RUT, teléfono, email y contraseña corta', async () => {
      const user = userEvent.setup()

      render(<FormularioUsuario onGuardar={vi.fn()} onCerrarModal={vi.fn()} onLimpiarEditable={vi.fn()} />)

      await user.type(screen.getByLabelText('Rut'), '123')
      await user.type(screen.getByLabelText('Telefono'), '+569123')
      await user.type(screen.getByLabelText('Email'), 'correo.sin.arroba.com')
      await user.type(screen.getByLabelText('Contraseña'), '12345')

      await user.click(screen.getByRole('button', { name: 'Guardar' }))

      expect(screen.getByText('Formato de rut incorrecto')).toBeInTheDocument()
      expect(screen.getByText('Formato de telefono incorrecto')).toBeInTheDocument()
      expect(screen.getByText('Formato email incorrecto')).toBeInTheDocument()
      expect(screen.getByText('La contraseña debe tener minimo 6 caracteres')).toBeInTheDocument()
    })

  })

  
  describe('Flujos de Secretario', () => {

    it('crea exitosamente un usuario con rol Secretario', async () => {
      const user = userEvent.setup()
      const mockGuardar = vi.fn()
      const mockCerrarModal = vi.fn()

      render(
        <FormularioUsuario
          onGuardar={mockGuardar}
          onCerrarModal={mockCerrarModal}
          onLimpiarEditable={vi.fn()}
        />
      )

      await user.type(screen.getByLabelText('Rut'), '123456789')
      await user.type(screen.getByLabelText('Nombre'), 'Ana')
      await user.type(screen.getByLabelText('Apellidos'), 'Pérez')
      await user.type(screen.getByLabelText('Telefono'), '+56912345678')
      await user.type(screen.getByLabelText('Email'), 'secretarioPrueba@gamil.com')
      await user.type(screen.getByLabelText('Contraseña'), '123456')
      await user.selectOptions(screen.getByLabelText('Rol'), 'Secretario')

      await user.click(screen.getByRole('button', { name: 'Guardar' }))

      expect(mockGuardar).toHaveBeenCalledWith(
        expect.objectContaining({
          rut: '123456789',
          nombre: 'Ana',
          apellidos: 'Pérez',
          rol: 'Secretario',
          estado: 'Activo',
          email:'secretarioPrueba@gamil.com',
          contrasena:'123456',
        })
      )
      expect(mockCerrarModal).toHaveBeenCalled()
    })

    it('carga los datos de un Secretario existente para edición', () => {
      const secretarioExistente = {
        id: 50,
        rut: '987654321',
        nombre: 'Carlos',
        apellidos: 'Gomez',
        telefono: '+56987654321',
        email: 'secretarioPrueba@gmail.com',
        contrasena: 'secre123',
        rol: 'Secretario',
        estado: 'Activo'
      }

      render(
        <FormularioUsuario
          usuarioEditado={secretarioExistente}
          onGuardar={vi.fn()}
          onCerrarModal={vi.fn()}
          onLimpiarEditable={vi.fn()}
        />
      )

      expect(screen.getByLabelText('Rut')).toHaveValue('987654321')
      expect(screen.getByLabelText('Nombre')).toHaveValue('Carlos')
      expect(screen.getByLabelText('Apellidos')).toHaveValue('Gomez')
      expect(screen.getByLabelText('Rol')).toHaveValue('Secretario')
    })

  })

  
  describe('Flujos de Nutricionista', () => {

    it('despliega la sección de horarios al seleccionar el rol Nutricionista', async () => {
      const user = userEvent.setup()

      render(<FormularioUsuario onGuardar={vi.fn()} onCerrarModal={vi.fn()} onLimpiarEditable={vi.fn()} />)

      await user.selectOptions(screen.getByLabelText('Rol'), 'Nutricionista')

      expect(screen.getByText('Dias de la semana')).toBeInTheDocument()
    })

    it('muestra error en el horario de Nutricionista si no agrega ningún día', async () => {
      const user = userEvent.setup()
      const mockGuardar = vi.fn()

      render(<FormularioUsuario onGuardar={mockGuardar} onCerrarModal={vi.fn()} onLimpiarEditable={vi.fn()} />)

      await user.type(screen.getByLabelText('Rut'), '123456789')
      await user.type(screen.getByLabelText('Nombre'), 'Laura')
      await user.type(screen.getByLabelText('Apellidos'), 'Silva')
      await user.type(screen.getByLabelText('Telefono'), '+56912345678')
      await user.type(screen.getByLabelText('Email'), 'laura@nutrivida.cl')
      await user.type(screen.getByLabelText('Contraseña'), '123456')
      await user.selectOptions(screen.getByLabelText('Rol'), 'Nutricionista')

      await user.click(screen.getByRole('button', { name: 'Guardar' }))

      expect(screen.getByText('Ingresa minimo 1 dia')).toBeInTheDocument()
      expect(mockGuardar).not.toHaveBeenCalled()
    })

    it('permite presionar el botón "+" para agregar una fila de día de semana', async () => {
      const user = userEvent.setup()

      render(<FormularioUsuario onGuardar={vi.fn()} onCerrarModal={vi.fn()} onLimpiarEditable={vi.fn()} />)

      await user.selectOptions(screen.getByLabelText('Rol'), 'Nutricionista')

      const botonAgregar = screen.getByRole('button', { name: '+' })
      await user.click(botonAgregar)

      expect(botonAgregar).toBeInTheDocument()
    })

  })

  
  describe('Acciones del modal', () => {

    it('ejecuta onLimpiarEditable y onCerrarModal al presionar Cancelar', async () => {
      const user = userEvent.setup()
      const mockCerrarModal = vi.fn()
      const mockLimpiarEditable = vi.fn()

      render(
        <FormularioUsuario
          onGuardar={vi.fn()}
          onCerrarModal={mockCerrarModal}
          onLimpiarEditable={mockLimpiarEditable}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(mockLimpiarEditable).toHaveBeenCalled()
      expect(mockCerrarModal).toHaveBeenCalled()
    })

  })

})