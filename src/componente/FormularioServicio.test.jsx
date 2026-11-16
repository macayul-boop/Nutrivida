import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioServicio from './FormularioServicio'

const servicio = {
    id:42,
    nombre:'Control nutricional',
    descripcion:'Seguimiento nutricional',
    precio:25000,
    duracionMinutos:30,
    modalidad:'PRESENCIAL'
}

describe('FormularioServicio', ()=>{
    it('valida los campos obligatorios antes de guardar', async ()=>{
        const user = userEvent.setup()
        const onGuardar = vi.fn()
        render(<FormularioServicio onGuardar={onGuardar} onCerrarModal={vi.fn()}/>)

        await user.click(screen.getByRole('button', {name:'Guardar'}))

        expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
        expect(screen.getByText('La descripción es obligatoria')).toBeInTheDocument()
        expect(screen.getByText('El precio es obligatorio')).toBeInTheDocument()
        expect(screen.getByText('La duración es obligatoria')).toBeInTheDocument()
        expect(screen.getByText('Selecciona una modalidad')).toBeInTheDocument()
        expect(onGuardar).not.toHaveBeenCalled()
    })

    it('rechaza valores numéricos no válidos para el backend', async ()=>{
        const user = userEvent.setup()
        const onGuardar = vi.fn()
        render(<FormularioServicio onGuardar={onGuardar} onCerrarModal={vi.fn()}/>)

        await user.type(screen.getByLabelText('Precio'), '0')
        await user.type(screen.getByLabelText('Duración en minutos'), '2.5')
        await user.click(screen.getByRole('button', {name:'Guardar'}))

        expect(screen.getByText(/precio entero/)).toBeInTheDocument()
        expect(screen.getByText(/duración entera/)).toBeInTheDocument()
        expect(onGuardar).not.toHaveBeenCalled()
    })

    it('conserva los datos si falla la escritura', async ()=>{
        const user = userEvent.setup()
        const onGuardar = vi.fn().mockRejectedValue(new Error('Sin conexión'))
        const onCerrarModal = vi.fn()
        render(<FormularioServicio servicioEditable={servicio} onGuardar={onGuardar} onCerrarModal={onCerrarModal}/>)

        await user.clear(screen.getByLabelText('Nombre'))
        await user.type(screen.getByLabelText('Nombre'), 'Control avanzado')
        await user.click(screen.getByRole('button', {name:'Guardar'}))

        expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo guardar')
        expect(screen.getByLabelText('Nombre')).toHaveValue('Control avanzado')
        expect(onCerrarModal).not.toHaveBeenCalled()
    })

    it('cierra sin guardar al presionar Cancelar', async ()=>{
        const user = userEvent.setup()
        const onGuardar = vi.fn()
        const onCerrarModal = vi.fn()
        render(<FormularioServicio onGuardar={onGuardar} onCerrarModal={onCerrarModal}/>)

        await user.click(screen.getByRole('button', {name:'Cancelar'}))

        expect(onCerrarModal).toHaveBeenCalledOnce()
        expect(onGuardar).not.toHaveBeenCalled()
    })
})
