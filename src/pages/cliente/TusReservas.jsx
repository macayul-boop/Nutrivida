import { useState } from "react"
import FormularioEditarReserva from "../../componente/FormularioEditarReserva"
import ModalConfirmacion from "../../componente/ModalConfirmacion"
import DetallesInforme from "../../componente/DetallesInforme"
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
const HISTORIAL_CONSULTAS = [
    {
        id: 1,
        nombreConsulta: "Primera consulta nutricional",
        modalidad: "Presencial",
        precio: 30000,
        duracion: 30,
        nombreNutricionista: "Felipe Araya",
        fecha: "30/08/2026",
        horaInicio: "14:00",
        peso: 80,
        talla: 1.72,
        circunferenciaCintura: 90,
        descripcion: "El paciente presenta avances en sus hábitos alimenticios y mantiene correctamente las indicaciones entregadas."
    },
    {
        id: 2,
        nombreConsulta: "Control nutricional",
        modalidad: "Presencial",
        precio: 30000,
        duracion: 30,
        nombreNutricionista: "Felipe Araya",
        fecha: "15/09/2026",
        horaInicio: "10:30",
        peso: 78,
        talla: 1.72,
        circunferenciaCintura: 87,
        descripcion: "El paciente disminuyó su peso y circunferencia de cintura. Se recomienda continuar con el plan nutricional."
    }
]

function ReservaCliente({datos, onEditar, onCancelar, onMostrar}){

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
                {datos.estado &&
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
                }
                
            </section>

            <section className="mt-3 flex items-end justify-between flex-wrap gap-5">
                <div>
                    <p className="text-xs text-gray-500">
                        Fecha y hora
                    </p>

                    <p className="text-gray-800 font-semibold">
                        {datos.fecha} - {datos.horaInicio}
                    </p>
                </div>

                {onMostrar ? (
                    <button
                        onClick={onMostrar}
                        className="ml-auto p-2.5 cursor-pointer"
                        aria-label="Ver informe clínico"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </button>
                ) : (
                    datos.estado !== "Cancelado" &&
                        <div className="ml-auto flex items-end gap-3.5">
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
                )}
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
    const [listaMostrarInforme, setListaMostrarInforme] = useState([])
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
    const eventoMostrarDetalleInforme = (informe)=>{
        if(listaMostrarInforme.find((value)=> value.id === informe.id)) return

        setListaMostrarInforme([...listaMostrarInforme, informe])
    }

    const eventoOcultarInforme = (informeId)=>{
        setListaMostrarInforme(
            listaMostrarInforme.filter((value)=> value.id !== informeId)
        )
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
                <section className="max-w-3xl mx-auto mt-5 px-4">

                    <section className="w-full border-b-3 border-zinc-800">
                        <h2 className="text-center sm:text-start text-2xl font-semibold py-5 text-zinc-900">
                            Historial de consultas
                        </h2>
                    </section>

                    <section className="mt-7 flex flex-col gap-5">
                        {HISTORIAL_CONSULTAS.map((value)=>(
                            <ReservaCliente
                                key={value.id}
                                datos={value}
                                onMostrar={()=> eventoMostrarDetalleInforme(value)}
                            />
                        ))}
                    </section>

                    <section className="mt-5 flex flex-wrap gap-2.5">
                        {listaMostrarInforme.map((value)=>(
                            <DetallesInforme
                                key={value.id}
                                datos={value}
                                onCerrar={()=> eventoOcultarInforme(value.id)}
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