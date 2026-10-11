import {render, screen, within} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach} from "vitest"
import TusReservas, {ReservaCliente} from "./TusReservas"
import { reservaCliente } from "../../test/mocks"


vi.mock("../../componente/FormularioEditarReserva", () => ({
    default: ({onCerrarModal, onGuardar, datos}) => (
        <div data-testid="modal-editar">
            <span>Editando reserva {datos.id}</span>
            <button onClick={() => onGuardar({id:datos.id,horaInicio: "16:00"})}>Guardar Cambios</button>
            <button onClick={onCerrarModal}>Cerrar</button>
        </div>
    ),
}))
vi.mock("../../componente/ModalConfirmacion", () => ({
    default: ({titulo, onCancelar, onEvento, textEvento}) => (
        <div data-testid="modal-confirmacion">
            <p>{titulo}</p>
            <button onClick={onEvento}>{textEvento}</button>
            <button onClick={onCancelar}>Volver</button>
        </div>
    ),
}))
vi.mock("../../componente/DetallesInforme", () => ({
    default: ({datos, onCerrar}) => (
        <div data-testid="detalles-informe">
            <p>Informe: {datos.nombreConsulta}</p>
            <button onClick={onCerrar}>Cerrar Informe</button>
        </div>
    ),
}))




describe("Reserva cliente", () => {
    const onEditarReserva = vi.fn()
    const onCancelarReserva = vi.fn()
    const onMostrarReserva = vi.fn()

    it("Renderizar los datos  de reserva cliente", () => {

        render(
            <ReservaCliente datos={reservaCliente} onEditar={onEditarReserva} onCancelar={onCancelarReserva}/>
        )

        expect(screen.getByText("Consulta nutricional")).toBeInTheDocument()
        expect(screen.getByText("Presencial")).toBeInTheDocument()
        expect(screen.getByText(/25000/)).toBeInTheDocument()
        expect(screen.getByText(/60 min/)).toBeInTheDocument()
        expect(screen.getByText("Felipe Araya")).toBeInTheDocument()
        expect(screen.getByText("15/10/2026 - 14:00")).toBeInTheDocument()
        expect(screen.getByText("Reservado")).toBeInTheDocument()

    })

    it("Mostrar boton de ver informe", async() =>{
        const user = userEvent.setup()
        render(
            <ReservaCliente datos={reservaCliente} onMostrar={onMostrarReserva}/>
        )

        const botonInforme = screen.getByRole("button", {name: /ver informe clínico/i})
        expect(botonInforme).toBeInTheDocument()


        await user.click(botonInforme)
        expect(onMostrarReserva).toHaveBeenCalledTimes(1)
    })

    it("Ocultar botones para reserva cancelada", () => {

        render(
            <ReservaCliente datos={{...reservaCliente, estado:"Cancelado"}} onEditar={onEditarReserva} onCancelar={onCancelarReserva}/>
        )

        expect(screen.queryByRole("button", {name: /cancelar/i})).not.toBeInTheDocument()
        expect(screen.queryByRole("button", {name: /cambiar hora/i})).not.toBeInTheDocument()

    })
})


describe("Componente de Tus Reservas", () => {
    it("Renderiza los titulos y consultas", () => {
        render(<TusReservas/>)

        expect(screen.getByRole("heading",{level: 1, name: /tus reservas/i})).toBeInTheDocument()
        expect(screen.getByRole("heading",{level: 2, name: /tu próxima consulta/i})).toBeInTheDocument()
        expect(screen.getByRole("heading",{level: 2, name: /historial de consultas/i})).toBeInTheDocument()

        expect(screen.getByText("Consulta nutricional")).toBeInTheDocument()
        expect(screen.getByText("Primera consulta nutricional")).toBeInTheDocument()
        expect(screen.getByText("Control nutricional")).toBeInTheDocument()

    })

    it("Abrir Modal de edicón y guardar nueva hora", async() => {
        const user = userEvent.setup()
        render(<TusReservas/>)

        const botonCambiarHora = screen.getByRole("button", {name: /cambiar hora/i})
        await user.click(botonCambiarHora)

        expect(screen.getByTestId("modal-editar")).toBeInTheDocument()

        const botonGuardar = screen.getByRole("button", {name: /guardar cambios/i})
        await user.click(botonGuardar)

        expect(screen.getByText("15/10/2026 - 16:00")).toBeInTheDocument()
        expect(screen.queryByTestId("modal-editar")).toBeInTheDocument()

    })

    it("Abrir modal de confirmación y cancelar reserva", async() => {
        const user = userEvent.setup()
        render(<TusReservas/>)

        const botonCancelar = screen.getByRole("button", {name: /^cancelar$/i})
        await user.click(botonCancelar)

        expect(screen.getByTestId("modal-confirmacion")).toBeInTheDocument()

        const botonConfirmar = screen.getByRole("button", {name: /cancelar reserva/i})
        await user.click(botonConfirmar)

        expect(screen.getByText("Cancelado")).toBeInTheDocument()
        expect(screen.queryByTestId("modal-confirmacion")).not.toBeInTheDocument()

    })

    it("Desplegar y cerrar los detalles de un informe clinico del historial", async() => {
        const user = userEvent.setup()
        render(<TusReservas/>)

        const botonesInforme = screen.getAllByRole("button", {name: /ver informe clínico/i})
        await user.click(botonesInforme[0])

        expect(screen.getByTestId("detalles-informe")).toBeInTheDocument()
        expect(screen.getByText("Informe: Primera consulta nutricional")).toBeInTheDocument()

        const botonCerrarInforme = screen.getByRole("button",{name: /cerrar informe/i})
        await user.click(botonCerrarInforme)

        expect(screen.queryByTestId("detalles-informe")).not.toBeInTheDocument()
    })

})
