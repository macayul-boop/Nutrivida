import { useState } from "react"

import InformeNutricionista from "../../componente/InformeNutricionista"
import FormularioInforme from "../../componente/FormularioInforme"
import DetallesInforme from "../../componente/DetallesInforme"

const clientes = [
    {id:1, rut:"222606497", nombre:"Matias", apellidos: "Igancion Cayul", email:"example@gmail.com", telefono:"+56963391571", planAlimentacion: "Toma 5 litros de agua diario"},
    {id:2, rut:"123456789", nombre:"Gaspar", apellidos: "Vergara Palavecino", email:"example@gmail.com", telefono:"+56963391571", planAlimentacion: "Come 3 galletas a la semana"}
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
    const [listaMostrarInforme, setListaMostrarInforme] = useState([])
    
    const [esEditable, setEsEditable] = useState(false);
    const [tempTexto, setTempTexto] = useState('');

    // Al hacer clic en "Editar"
    const eventoEditarPlan = () => {
        // Cargamos el plan actual del usuario en la variable temporal
        setTempTexto(usuarioEncontrado.planAlimentacion);
        setEsEditable(true);
    };

    // Al hacer clic en "Guardar"
    const eventoGuardarPlan = () => {
        // Actualizamos el objeto del usuario directamente en el estado principal
        setUsuarioEncontrado({
        ...usuarioEncontrado,
        planAlimentacion: tempTexto
        });
        setEsEditable(false);
    };

    // Al hacer clic en "Cancelar"
    const eventoCancelarPlan = () => {
        setEsEditable(false);
    };


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
            setModalInforme(!modalInforme) 
        }else{
            informe.clienteId = usuarioEncontrado.id
            setInformes([...informes, informe])
            setModalInforme(!modalInforme) 
        }
    }

    const eventoBuscar = ()=>{
        const encontrado = clientes.find((value) => value.rut === busqueda.trim())
        encontrado ? setUsuarioEncontrado(encontrado) : setUsuarioEncontrado(null)
    }

    const eventoMostrarDetalleInforme = (informe)=>{
        if(listaMostrarInforme.find((value)=> value.id === informe.id)) return
        setListaMostrarInforme([...listaMostrarInforme, informe])
    }

    const eventoOcultarInforme = (informeId) =>{
        setListaMostrarInforme(listaMostrarInforme.filter((value)=> value.id !== informeId)) 
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
                    <div>
                        <section className="w-full grid grid-cols-1 lg:grid-cols-2 px-2 gap-10 mt-10">
                            <section className="">
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
                                <section className="mt-5">
                                    <h3 className="text-lg font-semibold">Plan nutricional</h3>
                                    <section className="flex justify-end">
                                        {!esEditable 
                                        ? (<button onClick={eventoEditarPlan} className="px-4 py-1.5 bg-blue-800 text-white rounded-md text-sm">Editar</button>)
                                        : (
                                            <div className="flex gap-1.5">
                                                <button onClick={eventoCancelarPlan} className="px-4 py-1.5 bg-gray-300 text-gray-600 rounded-md text-sm">Cancelar</button>
                                                <button onClick={eventoGuardarPlan} className="px-4 py-1.5 bg-green-800 text-white rounded-md text-sm">Guardar</button>
                                            </div>
                                        )
                                    }
                                    </section>
                                </section>
                                <section className="mt-2.5">
                                    {esEditable ? (
                                        <textarea 
                                            className="w-full h-44 resize-none border border-gray-200 rounded-lg py-2 px-4"
                                            placeholder="Agrega información extra ac..."
                                            value={tempTexto}
                                            onChange={(e)=> setTempTexto(e.target.value)}
                                        />
                                    ) : (
                                        <p className="border border-gray-300 px-4 rounded-md">{usuarioEncontrado.planAlimentacion || "El paciente no tiene un plan de alimentación asignado."}</p>
                                    )}
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
                                <section className="flex flex-col gap-1.5 border border-gray-300 rounded-md p-4 mt-5 max-h-[160px] overflow-y-scroll">
                                    {informesUsuario.map((value)=>(
                                        <InformeNutricionista 
                                            key={value.id} 
                                            datos={value} 
                                            onEditar={()=> eventoEditarInforme(value)}
                                            onMostrar={()=> eventoMostrarDetalleInforme(value)}
                                        />
                                    ))}
                                </section>
                            </section>
                        </section>
                        <section className="flex flex-wrap gap-2.5 px-2 mt-8">
                            {listaMostrarInforme.map((value)=>(
                                <DetallesInforme key={value.id} datos={value} onCerrar={()=> eventoOcultarInforme(value.id)}/>
                            ))}
                        </section>
                    </div>
                }

            </main>
            {modalInforme && 
                <FormularioInforme 
                    onCerrarModal={(e)=> {
                        e.preventDefault()
                        setModalInforme(!modalInforme) 
                        setEditandoInforme(null)
                    }}
                    onGuardar={guardarInforme}
                    editandoInforme={editandoInforme}
                />
            }
        </div>
    )
}

export default NutricionistaFichaClinica