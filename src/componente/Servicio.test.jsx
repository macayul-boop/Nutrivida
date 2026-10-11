import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Servicio from './Servicio'
import { servicioTest } from '../test/mocks'


describe("Test Servicio", () =>{

    const onEditarServicio = vi.fn()
    const onEliminarServicio = vi.fn()

    const renderServicio = (props ={}) => {
        return render(
            <Servicio datos={servicioTest} onEditar={onEditarServicio} onEliminar={onEliminarServicio} {...props}/>
        )
    }


    it("Renderizar el servicio", () => {
        renderServicio()

        expect(screen.getByText(servicioTest.nombre)).toBeInTheDocument()
        expect(screen.getByText(`$${servicioTest.precio}`)).toBeInTheDocument()
        expect(screen.getByText(`${servicioTest.duracion} minutos`)).toBeInTheDocument()
        expect(screen.getByText(servicioTest.modalidad)).toBeInTheDocument()

    })


    it("Ejecuta la función Editar del Servicio", async() => {
        const user = userEvent.setup()
        renderServicio()

        const [botonEditar] = screen.getAllByRole("button")
        await user.click(botonEditar)

        expect(onEditarServicio).toHaveBeenCalledTimes(1)
    })

    it("Ejecuta la función Eliminar del Servicio", async() => {
        const user = userEvent.setup()
        renderServicio()

        const [, botonEliminar] = screen.getAllByRole("button")
        await user.click(botonEliminar)

        expect(onEliminarServicio).toHaveBeenCalledTimes(1)
    })

})