import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi} from 'vitest'
import HeaderCliente from './HeaderCliente'
import {  clienteHeader} from '../../test/mocks'


describe("Prueba del Header Cliente logeado", () => {
    
    const closeSesion =vi.fn()

    const renderHeaderClientes =(props = {}) =>{
        return render(
            <MemoryRouter>
                <HeaderCliente datos={clienteHeader} onCerrarSesion={closeSesion} {...props}/>
            </MemoryRouter>
        )
    }

    it("Renderizar el nombre del cliente y las opciones del menu", () =>{
        renderHeaderClientes()

        expect(screen.getByText(clienteHeader.nombre)).toBeInTheDocument()
        expect(screen.getByRole("link", {name: /inicio/i})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: /servicios/i})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: /nosotros/i})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: /tus reservas/i})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: /reservar/i})).toBeInTheDocument()

    })

    it("Prueba de cerrar sesion del cliente", async() => {
        const user = userEvent.setup()
        renderHeaderClientes()

        const botonCerrarSesion = screen.getByRole("button", {name: /cerrar Sesion/i})
        await user.click(botonCerrarSesion)

        expect(closeSesion).toHaveBeenCalled(1)

    })

    it("Alternar la visibilidad del menu", async() =>{
        const user = userEvent.setup()
        renderHeaderClientes()

        const navMenu = screen.getByRole("navigation", {includeHidden: true})
        const botonMenu = screen.getByRole("button", {name: ""})

        expect(navMenu).toHaveClass("hidden")

        await user.click(botonMenu)
        expect(navMenu).not.toHaveClass("hidden")

        await user.click(botonMenu)
        expect(navMenu).toHaveClass("hidden")

    })
})