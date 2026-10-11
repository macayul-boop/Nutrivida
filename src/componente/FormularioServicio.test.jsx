import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioServicio from './FormularioServicio'

describe("FormularioServicio", ()=>{

    describe("Modo creacion", ()=>{

        it("muestra errores de campos obligatorios al intentar guardar con el formulario vacío", async ()=>{
            const user = userEvent.setup()

            const mockGuardar = vi.fn()
            const mockCerrarModal = vi.fn()

            render(<FormularioServicio servicioEditable={null} onGuardar={mockGuardar} onCerrarModal={mockCerrarModal} />)

            await user.click(screen.getByRole('button', { name: 'Guardar' }))

            expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
            expect(screen.getByText('El precio es obligatorio')).toBeInTheDocument()
            expect(screen.getByText('La duracion es obligatoria')).toBeInTheDocument()
            expect(screen.getByText('Selecciona una modalidad')).toBeInTheDocument()

            expect(mockGuardar).not.toHaveBeenCalled()
        })

        it("muestra errores si el precio y la duración no son mayores a cero", async ()=>{
            const user = userEvent.setup()
            const mockGuardar = vi.fn()
            const mockCerrarModal = vi.fn()

            render(<FormularioServicio servicioEditable={null} onGuardar={mockGuardar} onCerrarModal={mockCerrarModal} />)

            await user.type(screen.getByPlaceholderText('35000'), '0')
            await user.type(screen.getByPlaceholderText('60'), '0')

            await user.click(screen.getByRole('button', { name: 'Guardar' }))

            expect(screen.getByText('El precio debe ser mayor a cero')).toBeInTheDocument()
            expect(screen.getByText('La duracion debe ser mayor a cero')).toBeInTheDocument()

            expect(mockGuardar).not.toHaveBeenCalled()
        })

        it('guarda exitosamente los datos y cierra el modal cuando el formulario es válido', async () => {
            const user = userEvent.setup()
            const mockGuardar = vi.fn()
            const mockCerrarModal = vi.fn()

            render(<FormularioServicio servicioEditable={null} onGuardar={mockGuardar} onCerrarModal={mockCerrarModal} />)

            await user.type(screen.getByPlaceholderText('Nombre del servicio'), 'Consulta deportiva')
            await user.type(screen.getByPlaceholderText('35000'), '40000')
            await user.type(screen.getByPlaceholderText('60'), '45')
            await user.selectOptions(screen.getByRole('combobox'), 'Online')

            await user.click(screen.getByRole('button', { name: 'Guardar' }))

            expect(mockGuardar).toHaveBeenCalledWith(
                expect.objectContaining({
                nombre: 'Consulta deportiva',
                precio: 40000,
                duracion: 45,
                modalidad: 'Online',
                })
            )

            expect(mockCerrarModal).toHaveBeenCalled()
        })

        it('cierra el modal al presionar el botón Cancelar', async () => {
            const user = userEvent.setup()
            const mockGuardar = vi.fn()
            const mockCerrarModal = vi.fn()

            render(<FormularioServicio servicioEditable={null} onGuardar={mockGuardar} onCerrarModal={mockCerrarModal} />)

            await user.click(screen.getByRole('button', { name: 'Cancelar' }))

            expect(mockCerrarModal).toHaveBeenCalledTimes(1)
        })

    })

    describe("Modo edicion", ()=>{

        const servicioAEditar = {
            id: 20,
            nombre: 'Control deportivo',
            precio: 28000,
            duracion: 30,
            modalidad: 'Presencial'
            }

        it('carga correctamente los valores del servicio en cada input al editar', () => {
            render(
                <FormularioServicio
                    servicioEditable={servicioAEditar}
                    onGuardar={vi.fn()}
                    onCerrarModal={vi.fn()}
                />
            )

            expect(screen.getByPlaceholderText('Nombre del servicio')).toHaveValue('Control deportivo')
            expect(screen.getByPlaceholderText('35000')).toHaveValue(28000)
            expect(screen.getByPlaceholderText('60')).toHaveValue(30)
            expect(screen.getByRole('combobox')).toHaveValue('Presencial')
        })

        it('permite modificar los datos y conserva el ID original al guardar', async () => {
            const user = userEvent.setup()
            const mockGuardar = vi.fn()

            render(
                <FormularioServicio
                    servicioEditable={servicioAEditar}
                    onGuardar={mockGuardar}
                    onCerrarModal={vi.fn()}
                />
            )

            const inputPrecio = screen.getByPlaceholderText('35000')
            await user.clear(inputPrecio)
            await user.type(inputPrecio, '30000')

            await user.click(screen.getByRole('button', { name: 'Guardar' }))

            expect(mockGuardar).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: 20,
                    precio: 30000,
                })
            )
        })
    })

})