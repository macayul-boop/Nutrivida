import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Servicio from './Servicio'

const servicio = {
    id: 10,
    nombre: 'Consulta deportiva',
    descripcion: 'Evaluación nutricional para deportistas',
    precio: 40000,
    duracionMinutos: 45,
    modalidad: 'ONLINE'
}

const renderServicio = ()=>{
    const onEditar = vi.fn()
    const onEliminar = vi.fn()
    render(<Servicio datos={servicio} onEditar={onEditar} onEliminar={onEliminar}/>)

    return {onEditar, onEliminar}
}

describe('Servicio', ()=>{
    it('muestra el nombre, precio, duración y modalidad del servicio', ()=>{
        renderServicio()

        expect(screen.getByText(servicio.nombre)).toBeInTheDocument()
        expect(screen.getByText('$' + servicio.precio)).toBeInTheDocument()
        expect(screen.getByText(servicio.duracionMinutos + ' minutos')).toBeInTheDocument()
        expect(screen.getByText('Online')).toBeInTheDocument()
    })

    it('ejecuta la acción de editar', async ()=>{
        const user = userEvent.setup()
        const {onEditar} = renderServicio()

        await user.click(screen.getByRole('button', {name:'Editar ' + servicio.nombre}))

        expect(onEditar).toHaveBeenCalledOnce()
    })

    it('ejecuta la acción de eliminar', async ()=>{
        const user = userEvent.setup()
        const {onEliminar} = renderServicio()

        await user.click(screen.getByRole('button', {name:'Eliminar ' + servicio.nombre}))

        expect(onEliminar).toHaveBeenCalledOnce()
    })
})
