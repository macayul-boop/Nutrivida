import { useState } from "react"

import SelectorDia from "../../componente/SelectorDia"
import DetalleReserva from "../../componente/DetalleReserva"

const nutricionistas = [
    {id:2, nombre:"Carolina", apellidos:"Fuentes", horario:[{dia:"Lunes",horaInicio:"09:00",horaTermino:"17:00"},{dia:"Miercoles",horaInicio:"09:00",horaTermino:"17:00"},  { dia:"Viernes",horaInicio:"09:00",horaTermino:"17:00"}]},
]

const reservas = [
    {id:1, idNutricionista:2, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"5/10/2026", horaInicio:"10:30"},
    {id:2, idNutricionista:2, idCliente: 2, nombreCliente: "Benjamin", rutCliente: "222606498", idConsulta:3, nombreConsulta:"Control nutricional quincenal", fecha:"7/10/2026", horaInicio:"10:30"},
    {id:3, idNutricionista:2, idCliente: 3, nombreCliente: "Horacio", rutCliente: "222606499", idConsulta:2, nombreConsulta:"Primera consulta nutricional", fecha:"9/10/2026", horaInicio:"10:30"},
]

function NutricionistaAgenda(){

    const [fecha, setFecha] = useState(null)

    const handleDiaChange = (nuevaFecha) => {
        setFecha(nuevaFecha);
    };

    return(
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Agenda</h1>
                </section>
                <section className="mt-5">
                    <SelectorDia
                        horario={nutricionistas[0]?.horario}
                        diaSeleccionado={fecha}
                        onSeleccionarDia={handleDiaChange}
                        diaSiguiente={false}
                    />
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 py-4 ">
                    {fecha == null && <span className="text-gray-700">Selecciona un dia</span>}
                    {((reservas.filter((value)=> value.fecha == fecha?.toLocaleDateString()).length === 0) && fecha != null) && <span className="text-gray-700">No hay citas</span>}
                    {reservas
                        .filter((value)=> value.fecha == fecha?.toLocaleDateString())
                        .map((value)=>(
                            <DetalleReserva key={value.id} datos={value}/>
                        ))
                    }
                </section>
            </main>
        </div>
    )
}

export default NutricionistaAgenda