import { useState, useEffect } from "react"
import SelectorDia from "./SelectorDia"
import SelectorHora from "./SelectorHora"
import { obtenerNutricionistaSimplificado } from '../services/usuarioService'
import { obtenerUnServicio } from '../services/servicioService'
import { obtenerHorasDisponibles } from '../services/reservaService'

const formatearFecha = (fecha) => {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
};

function FormularioEditarReserva({datos, onCerrarModal, onGuardar}){
    
    const [tipoConsulta, setTipoConsulta] = useState(null)
    const [nutricionista, setNutricionista] = useState(null)
    const [horasDisponibles, setHorasDisponibles] = useState([])
    const [fechaReserva, setFechaReserva] = useState(null)
    const [horaReserva, setHoraReserva] = useState(null)
    const [error, setError] = useState({})
    const [errorCarga, setErrorCarga] = useState("")
    const [errorHoras, setErrorHoras] = useState("")
    const [cargandoHoras, setCargandoHoras] = useState(false)
    const [guardando, setGuardando] = useState(false)
    const [errorGuardar, setErrorGuardar] = useState("")

    useEffect(()=>{
        let activo = true

        Promise.all([
            obtenerUnServicio(datos.idServicio),
            obtenerNutricionistaSimplificado(datos.idNutricionista)
        ]).then(([resServicio, resNutricionista])=>{
            if(!activo) return
            setTipoConsulta(resServicio.data)
            setNutricionista(resNutricionista.data)
        }).catch(()=>{
            if(activo) setErrorCarga("No se pudieron cargar los datos de la reserva.")
        })

        return ()=>{ activo = false }
    }, [datos.idServicio, datos.idNutricionista])

    useEffect(()=>{
        if(!fechaReserva) return
        let activo = true

        obtenerHorasDisponibles(datos.idNutricionista, datos.idServicio, formatearFecha(fechaReserva))
            .then((res)=>{
                if(activo) setHorasDisponibles(res.data)
            })
            .catch(()=>{
                if(activo) setErrorHoras("No se pudieron cargar las horas. Selecciona el día para reintentar.")
            })
            .finally(()=>{
                if(activo) setCargandoHoras(false)
            })

        return ()=>{ activo = false }
    }, [fechaReserva, datos.idNutricionista, datos.idServicio])

    const handleDiaChange = (nuevaFecha)=>{
        setFechaReserva(new Date(nuevaFecha))
        setHoraReserva(null)
        setHorasDisponibles([])
        setCargandoHoras(true)
        setErrorHoras("")
        setErrorGuardar("")
        setError({})
    }

    const validar = async (e)=>{
        e.preventDefault()
        if(guardando || cargandoHoras || !tipoConsulta || !nutricionista) return

        let nuevosErrores = {}

        if(fechaReserva == null){
            nuevosErrores.fecha = 'Selecciona un dia'
        }

        if(horaReserva == null){
            nuevosErrores.hora = 'Selecciona una hora'
        }

        setError(nuevosErrores)
        setErrorGuardar("")

        if(Object.keys(nuevosErrores).length === 0){
            const nuevoDato = {
                fecha: formatearFecha(fechaReserva),
                horaInicio: horaReserva
            }

            setGuardando(true)
            try{
                await onGuardar(nuevoDato)
            }catch(error){
                setErrorGuardar(error.response?.status === 409
                    ? "No se pudo confirmar ese horario. Revisa las horas disponibles."
                    : "No se pudo cambiar la hora de la reserva. Vuelve a intentarlo.")
            }finally{
                setGuardando(false)
            }
        }
    }

    return(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-scroll">
            <form onSubmit={validar} role="dialog" aria-labelledby="titulo-editar-reserva" className="bg-white max-w-2xl mx-auto mt-5 md:mt-20 px-5 py-6 border border-gray-200 rounded-lg">
                <h2 id="titulo-editar-reserva" className="text-xl font-semibold">Cambiar hora</h2>

                {errorCarga && <p role="alert" className="text-red-600">{errorCarga}</p>}
                {!errorCarga && (!tipoConsulta || !nutricionista) &&
                    <p role="status">Cargando datos de la reserva...</p>
                }

                <fieldset disabled={guardando}>
                    {tipoConsulta &&
                        <div className="flex justify-between items-center gap-4 px-2 sm:px-10 md:px-25 my-5">
                            <div>
                                <p className="text-sm text-gray-600">Modalidad</p>
                                <p className="text-gray-950">{tipoConsulta.modalidad}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Precio</p>
                                <p className="text-gray-950">${tipoConsulta.precio}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Duración</p>
                                <p className="text-gray-950">{tipoConsulta.duracionMinutos} min</p>
                            </div>
                        </div>
                    }

                    {tipoConsulta && nutricionista &&
                        <section>
                            <h4>Días disponibles</h4>
                            <SelectorDia
                                horario={nutricionista.horarioNutricionista}
                                diaSeleccionado={fechaReserva}
                                onSeleccionarDia={handleDiaChange}
                            />

                            <h4>Horas disponibles</h4>
                            {cargandoHoras && <p role="status">Cargando horas...</p>}
                            {errorHoras && <p role="alert" className="text-red-600">{errorHoras}</p>}
                            {!cargandoHoras && !errorHoras &&
                                <SelectorHora
                                    fechaSeleccionada={fechaReserva}
                                    horasDisponibles={horasDisponibles}
                                    horaSeleccionada={horaReserva}
                                    onSeleccionarHora={setHoraReserva}
                                />
                            }
                        </section>
                    }

                    <section className="flex flex-col items-center">
                        {error.fecha && <span className="text-red-500">{error.fecha}</span>}
                        {error.hora && <span className="text-red-500">{error.hora}</span>}
                        {errorGuardar && <p role="alert" className="text-red-600">{errorGuardar}</p>}
                    </section>
                    <section className="flex justify-end gap-5 py-5">
                        <button type="button" onClick={onCerrarModal} className="bg-gray-300 rounded-lg py-2 px-4 text-gray-700 font-semibold">
                            Cancelar
                        </button>
                        <button type="submit" disabled={!tipoConsulta || !nutricionista || cargandoHoras} className="bg-green-800 rounded-lg py-2 px-4 text-white font-semibold disabled:opacity-50">
                            {guardando ? "Guardando..." : "Reservar"}
                        </button>
                    </section>
                </fieldset>
            </form>
        </div>
    )
}

export default FormularioEditarReserva
