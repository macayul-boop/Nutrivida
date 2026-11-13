import { useEffect, useState } from 'react';
import Servicio from '../../componente/Servicio';
import FormularioServicio from '../../componente/FormularioServicio';
import ModalConfirmacion from '../../componente/ModalConfirmacion';
import { obtenerServicios, crearServicio, editarServicio, eliminarServicio } from '../../services/servicioService';

function AdministracionServicios(){

    const [listaServicios, setListaServicios] = useState([])
    const [estadoLista, setEstadoLista] = useState('cargando')
    const [versionLista, setVersionLista] = useState(0)
    const [modal, setModal] = useState(false)
    const [editandoServicio, setEditandoServicio] = useState(null)
    const [servicioEliminar, setServicioEliminar] = useState(null)
    const [eliminando, setEliminando] = useState(false)
    const [errorEliminar, setErrorEliminar] = useState('')

    useEffect(()=>{
        let activo = true

        obtenerServicios()
            .then((res)=>{
                if(!activo) return
                setListaServicios(res.data)
                setEstadoLista('listo')
            })
            .catch(()=>{
                if(activo) setEstadoLista('error')
            })

        return ()=>{ activo = false }
    }, [versionLista])

    const actualizarLista = ()=>{
        setEstadoLista('cargando')
        setVersionLista((version)=> version + 1)
    }

    const abrirFormulario = ()=>{
        setEditandoServicio(null)
        setModal(true)
    }

    const cerrarFormulario = ()=>{
        setEditandoServicio(null)
        setModal(false)
    }

    const guardarServicio = async (servicio)=>{
        if(editandoServicio !== null){
            await editarServicio(editandoServicio.id, servicio)
        }else{
            await crearServicio(servicio)
        }
        actualizarLista()
    }

    const abrirEdicion = (servicio)=>{
        setEditandoServicio(servicio)
        setModal(true)
    }

    const mostrarModalEliminar = (idServicio)=>{
        setErrorEliminar('')
        setServicioEliminar(idServicio)
    }

    const confirmarEliminar = async ()=>{
        setEliminando(true)
        setErrorEliminar('')
        try{
            await eliminarServicio(servicioEliminar)
            setServicioEliminar(null)
            actualizarLista()
        }catch{
            setErrorEliminar('No se pudo eliminar el servicio.')
        }finally{
            setEliminando(false)
        }
    }
    return(
        <div>
            <main className="overflow-x-hidden lg:ml-[300px] ml-0 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">
                        Servicios
                    </h1>
                </section>
                <section className="w-full flex justify-end py-4">
                    <button
                        onClick={()=> abrirFormulario()}
                        disabled={estadoLista === 'cargando'}
                        className="px-4 py-2 bg-green-800 text-white font-semibold rounded-lg cursor-pointer disabled:opacity-50"
                    >
                        Crear servicio
                    </button>
                </section>
                <section className="max-w-7xl w-full h-[25rem] overflow-auto border border-gray-200 rounded-lg">
                    <div className="min-w-[700px]">
                        <section className="w-full grid grid-cols-5 py-2 bg-gray-900 text-white px-4">
                            <p>Nombre</p>
                            <p>Precio</p>
                            <p>Duración</p>
                            <p>Modalidad</p>
                            <p>Acciones</p>
                        </section>

                        <section>
                            {estadoLista === 'cargando' && <p className="p-4" role="status">Cargando servicios...</p>}
                            {estadoLista === 'error' &&
                                <div className="p-4">
                                    <p role="alert">No se pudieron cargar los servicios.</p>
                                    <button onClick={actualizarLista} className="mt-2 underline">Volver a intentar</button>
                                </div>
                            }
                            {estadoLista === 'listo' && listaServicios.length === 0 &&
                                <p className="p-4">No hay servicios registrados.</p>
                            }
                            {estadoLista === 'listo' && listaServicios.map((value)=>(
                                <Servicio
                                    key={value.id}
                                    datos={value}
                                    onEditar={()=> abrirEdicion(value)}
                                    onEliminar={()=> mostrarModalEliminar(value.id)}
                                />
                            ))}
                        </section>
                    </div>
                </section>
            </main>
            {modal &&
                <FormularioServicio
                    onCerrarModal={cerrarFormulario}
                    onGuardar={guardarServicio}
                    servicioEditable={editandoServicio}
                />
            }
            {servicioEliminar !== null &&
                <ModalConfirmacion
                    titulo="¿Estás seguro de que quieres eliminar el servicio?"
                    descripcion="También se eliminarán las reservas asociadas a este servicio."
                    onCancelar={()=> setServicioEliminar(null)}
                    onEvento={confirmarEliminar}
                    textEvento="Eliminar"
                    procesando={eliminando}
                    error={errorEliminar}
                />
            }
        </div>
    )

}

export default AdministracionServicios
