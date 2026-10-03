import { useState } from "react"
import ReservaSecretario from "../../componente/ReservaSecretario"

const DATOS_RESERVAS = [
    {id:1, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idNutricionista: 2, nombreNutricionista: "Alavaro", fecha:"10/12/2026", horaInicio:"10:30", estado:"Reseravda"}
]

function SecretarioReserva(){

    const [reservas, setReservas] = useState(DATOS_RESERVAS)

    return(
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="max-w-7xl w-full m-4 h-[25rem] overflow-y-scroll border border-gray-200 rounded-lg">
                    <div className="w-full grid grid-cols-5 py-2 bg-gray-900 text-white px-4">
                        <p>Cliente</p>
                        <p>Nutricionista</p>
                        <p>Fecha y Hora</p>
                        <p>Estado</p>
                    </div>
                    <section>
                        {reservas.map((value)=>(
                            <ReservaSecretario datos={value} key={value.id} onEditar={()=> console.log("Editar")} onCancelar={()=> console.log("cancelar")}/>
                        ))}
                    </section>
                </section>
            </main>
        </div>
    )
}

export default SecretarioReserva