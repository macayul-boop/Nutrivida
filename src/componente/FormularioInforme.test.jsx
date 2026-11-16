import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioInforme from './FormularioInforme'

describe("FormularioInforme", ()=>{

    describe("Modo creacion", ()=>{

        it("muestra errores de campos obligatorios al intentar guardar con el formulario vacío", async ()=>{
            const user = userEvent.setup()

            const mockGuardar = vi.fn()
            const mockCerrarModal = vi.fn()

            render(<FormularioInforme onGuardar={mockGuardar} onCerrarModal={mockCerrarModal} />)

            await user.click(screen.getByRole('button', { name: 'Guardar' }))

            expect(screen.getByText('El peso es obligatorio')).toBeInTheDocument()
            expect(screen.getByText('La talla es obligatoria')).toBeInTheDocument()
            expect(screen.getByText('La circunferencia circular es obligatoria')).toBeInTheDocument()
            expect(screen.getByText('La descripcion es obligatorio')).toBeInTheDocument()

            expect(mockGuardar).not.toHaveBeenCalled()
        })

        it("muestra error si la descripción tiene menos de 10 caracteres", async ()=>{
            const user = userEvent.setup()
            const mockGuardar = vi.fn()
            const mockCerrarModal = vi.fn()

            render(<FormularioInforme onGuardar={mockGuardar} onCerrarModal={mockCerrarModal} />)

            await user.type(screen.getByLabelText('Peso (kg)'), '75')
            await user.type(screen.getByLabelText('Talla'), '175')
            await user.type(screen.getByLabelText('Circunferencia circular'), '85')
            await user.type(screen.getByLabelText('Descripcion'), 'Hola')

            await user.click(screen.getByRole('button', { name: 'Guardar' }))

            expect(screen.getByText('La desripción mínimo debe tener 10 caracteres')).toBeInTheDocument()

            expect(mockGuardar).not.toHaveBeenCalled()
        })

        it('envía exitosamente los datos formateados cuando el formulario es válido', async () => {
            const user = userEvent.setup()
            const mockGuardar = vi.fn()
            const mockCerrarModal = vi.fn()

            render(<FormularioInforme onGuardar={mockGuardar} onCerrarModal={mockCerrarModal} />)

            await user.type(screen.getByLabelText('Peso (kg)'), '75')
            await user.type(screen.getByLabelText('Talla'), '175')
            await user.type(screen.getByLabelText('Circunferencia circular'), '85')
            await user.type(screen.getByLabelText('Descripcion'), 'Paciente con excelente progreso mensual')

            await user.click(screen.getByRole('button', { name: 'Guardar' }))

            expect(mockGuardar).toHaveBeenCalledWith(
                expect.objectContaining({
                peso: 75,
                talla: 175,
                circunferenciaCintura: 85,
                descripcion: 'Paciente con excelente progreso mensual',
                })
            )

        })


        it('llama a onCerrarModal al presionar el botón Cancelar', async () => {
            const user = userEvent.setup()
            const mockCerrarModal = vi.fn()

            render(<FormularioInforme onGuardar={vi.fn()} onCerrarModal={mockCerrarModal} />)

            await user.click(screen.getByRole('button', { name: 'Cancelar' }))

            expect(mockCerrarModal).toHaveBeenCalled()
        })

    })

    describe("Modo edicion", ()=>{
        
        const informeAEditar = {
            id: 101,
            clienteId: 5,
            fecha: "2026-10-15",
            peso: 80,
            talla: 180,
            circunferenciaCintura: 90,
            descripcion: 'Informe de seguimiento trimestral',
            }

        it('carga correctamente los valores del informe en cada input al editar', () => {
            render(
                <FormularioInforme
                    editandoInforme={informeAEditar}
                    onGuardar={vi.fn()}
                    onCerrarModal={vi.fn()}
                />
            )

            expect(screen.getByLabelText('Peso (kg)')).toHaveValue('80')
            expect(screen.getByLabelText('Talla')).toHaveValue('180')
            expect(screen.getByLabelText('Circunferencia circular')).toHaveValue('90')
            expect(screen.getByLabelText('Descripcion')).toHaveValue('Informe de seguimiento trimestral')
        })

        it('permite modificar los datos y la fecha original al guardar', async () => {
            const user = userEvent.setup()
            const mockGuardar = vi.fn()

            render(
                <FormularioInforme
                    editandoInforme={informeAEditar}
                    onGuardar={mockGuardar}
                    onCerrarModal={vi.fn()}
                />
            )

            const inputPeso = screen.getByLabelText('Peso (kg)')
            await user.clear(inputPeso)
            await user.type(inputPeso, '78')

            await user.click(screen.getByRole('button', { name: 'Guardar' }))

            expect(mockGuardar).toHaveBeenCalledWith({
                fecha: '2026-10-15',
                peso: 78,
                talla: 180,
                circunferenciaCintura: 90,
                descripcion: 'Informe de seguimiento trimestral',
            })
        })
    })
})