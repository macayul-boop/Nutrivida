import { useState } from "react"

import InformeNutricionista from "../../componente/InformeNutricionista"
import FormularioInforme from "../../componente/FormularioInforme"

const clientes = [
    {id:1, rut:"222606497", nombre:"Matias", apellidos: "Igancion Cayul", email:"example@gmail.com", telefono:"+56963391571", planAlimenticio: "Toma 5 litros de agua diario"},
    {id:2, rut:"123456789", nombre:"Gaspar", apellidos: "Vergara Palavecino", email:"example@gmail.com", telefono:"+56963391571", planAlimenticio: "Come 3 galletas a la semana"}
]

const informesDatos = [
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
    const [informes, setInformes] = useState(informesDatos)
    const [modalInforme, setModalInforme] = useState(false)
    const [editandoInforme, setEditandoInforme] = useState(null)
    
    const eventoCrearInforme = ()=>{
        setModalInforme(!modalInforme)
    }

    const eventoEditarInforme = (informe)=>{
        setEditandoInforme(informe)
        setModalInforme(!modalInforme)
    }

    const guardarInforme = (informe)=>{
        if(editandoInforme !== null){
            setInformes(informes.map((value)=> value.id === informe.id ? informe : value))
            setEditandoInforme(null)
        }else{
            informe.clienteId = usuarioEncontrado.id
            setInformes([...informes, informe])
            console.log(informe)
        }
    }


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
                    <section className="w-full grid grid-cols-1 lg:grid-cols-2 px-2 gap-2.5 mt-10">
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
                        <section>
                            <h2 className="text-2xl lg:text-3xl font-semibold">Informes</h2>
                            <section className="flex justify-end mt-2.5">
                                <button onClick={()=> eventoCrearInforme()} className="px-4 py-2 bg-green-700 text-white rounded-md flex gap-1.5 font-semibold cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    Crear informe
                                </button>
                            </section>
                            <section className="flex flex-col gap-1.5 border border-gray-300 rounded-md p-4 mt-5">
                                {informesUsuario.map((value)=>(
                                    <InformeNutricionista key={value.id} datos={value} onEditar={()=> eventoEditarInforme(value)}/>
                                ))}
                            </section>
                        </section>
                    </section>
                }

            </main>
            {modalInforme && 
                <FormularioInforme 
                    onCerrarModal={()=>setModalInforme(!modalInforme)}
                    onGuardar={guardarInforme}
                    editandoInforme={editandoInforme}
                />
            }
        </div>
    )
}

export default NutricionistaFichaClinica