import { useState } from "react"
import SelectorDia from "./SelectorDia"
import SelectorHora from "./SelectorHora"


const nutricionistas = [
    {id:2, nombre:"Carolina", apellidos:"Fuentes", horario:[{dia:"Lunes",horaInicio:"09:00",horaTermino:"17:00"},{dia:"Miercoles",horaInicio:"09:00",horaTermino:"17:00"},  { dia:"Viernes",horaInicio:"09:00",horaTermino:"17:00"}]},
    {id:3, nombre:"Rodrigo", apellidos:"Sepulveda", horario:[{dia:"Martes",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Jueves",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Sabado",horaInicio:"09:00",horaTermino:"14:00"}]},
    {id:4, nombre:"Daniela", apellidos:"Morales", horario:[{dia:"Lunes", horaInicio:"08:00", horaTermino:"13:00"},{dia:"Viernes",horaInicio:"08:00",horaTermino:"13:00"}]},
    {id:5, nombre:"Rodrigo", apellidos:"Sepulveda", horario:[{dia:"Martes",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Jueves",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Sabado",horaInicio:"09:00",horaTermino:"14:00"}]},
    {id:6, nombre:"Felipe", apellidos:"Araya", horario:[{dia:"Martes",horaInicio:"14:00",horaTermino:"19:00"},{dia:"Viernes",horaInicio:"14:00",horaTermino:"19:00"}]}
]

const tipoConsultas = [
    {id:1, nombre:"Primera consulta nutricional", modalidad:"Presencial", precio:30000, duracion:30},
    {id:2, nombre:"Control nutricional (seguiminento)", modalidad:"Presencial", precio:30000, duracion:30},
    {id:3, nombre:"Control nutricional quincinal", modalidad:"Presencial", precio:30000, duracion:30},
    {id:4, nombre:"Consulta de urgencia", modalidad:"Presencial", precio:30000, duracion:30},
    {id:5, nombre:"Antropometria completa", modalidad:"Presencial", precio:30000, duracion:30},
    {id:6, nombre:"Bioimpedanciometría", modalidad:"Presencial", precio:30000, duracion:30},
    {id:7, nombre:"Encuesta de hábitos alimenticios", modalidad:"Presencial", precio:30000, duracion:30},
    {id:8, nombre:"Análisis de exámenes de laboratorio.", modalidad:"Presencial", precio:30000, duracion:30}
    
]

function FormularioEditarReserva({datos, onCerrarModal, onGuardar}){

    const [fechaReserva, setFechaReserva] = useState(null)
    const [horaReserva, setHoraReserva] = useState(null);
    const [error, setError] = useState({})

    const nutricionistaSeleccionado = nutricionistas.find((n) => n.id === Number(datos?.idNutricionista));
    const servicioSeleccionado = tipoConsultas.find((s) => s.id === Number(datos?.idConsulta));

    const handleDiaChange = (nuevaFecha) => {
        setFechaReserva(nuevaFecha);
        setHoraReserva(null);
    };

    const cancelar = (e)=>{
        e.preventDefault()
        onCerrarModal()
    }

    const validar = (e)=>{
        e.preventDefault()

        let nuevosErrores = {}

        if(fechaReserva == null){
            nuevosErrores.fecha = 'Selecciona un dia'
        }

        if(horaReserva == null){
            nuevosErrores.hora = 'Selecciona una hora'
        }

        setError(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){

            const nuevoDato = {
                id: datos.id, 
                idCliente: datos.idCliente, 
                nombreCliente: datos.nombreCliente, 
                rutCliente: datos.rutCliente, 
                idConsulta: datos.idConsulta, 
                idNutricionista: datos.idNutricionista, 
                nombreNutricionista: datos.nombreNutricionista, 
                fecha:fechaReserva.toLocaleDateString(),
                horaInicio:horaReserva,
                estado: datos.estado
            }
            


            onGuardar(nuevoDato)
            setError({})
            setFechaReserva(null)
            setHoraReserva(null)
            onCerrarModal()
            console.log(nuevoDato)
        }else{
            console.log("Hay un error")
        }
    }

    return(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-scroll">
            <form className="bg-white max-w-2xl mx-auto mt-5 md:mt-20 px-5 py-6 border border-gray-200 rounded-lg">
                <section className="text-center">
                    <p>Informacion</p>
                </section>
                <section>
                    <h4>Dias disponibles</h4>
                    <SelectorDia
                        horario={nutricionistaSeleccionado?.horario}
                        diaSeleccionado={fechaReserva}
                        onSeleccionarDia={handleDiaChange}
                    />

                    <h4>Horas disponibles</h4>
                    <SelectorHora
                        fechaSeleccionada={fechaReserva}
                        horarioNutricionista={nutricionistaSeleccionado?.horario}
                        duracionServicioMinutos={servicioSeleccionado?.duracion}
                        horaSeleccionada={horaReserva}
                        onSeleccionarHora={setHoraReserva}
                    />
                </section>
                <section className="flex justify-center">
                    {error && <span className="text-red-500 text-center">{error.fecha}</span>}
                    {error && <span className="text-red-500 text-center">{error.hora}</span>}
                </section> 
                <section className="flex justify-end gap-5 py-5">
                    <button  onClick={(e)=> cancelar(e)} className="bg-gray-300 rounded-lg py-2 px-4 text-gray-700 font-semibold">
                        Cancelar
                    </button>
                    <button onClick={(e)=> validar(e)} className="bg-green-800 rounded-lg py-2 px-4 text-white font-semibold">
                        Reservar
                    </button>
                </section>
            </form>
        </div>
    )
}

export default FormularioEditarReserva