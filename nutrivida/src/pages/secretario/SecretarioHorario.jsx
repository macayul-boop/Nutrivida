import { useState } from "react"
import SelectorDia from "../../componente/SelectorDia"
import DetalleReserva from "../../componente/DetalleReserva"

const nutricionistas = [
    {id:2, nombre:"Carolina", apellidos:"Fuentes", horario:[{dia:"Lunes",horaInicio:"09:00",horaTermino:"17:00"},{dia:"Miercoles",horaInicio:"09:00",horaTermino:"17:00"},  { dia:"Viernes",horaInicio:"09:00",horaTermino:"17:00"}]},
    {id:3, nombre:"Rodrigo", apellidos:"Sepulveda", horario:[{dia:"Martes",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Jueves",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Sabado",horaInicio:"09:00",horaTermino:"14:00"}]},
    {id:4, nombre:"Daniela", apellidos:"Morales", horario:[{dia:"Lunes", horaInicio:"08:00", horaTermino:"13:00"},{dia:"Viernes",horaInicio:"08:00",horaTermino:"13:00"}]},
    {id:5, nombre:"Rodrigo", apellidos:"Sepulveda", horario:[{dia:"Martes",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Jueves",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Sabado",horaInicio:"09:00",horaTermino:"14:00"}]},
    {id:6, nombre:"Felipe", apellidos:"Araya", horario:[{dia:"Martes",horaInicio:"14:00",horaTermino:"19:00"},{dia:"Viernes",horaInicio:"14:00",horaTermino:"19:00"}]}
]

const reservas = [
    {id:1, idNutricionista:2, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"5/10/2026", horaInicio:"10:30"},
    {id:2, idNutricionista:2, idCliente: 2, nombreCliente: "Benjamin", rutCliente: "222606498", idConsulta:3, nombreConsulta:"Control nutricional quincenal", fecha:"7/10/2026", horaInicio:"10:30"},
    {id:3, idNutricionista:2, idCliente: 3, nombreCliente: "Horacio", rutCliente: "222606499", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"9/10/2026", horaInicio:"10:30"},

    {id:4, idNutricionista:3, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"6/10/2026", horaInicio:"10:30"},
    {id:5, idNutricionista:3, idCliente: 2, nombreCliente: "Benjamin", rutCliente: "222606498", idConsulta:3, nombreConsulta:"Control nutricional quincenal", fecha:"8/10/2026", horaInicio:"10:30"},
    {id:6, idNutricionista:3, idCliente: 3, nombreCliente: "Horacio", rutCliente: "222606499", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"10/10/2026", horaInicio:"10:30"},

    {id:7, idNutricionista:4, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"5/10/2026", horaInicio:"10:30"},
    {id:8, idNutricionista:4, idCliente: 2, nombreCliente: "Benjamin", rutCliente: "222606498", idConsulta:3, nombreConsulta:"Control nutricional quincenal", fecha:"5/10/2026", horaInicio:"12:00"},
    {id:9, idNutricionista:4, idCliente: 3, nombreCliente: "Horacio", rutCliente: "222606499", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"9/10/2026", horaInicio:"10:30"},

    {id:10, idNutricionista:5, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"6/10/2026", horaInicio:"10:30"},
    {id:11, idNutricionista:5, idCliente: 2, nombreCliente: "Benjamin", rutCliente: "222606498", idConsulta:3, nombreConsulta:"Control nutricional quincenal", fecha:"8/10/2026", horaInicio:"12:00"},
    {id:12, idNutricionista:5, idCliente: 3, nombreCliente: "Horacio", rutCliente: "222606499", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"10/10/2026", horaInicio:"10:30"},

    {id:13, idNutricionista:6, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"6/10/2026", horaInicio:"10:30"},
    {id:14, idNutricionista:6, idCliente: 2, nombreCliente: "Benjamin", rutCliente: "222606498", idConsulta:3, nombreConsulta:"Control nutricional quincenal", fecha:"6/10/2026", horaInicio:"12:00"},
    {id:15, idNutricionista:6, idCliente: 3, nombreCliente: "Horacio", rutCliente: "222606499", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"9/10/2026", horaInicio:"10:30"}
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
                
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 py-4 ">
                    
                    {fecha == null && <span className="text-gray-700">Selecciona un dia</span>}

                    {((reservas.filter((value)=> value.fecha == fecha?.toLocaleDateString() && value.idNutricionista == nutricionistaId).length === 0) && fecha != null) && <span className="text-gray-700">No hay citas</span>}

                    {reservas
                        .filter((value)=> value.fecha == fecha?.toLocaleDateString() && value.idNutricionista == nutricionistaId)
                        .map((value)=>(
                            <DetalleReserva key={value.id} datos={value}/>
                        ))
                    }
                </section>
            </main>
        </div>
    )
}

export default SecretarioHorario