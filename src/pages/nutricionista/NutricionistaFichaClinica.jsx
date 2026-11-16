import { useState } from "react"

import InformeNutricionista from "../../componente/InformeNutricionista"
import FormularioInforme from "../../componente/FormularioInforme"
import DetallesInforme from "../../componente/DetallesInforme"

import axiosClient from "../../api/axiosClient"


function NutricionistaFichaClinica(){

    const [busqueda, setBusqueda] = useState('')
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(null)
    const [informes, setInformes] = useState([])
    const [modalInforme, setModalInforme] = useState(false)
    const [editandoInforme, setEditandoInforme] = useState(null)
    const [listaMostrarInforme, setListaMostrarInforme] = useState([])
    
    const [esEditable, setEsEditable] = useState(false);
    const [tempTexto, setTempTexto] = useState('');

    const [cargando, setCargando] = useState(false)
    const[errorBusqueda, setErrorBusqueda] = useState("")


    const eventoBuscar = async (e) => {
        if (e) e.preventDefault()
        const rutLimpio = busqueda.trim()
        if (!rutLimpio) return

        setCargando(true)
        setErrorBusqueda("")
        setEsEditable(false)
        setListaMostrarInforme([])

        try{
            const[resPaciente, resFicha] = await Promise.all([
                axiosClient.get("/usuarios/pacientes", {params: {rut:rutLimpio}}),
                axiosClient.get("/fichas-clinicas", {params:{rut:rutLimpio}}).catch(() => ({ data: {}}))
            ])

            const datosPaciente = resPaciente.data
            const datosFicha = resFicha.data || {}
            setUsuarioEncontrado({
                ...datosPaciente,
            planAlimentacion: datosFicha.planAlimentacion ?? datosPaciente.planAlimentacion ?? ""
            })

            const listaInformes = datosFicha.informes || datosFicha.listaInformes || []
            setInformes(listaInformes)
        }catch (error){
            console.error("Error al buscar paciente: ", error)
            setUsuarioEncontrado(null)
            setInformes([])
            setErrorBusqueda(
                error.response?.status === 404
                    ? "No se encontró ningún paciente con ese rut."
                    : "Ocurrió un error al consulta los datos del paciente."
            )
        }finally{
            setCargando(false)
        }
    }


    const eventoEditarPlan = () => {
        setTempTexto(usuarioEncontrado.planAlimentacion || "");
        setEsEditable(true);
    };

    const eventoGuardarPlan = async () => {
        try{
            await axiosClient.put(`/fichas-clinicas/${usuarioEncontrado.id}/plan`,{planAlimentacion: tempTexto})

            setUsuarioEncontrado({
                ...usuarioEncontrado,
                planAlimentacion:tempTexto
            })
            setEsEditable(false)
        }catch (error){
            console.error("Error al actualizar el plan nutricional: ", error)
            alert("No se pudo guardar el plan nutricional. Verifica los datos e intenta nuevamente.")
        }
    };

    const eventoCancelarPlan = () => {
        setEsEditable(false);
    };


    const eventoCrearInforme = ()=>{
        setEditandoInforme(null)
        setModalInforme(true)
    }

    const eventoEditarInforme = (informe)=>{
        setEditandoInforme(informe)
        setModalInforme(true)
    }

    const guardarInforme = async (informeFrom)=>{

        try{

            const hoyISO = new Date().toISOString().split("T")[0]
            let fechaFormateada = informeFrom.fecha || hoyISO

            if (fechaFormateada.includes("/")) {
                const [dia, mes, anio] = fechaFormateada.split("/");
                fechaFormateada = `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
            }

            const payload ={
                ...informeFrom,
                peso: Number(informeFrom.peso),
                talla: Number(informeFrom.talla),
                circunferenciaCintura: Number(informeFrom.circunferenciaCintura)
            }

            if(editandoInforme !==null){
                const res = await axiosClient.put(`/fichas-clinicas/${usuarioEncontrado.id}/informes/${editandoInforme.id}`, payload)
                const informeActualizado = res.data

                setInformes(informes.map((item) => (item.id === informeActualizado.id ? informeActualizado : item)))
                setListaMostrarInforme(listaMostrarInforme.map((item) => (item.id === informeActualizado.id ? informeActualizado : item)))
                setEditandoInforme(null)
            }else{
                const res = await axiosClient.post(`/fichas-clinicas/${usuarioEncontrado.id}/informes`, payload)
                const nuevoInforme = res.data
                
                setInformes([...informes, nuevoInforme])
            }

            setModalInforme(false)

        }catch (error){
            console.error("Error al guardar el informe: ", error )
            alert("Ocurrió un error al guardar el informe clínico.")
        }
    }


    const eventoMostrarDetalleInforme = async (informe) => {
        if(listaMostrarInforme.find((value)=> value.id === informe.id)) return
        
        try{
            const res = await axiosClient.get(`/fichas-clinicas/${usuarioEncontrado.id}/informes/${informe.id}`)
            
            setListaMostrarInforme([...listaMostrarInforme, res.data])
        }catch (error){
            console.error("Error al obtener detalle del informe: ",error)
            setListaMostrarInforme([...listaMostrarInforme,informe])
        }
    }

    const eventoOcultarInforme = (informeId) =>{
        setListaMostrarInforme(listaMostrarInforme.filter((value)=> value.id !== informeId)) 
    }


    return(
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Historial Clinico</h1>
                </section>

                <form onSubmit={eventoBuscar} className="border-b border-gray-300 flex justify-between gap-4 py-6">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Ingresa un Rut (ej: 624345261)"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={cargando}
                        className="px-4 py-2 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800 flex items-center gap-1.5 rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        {cargando ? "Buscando..." : "Buscar"}
                    </button>
                </form>

                {errorBusqueda && (
                    <p className="mt-4 text-red-600 font-medium px-2">{errorBusqueda}</p>
                )}

                {usuarioEncontrado && (
                    <div>
                        <section className="w-full grid grid-cols-1 lg:grid-cols-2 px-2 gap-10 mt-10">
                            {/* Columna Izquierda: Datos personales y Plan nutricional */}
                            <section>
                                <h2 className="text-2xl lg:text-3xl font-semibold">
                                    {usuarioEncontrado.nombre} {usuarioEncontrado.apellidos}
                                </h2>
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
                                        {!esEditable ? (
                                            <button onClick={eventoEditarPlan} className="px-4 py-1.5 bg-blue-800 text-white rounded-md text-sm cursor-pointer">
                                                Editar
                                            </button>
                                        ) : (
                                            <div className="flex gap-1.5">
                                                <button onClick={eventoCancelarPlan} className="px-4 py-1.5 bg-gray-300 text-gray-600 rounded-md text-sm cursor-pointer">
                                                    Cancelar
                                                </button>
                                                <button onClick={eventoGuardarPlan} className="px-4 py-1.5 bg-green-800 text-white rounded-md text-sm cursor-pointer">
                                                    Guardar
                                                </button>
                                            </div>
                                        )}
                                    </section>
                                </section>

                                <section className="mt-2.5">
                                    {esEditable ? (
                                        <textarea
                                            className="w-full h-44 resize-none border border-gray-200 rounded-lg py-2 px-4"
                                            placeholder="Agrega información extra..."
                                            value={tempTexto}
                                            onChange={(e) => setTempTexto(e.target.value)}
                                        />
                                    ) : (
                                        <p className="border border-gray-300 px-4 py-2 rounded-md min-h-[3rem] whitespace-pre-line">
                                            {usuarioEncontrado.planAlimentacion || "El paciente no tiene un plan de alimentación asignado."}
                                        </p>
                                    )}
                                </section>
                            </section>

                            <section>
                                <h2 className="text-2xl lg:text-3xl font-semibold">Informes</h2>
                                <section className="flex justify-end mt-2.5">
                                    <button onClick={eventoCrearInforme} className="px-4 py-2 bg-green-700 text-white rounded-md flex gap-1.5 font-semibold cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                        Crear informe
                                    </button>
                                </section>
                                <section className="flex flex-col gap-1.5 border border-gray-300 rounded-md p-4 mt-5 max-h-[220px] overflow-y-scroll">
                                    {informes.length === 0 ? (
                                        <p className="text-gray-500 text-sm italic text-center py-4">
                                            No hay informes registrados para este paciente.
                                        </p>
                                    ) : (
                                        informes.map((value) => (
                                            <InformeNutricionista
                                                key={value.id}
                                                datos={value}
                                                onEditar={() => eventoEditarInforme(value)}
                                                onMostrar={() => eventoMostrarDetalleInforme(value)}
                                            />
                                        ))
                                    )}
                                </section>
                            </section>
                        </section>

                        <section className="flex flex-wrap gap-2.5 px-2 mt-8">
                            {listaMostrarInforme.map((value) => (
                                <DetallesInforme
                                    key={value.id}
                                    datos={value}
                                    onCerrar={() => eventoOcultarInforme(value.id)}
                                />
                            ))}
                        </section>
                    </div>
                )}
            </main>
            {modalInforme && (
                <FormularioInforme
                    onCerrarModal={(e) => {
                        if (e) e.preventDefault();
                        setModalInforme(false);
                        setEditandoInforme(null);
                    }}
                    onGuardar={guardarInforme}
                    editandoInforme={editandoInforme}
                />
            )}
        </div>
    )
}

export default NutricionistaFichaClinica