import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import ReservaSecretario from './ReservaSecretario'

const reservaMock = {
        datosClientes: {
            id: 1,
            nombre: "santiago",
            rutCliente: "624345261"
        },
        datosNutricionista: {
            horarioNutricionista: [
                {
                    id: 3,
                    diaSemana: "martes",
                    horaEntrada: "09:00:00",
                    horaSalida: "18:00:00"
                },
                {
                    id: 4,
                    diaSemana: "jueves",
                    horaEntrada: "10:00:00",
                    horaSalida: "18:00:00"
                }
            ],
            id: 6,
            nombre: "elena"
        },
        estado: "RESERVADA",
        fecha: "2099-11-05",
        horaInicio: "13:00:00",
        horaTermino: "13:50:00",
        id: 1,
        idCliente: 1,
        idNutricionista: 6,
        idServicio: 1,
        nombreServicio: "Primera consulta nutricional"
    }

describe("Test Reserva Secretario", () =>{

    const onEditarReserva = vi.fn()
    const onCancelarReserva =vi.fn()

    afterEach(() => {
        vi.clearAllMocks()
    })

    it("Renderizar la reserva", () => {
        render(<ReservaSecretario datos={reservaMock} onEditar={onEditarReserva} onCancelar={onCancelarReserva}/>)
        
        expect(screen.getByText(reservaMock.datosClientes.nombre)).toBeInTheDocument()
        expect(screen.getByText(reservaMock.datosNutricionista.nombre)).toBeInTheDocument()
        expect(screen.getByText(`${reservaMock.fecha} - ${reservaMock.horaInicio}`)).toBeInTheDocument()
        expect(screen.getByText(reservaMock.estado)).toBeInTheDocument()

    })

    it("Ejecuta la función Editar de Reserva del Secretario", async() => {
        const user = userEvent.setup()
        render(<ReservaSecretario datos={reservaMock} onEditar={onEditarReserva} onCancelar={onCancelarReserva}/>)

        const botonEditar = screen.getByRole("button", { name: "Editar reserva" });
        await user.click(botonEditar)

        expect(onEditarReserva).toHaveBeenCalledTimes(1)
    })

    it("Ejecuta la función Cancelar de Reserva del Secretario", async() => {
        const user = userEvent.setup()
        render(<ReservaSecretario datos={reservaMock} onEditar={onEditarReserva} onCancelar={onCancelarReserva}/>)

        const botonCancelar = screen.getByRole("button", { name: "Cancelar reserva" });
        await user.click(botonCancelar)

        expect(onCancelarReserva).toHaveBeenCalledTimes(1)
    })

    it("No muestra los botones si la reserva está cancelada", () => {
        render(
            <ReservaSecretario
                datos={{ ...reservaMock, estado: "CANCELADA" }}
                onEditar={vi.fn()}
                onCancelar={vi.fn()}
            />
        )

        expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })

    it("No muestra los botones si la reserva es de una fecha pasada", () => {
        render(
            <ReservaSecretario
                datos={{ ...reservaMock, fecha: "2026-11-05" }}
                onEditar={vi.fn()}
                onCancelar={vi.fn()}
            />
        )

        expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })

})