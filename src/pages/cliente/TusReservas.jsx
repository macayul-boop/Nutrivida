import { useEffect, useState } from "react"
import FormularioEditarReserva from "../../componente/FormularioEditarReserva"
import ModalConfirmacion from "../../componente/ModalConfirmacion"
import { obtenerReservasDeUnCliente, editarReservaCliente, cancelarReservaCliente } from "../../services/reservaService"

const obtenerFechaHora = (reserva)=>{
    return new Date(`${reserva.fecha}T${reserva.horaInicio}`).getTime()
}

export function ReservaCliente({datos, onEditar, onCancelar}){
    const cancelada = datos.estado === "CANCELADA"
    const estado = cancelada ? "Cancelada" : datos.estado === "RESERVADA" ? "Reservada" : datos.estado

    return(
        <article className="max-w-[30rem] w-full border border-gray-200 rounded-xl p-3.5">
            <h3 className="font-semibold text-lg">
                {datos.nombreServicio}
            </h3>

            <section className="w-full mt-2 flex gap-4 sm:gap-6 flex-wrap">
                <div>
                    <p className="text-xs text-gray-500">Nutricionista</p>
                    <p className="text-gray-800">
                        {datos.datosNutricionista?.nombre ?? "No disponible"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">Estado</p>
                    <p className={cancelada ? "text-red-500 font-semibold" : "text-green-700 font-semibold"}>
                        {estado}
                    </p>
                </div>
            </section>

            <section className="mt-3 flex items-end justify-between flex-wrap gap-5">
                <div>
                    <p className="text-xs text-gray-500">Fecha y hora</p>
                    <p className="text-gray-800 font-semibold">
                        {datos.fecha.split("-").reverse().join("/")} · {datos.horaInicio.slice(0,5)}
                        {datos.horaTermino && ` – ${datos.horaTermino.slice(0,5)}`}
                    </p>
                </div>

                {datos.estado === "RESERVADA" && onEditar && onCancelar &&
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
                }
            </section>
        </article>
    )
}

export function TusReservas(){
    const [reservas, setReservas] = useState([])
    const [estadoLista, setEstadoLista] = useState("cargando")
    const [intento, setIntento] = useState(0)
    const [ahora, setAhora] = useState(0)
    const [reservaEditar, setReservaEditar] = useState(null)
    const [reservaCancelar, setReservaCancelar] = useState(null)
    const [cancelando, setCancelando] = useState(false)
    const [errorCancelar, setErrorCancelar] = useState("")

    useEffect(()=>{
        let activo = true

        obtenerReservasDeUnCliente()
            .then((res)=>{
                if(!activo) return
                setReservas(res.data)
                setAhora(Date.now())
                setEstadoLista("listo")
            })
            .catch(()=>{
                if(activo) setEstadoLista("error")
            })

        return ()=>{ activo = false }
    }, [intento])

    const reintentar = ()=>{
        setEstadoLista("cargando")
        setIntento((value)=> value + 1)
    }

    const actualizarReserva = (reserva)=>{
        setReservas((lista)=> lista.map((value)=> value.id === reserva.id ? reserva : value))
        setAhora(Date.now())
    }

    const editarReserva = async (datos)=>{
        const res = await editarReservaCliente(reservaEditar.id, datos)
        actualizarReserva(res.data)
        setReservaEditar(null)
    }

    const mostrarModalCancelar = (idReserva)=>{
        setErrorCancelar("")
        setReservaCancelar(idReserva)
    }

    const cancelarReserva = async ()=>{
        setCancelando(true)
        setErrorCancelar("")
        try{
            const res = await cancelarReservaCliente(reservaCancelar)
            actualizarReserva(res.data)
            setReservaCancelar(null)
        }catch{
            setErrorCancelar("No se pudo cancelar la reserva. Vuelve a intentarlo.")
        }finally{
            setCancelando(false)
        }
    }

    const esProxima = (reserva)=> reserva.estado === "RESERVADA" && obtenerFechaHora(reserva) >= ahora
    const proximasReservas = reservas.filter(esProxima)
        .sort((a,b)=> obtenerFechaHora(a) - obtenerFechaHora(b))
    const historial = reservas.filter((reserva)=> !esProxima(reserva))
        .sort((a,b)=> obtenerFechaHora(b) - obtenerFechaHora(a))

    return(
        <div>
            <main className="w-full pb-10">
                <section className="max-w-3xl mx-auto">
                    <h1 className="text-center text-3xl text-emerald-800 font-bold py-10">
                        Tus reservas
                    </h1>
                </section>

                {estadoLista === "cargando" && <p role="status" className="text-center">Cargando reservas...</p>}
                {estadoLista === "error" &&
                    <div className="text-center px-4">
                        <p role="alert">No se pudieron cargar tus reservas.</p>
                        <button onClick={reintentar} className="mt-2 underline">Volver a intentar</button>
                    </div>
                }

                {estadoLista === "listo" &&
                    <>
                        <section className="max-w-3xl mx-auto px-4">
                            <section className="w-full border-b-3 border-zinc-800">
                                <h2 className="text-center sm:text-start text-2xl font-semibold py-5 text-zinc-900">
                                    Próximas consultas
                                </h2>
                            </section>

                            <section className="mt-7 flex flex-col gap-4">
                                {proximasReservas.length === 0 && <p>No tienes reservas próximas.</p>}
                                {proximasReservas.map((value)=>(
                                    <ReservaCliente
                                        key={value.id}
                                        datos={value}
                                        onEditar={()=> setReservaEditar(value)}
                                        onCancelar={()=> mostrarModalCancelar(value.id)}
                                    />
                                ))}
                            </section>
                        </section>

                        <section className="max-w-3xl mx-auto mt-5 px-4">
                            <section className="w-full border-b-3 border-zinc-800">
                                <h2 className="text-center sm:text-start text-2xl font-semibold py-5 text-zinc-900">
                                    Historial de reservas
                                </h2>
                            </section>

                            <section className="mt-7 flex flex-col gap-5">
                                {historial.length === 0 && <p>No tienes reservas anteriores ni canceladas.</p>}
                                {historial.map((value)=>(
                                    <ReservaCliente key={value.id} datos={value}/>
                                ))}
                            </section>
                        </section>
                    </>
                }
            </main>

            {reservaEditar !== null &&
                <FormularioEditarReserva
                    datos={reservaEditar}
                    onCerrarModal={()=> setReservaEditar(null)}
                    onGuardar={editarReserva}
                />
            }

            {reservaCancelar !== null &&
                <ModalConfirmacion
                    titulo="¿Estás seguro de que quieres cancelar la reserva?"
                    onCancelar={()=> setReservaCancelar(null)}
                    onEvento={cancelarReserva}
                    textEvento="Cancelar reserva"
                    procesando={cancelando}
                    error={errorCancelar}
                />
            }
        </div>
    )
}

export default TusReservas
