import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ReservaSecretario from './ReservaSecretario'
import { reservaSecretarioTest } from '../test/mocks'


describe("Test Reserva Secretario", () =>{

    const onEditarReserva = vi.fn()
    const onCancelarReserva =vi.fn()

    const renderReservaSecretario = (props ={}) => {
        return render(
            <ReservaSecretario datos={reservaSecretarioTest} onEditar={onEditarReserva} onCancelar={onCancelarReserva} {...props}/>
        )
    }


    it("Renderizar la reserva", () => {
        renderReservaSecretario()

        expect(screen.getByText(reservaSecretarioTest.nombreCliente)).toBeInTheDocument()
        expect(screen.getByText(reservaSecretarioTest.nombreNutricionista)).toBeInTheDocument()
        expect(screen.getByText(`${reservaSecretarioTest.fecha} - ${reservaSecretarioTest.horaInicio}`)).toBeInTheDocument()
        expect(screen.getByText(reservaSecretarioTest.estado)).toBeInTheDocument()

    })


    it("Ejecuta la función Editar de Reserva del Secretario", async() => {
        const user = userEvent.setup()
        renderReservaSecretario()

        const [botonEditar] = screen.getAllByRole("button")
        await user.click(botonEditar)

        expect(onEditarReserva).toHaveBeenCalledTimes(1)
    })

    it("Ejecuta la función Cancelar de Reserva del Secretario", async() => {
        const user = userEvent.setup()
        renderReservaSecretario()

        const [, botonCancelar] = screen.getAllByRole("button")
        await user.click(botonCancelar)

        expect(onCancelarReserva).toHaveBeenCalledTimes(1)
    })

})