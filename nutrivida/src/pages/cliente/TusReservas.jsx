import { useState } from "react"
import FormularioEditarReserva from "../../componente/FormularioEditarReserva"
import ModalConfirmacion from "../../componente/ModalConfirmacion"
const RESERVAS_INICIALES = [
    {
        id: 1,
        idCliente: 7,
        nombreCliente: "Eduardo",
        rutCliente: "123456789",
        idConsulta: 1,
        nombreConsulta: "Consulta nutricional",
        modalidad: "Presencial",
        precio: 25000,
        duracion: 60,
        idNutricionista: 6,
        nombreNutricionista: "Felipe Araya",
        fecha: "15/10/2026",
        horaInicio: "14:00",
        estado: "Reservado"
    }
]

function ReservaCliente({datos, onEditar, onCancelar}){

    return(
        <article className="max-w-[30rem] w-full border border-gray-200 rounded-xl p-3.5">
            <h3 className="font-semibold text-lg">
                {datos.nombreConsulta}
            </h3>

            <section className="w-full mt-2 flex gap-4 sm:gap-6 flex-wrap">
                <div>
                    <p className="text-xs text-gray-500">
                        Modalidad
                    </p>
                    <p className="text-gray-800">
                        {datos.modalidad}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        Precio
                    </p>
                    <p className="text-gray-800">
                        ${datos.precio}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        Duración
                    </p>
                    <p className="text-gray-800">
                        {datos.duracion} min
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        Nutricionista
                    </p>
                    <p className="text-gray-800">
                        {datos.nombreNutricionista}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">
                        Estado
                    </p>

                    <p className={
                        datos.estado === "Cancelado"
                            ? "text-red-500 font-semibold"
                            : "text-green-700 font-semibold"
                    }>
                        {datos.estado}
                    </p>
                </div>
            </section>

            <section className="mt-3 flex justify-between flex-wrap gap-5">
                <div>
                    <p className="text-xs text-gray-500">
                        Fecha y hora
                    </p>
                    <p className="text-gray-800 font-semibold">
                        {datos.fecha} - {datos.horaInicio}
                    </p>
                </div>

                <div className="flex items-end gap-3.5">
                    <button
                        onClick={onCancelar}
                        className="bg-red-400 hover:bg-red-500 text-white py-1 px-2 rounded-sm cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onEditar}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-sm cursor-pointer"
                    >
                        Cambiar hora
                    </button>
                </div>
            </section>
        </article>
    )
}

function TusReservas(){
    const [reservas, setReservas] = useState(RESERVAS_INICIALES)
    const [reservaEditar, setReservaEditar] = useState(null)
    const [modalEditarReserva, setModalEditarReserva] = useState(false)
    const [modalCancelarReserva, setModalCancelarReserva] = useState(false)
    const [reservaCancelar, setReservaCancelar] = useState(null)
    const mostrarModalEditar = (reserva)=>{
        setModalEditarReserva(!modalEditarReserva)
        setReservaEditar(reserva)
    }

    const editarReserva = (reserva)=>{
        setReservas(
            reservas.map((value)=>
                value.id === reserva.id
                    ? {...value, ...reserva}
                    : value
            )
        )
    }
    const mostrarModalCancelar = (idReserva)=>{
        setModalCancelarReserva(!modalCancelarReserva)
        setReservaCancelar(idReserva)
    }

    const cancelarReserva = ()=>{
        const nuevaLista = reservas.map((value)=>{
            if(value.id === reservaCancelar){
                value.estado = "Cancelado"
            }

            return value
        })

        setReservas(nuevaLista)
        setReservaCancelar(null)
        setModalCancelarReserva(!modalCancelarReserva)
    }
    return(
        <div>
            <main className="w-full pb-10">

                <section className="max-w-3xl mx-auto">
                    <h1 className="text-center text-3xl text-emerald-800 font-bold py-10">
                        Tus reservas
                    </h1>
                </section>

                <section className="max-w-3xl mx-auto px-4">

                    <section className="w-full border-b-3 border-zinc-800">
                        <h2 className="text-center sm:text-start text-2xl font-semibold py-5 text-zinc-900">
                            Tu próxima consulta
                        </h2>
                    </section>

                    <section className="mt-7 flex flex-col gap-4">
                        {reservas.map((value)=>(
                            <ReservaCliente
                                key={value.id}
                                datos={value}
                                onEditar={()=> mostrarModalEditar(value)}
                                onCancelar={()=> mostrarModalCancelar(value.id)}
                            />
                        ))}
                    </section>

                </section>

            </main>

            {modalEditarReserva &&
                <FormularioEditarReserva
                    datos={reservaEditar}
                    onCerrarModal={()=> setModalEditarReserva(!modalEditarReserva)}
                    onGuardar={editarReserva}
                />
            }

            {modalCancelarReserva &&
                <ModalConfirmacion
                    titulo={"¿Estas seguro de que quieres cancelar la reserva?"}
                    onCancelar={()=>{
                        setModalCancelarReserva(!modalCancelarReserva)
                        setReservaCancelar(null)
                    }}
                    onEvento={()=> cancelarReserva()}
                    textEvento={"Cancelar reserva"}
                />
            }
        </div>
    )
}

export default TusReservas