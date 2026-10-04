import { useState } from "react"
import SelectorDia from "../../componente/SelectorDia"

const nutricionistas = [
    {id:2, nombre:"Carolina", apellidos:"Fuentes", horario:[{dia:"Lunes",horaInicio:"09:00",horaTermino:"17:00"},{dia:"Miercoles",horaInicio:"09:00",horaTermino:"17:00"},  { dia:"Viernes",horaInicio:"09:00",horaTermino:"17:00"}]},
    {id:3, nombre:"Rodrigo", apellidos:"Sepulveda", horario:[{dia:"Martes",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Jueves",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Sabado",horaInicio:"09:00",horaTermino:"14:00"}]},
    {id:4, nombre:"Daniela", apellidos:"Morales", horario:[{dia:"Lunes", horaInicio:"08:00", horaTermino:"13:00"},{dia:"Viernes",horaInicio:"08:00",horaTermino:"13:00"}]},
    {id:5, nombre:"Rodrigo", apellidos:"Sepulveda", horario:[{dia:"Martes",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Jueves",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Sabado",horaInicio:"09:00",horaTermino:"14:00"}]},
    {id:6, nombre:"Felipe", apellidos:"Araya", horario:[{dia:"Martes",horaInicio:"14:00",horaTermino:"19:00"},{dia:"Viernes",horaInicio:"14:00",horaTermino:"19:00"}]}
]

const reservas = [
    
]

function SecretarioHorario(){

    const [nutricionistaId, setNutricionistaId] = useState(nutricionistas[0].id)
    const [fecha, setFecha] = useState(null)

    const nutricionistaSeleccionado = nutricionistas.find((n) => n.id === Number(nutricionistaId));

    const handleNutricionistaChange = (e) => {
        setNutricionistaId(Number(e.target.value));
        setFecha(null);
    };

    const handleDiaChange = (nuevaFecha) => {
        setFecha(nuevaFecha);
    };

    return(
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Horarios Agenda</h1>
                </section>

                <section className="flex flex-col mt-5 gap-1.5">
                    <label className="font-semibold text-lg">Nutricionista</label>
                    <select onChange={(e) => handleNutricionistaChange(e)} className="px-4 py-2 border border-gray-300 rounded-lg">
                        {nutricionistas.map((value)=>(
                            <option key={value.id} value={value.id}>{value.nombre} {value.apellidos}</option>
                        ))}
                    </select>
                </section>

                <section className="mt-5">
                    <SelectorDia
                        horario={nutricionistaSeleccionado?.horario}
                        diaSeleccionado={fecha}
                        onSeleccionarDia={handleDiaChange}
                        diaSiguiente={false}
                    />
                </section>
            </main>
        </div>
    )
}

export default SecretarioHorario