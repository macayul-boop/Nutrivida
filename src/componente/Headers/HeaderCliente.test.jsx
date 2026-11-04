import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi, beforeEach} from 'vitest'
import HeaderCliente from './HeaderCliente'
import {  clienteHeader } from '../../test/mocks'
import { useAuth } from '../../context/AuthContext'

vi.mock('../../context/AuthContext', () => ({
    useAuth: vi.fn()
}));

describe("Prueba del Header Cliente logeado", () => {
    
    const closeSesion = vi.fn();

    beforeEach(() => {
        vi.mocked(useAuth).mockReturnValue({
            usuario: {
                email: clienteHeader.email,
                id: clienteHeader.id,
                roles: ["CLIENTE"]
            },
            logout: closeSesion
        });
    });

    const renderHeaderClientes = () => {
        return render(
            <MemoryRouter>
                <HeaderCliente />
            </MemoryRouter>
        );
    };

    it("Renderizar el correo del cliente y las opciones del menu", () => {
        renderHeaderClientes();

        expect(screen.getByText(clienteHeader.email)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /servicios/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /nosotros/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /tus reservas/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /reservar/i })).toBeInTheDocument();
    });

    it("Prueba de cerrar sesion del cliente", async () => {
        const user = userEvent.setup();
        renderHeaderClientes();

        const botonCerrarSesion = screen.getByRole("button", { name: /cerrar sesion/i });
        await user.click(botonCerrarSesion);

        expect(closeSesion).toHaveBeenCalledTimes(1);
    });

    it("Alternar la visibilidad del menu", async () => {
        const user = userEvent.setup();
        renderHeaderClientes();

        const navMenu = screen.getByRole("navigation");
        const botonMenu = screen.getByRole("button", { name: "" });

        expect(navMenu).toHaveClass("hidden");

        await user.click(botonMenu);
        expect(navMenu).not.toHaveClass("hidden");

        await user.click(botonMenu);
        expect(navMenu).toHaveClass("hidden");
    });
})