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


function FormularioCrearReserva(){

    const [nutricionistaId, setNutricionistaId] = useState(nutricionistas[0].id)
    const [tipoConsultaId, setTipoConsultaId] = useState(tipoConsultas[0].id)
    const [fechaReserva, setFechaReserva] = useState(null)
    const [horaReserva, setHoraReserva] = useState(null);

    const nutricionistaSeleccionado = nutricionistas.find(
        (n) => n.id === Number(nutricionistaId)
    );

    const servicioSeleccionado = tipoConsultas.find((s) => s.id === Number(tipoConsultaId));

    const handleNutricionistaChange = (e) => {
        setNutricionistaId(Number(e.target.value));
        setFechaReserva(null);
        setHoraReserva(null);
    };

    const handleServicioChange = (e) => {
        setTipoConsultaId(Number(e.target.value));
        setHoraReserva(null); // Al cambiar la duración del servicio, recalculamos bloques
    };

    const handleDiaChange = (nuevaFecha) => {
        setFechaReserva(nuevaFecha);
        setHoraReserva(null); // Limpiamos la hora al cambiar de día
    };

    return(
        <form className=" max-w-2xl mx-auto px-5 py-6 border border-gray-200 rounded-lg">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                    <label>Tipo Consulta</label>
                    <select onChange={(e)=> handleServicioChange(e)} value={tipoConsultaId} name="tipoConsulta" className="py-2 py-2 border border-gray-300 rounded-lg">
                        {tipoConsultas.map((value) => (
                            <option key={value.id} value={value.id}>{value.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label>Nutricionista</label>
                    <select onChange={(e)=> handleNutricionistaChange(e)} value={nutricionistaId} name="nutricionista" className="py-2 py-2 border border-gray-300 rounded-lg">
                        {nutricionistas.map((value)=>(
                            <option key={value.id} value={value.id}>{value.nombre}  {value.apellidos}</option>
                        ))}
                    </select>
                </div>
            </section>
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
           
            {fechaReserva && (
                <p>Fecha elegida: {fechaReserva.toLocaleDateString()}</p>
            )}
        </form>
    )

}

export default FormularioCrearReserva