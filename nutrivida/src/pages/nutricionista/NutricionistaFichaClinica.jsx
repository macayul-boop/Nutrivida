import { useState } from "react"


const clientes = [
    {id:1, rut:"222606497", nombre:"Matias", apellidos: "Igancion Cayul", email:"example@gmail.com", telefono:"+56963391571", planAlimenticio: "Toma 5 litros de agua diario"},
    {id:2, rut:"123456789", nombre:"Gaspar", apellidos: "Vergara Palavecino", email:"example@gmail.com", telefono:"+56963391571", planAlimenticio: "Come 3 galletas a la semana"}
]

const informes = [
    {id:1, clienteId: 1, fecha: "4/10/2026", peso: 80, talla:0, circunferenciaCintura: 0, descripcion: "El paciente indica..."},
    {id:2, clienteId: 1, fecha: "5/10/2026", peso: 80, talla:0, circunferenciaCintura: 0, descripcion: "El paciente indica..."},
    {id:3, clienteId: 1, fecha: "6/10/2026", peso: 80, talla:0, circunferenciaCintura: 0, descripcion: "El paciente indica..."},

    {id:4, clienteId: 2, fecha: "4/10/2026", peso: 80, talla:0, circunferenciaCintura: 0, descripcion: "El paciente indica..."},
    {id:5, clienteId: 2, fecha: "5/10/2026", peso: 80, talla:0, circunferenciaCintura: 0, descripcion: "El paciente indica..."},
    {id:6, clienteId: 2, fecha: "6/10/2026", peso: 80, talla:0, circunferenciaCintura: 0, descripcion: "El paciente indica..."}
]

function NutricionistaFichaClinica(){

    const [busqueda, setBusqueda] = useState('')
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(null)

    const eventoBuscar = ()=>{
        const encontrado = clientes.find((value) => value.rut === busqueda.trim())
        encontrado ? setUsuarioEncontrado(encontrado) : setUsuarioEncontrado(null)
    }

    const informesUsuario = usuarioEncontrado
        ? informes.filter((i) => i.clienteId === usuarioEncontrado.id)
        : [];

    return(
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Historial Clinico</h1>
                </section>

                <section className="border-b border-gray-300 flex justify-between gap-4 py-6">
                    <input type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Ingresa un Rut (222606497)"
                        value={busqueda}
                        onChange={(e)=> setBusqueda(e.target.value)}
                    />
                    <button onClick={()=> eventoBuscar()} className="px-4 py-2 bg-gray-300 text-gray-600 flex gap-1.5 rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        Buscar
                    </button>
                </section>

                {usuarioEncontrado &&
                    <section className="w-full grid grid-cols-1 lg:grid-cols-2 px-2 gap-2.5">
                        <section className="bg-blue-200">
                            <h2 className="text-2xl lg:text-3xl font-semibold">{usuarioEncontrado.nombre} {usuarioEncontrado.apellidos}</h2>
                            <section className="max-full mt-4 flex gap-4 flex-wrap">
                                <span>
                                    <p className="text-sm text-gray-500">Telefono</p>
                                    <p className="text-gray-800 text-base">{usuarioEncontrado.telefono}</p>
                                </span>
                                <span>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-800 text-base">{usuarioEncontrado.email}</p>
                                </span>
                                <span>
                                    <p className="text-sm text-gray-500">Rut</p>
                                    <p className="text-gray-800 text-base">{usuarioEncontrado.rut}</p>
                                </span>
                            </section>
                        </section>
                        <section className="bg-red-200">
                            <p>d</p>
                        </section>
                    </section>
                }

            </main>
        </div>
    )
}

export default NutricionistaFichaClinica