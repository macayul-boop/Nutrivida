import { useState } from 'react';
import Servicio from '../../componente/Servicio';
import FormularioServicio from '../../componente/FormularioServicio';
import ModalConfirmacion from '../../componente/ModalConfirmacion';
const SERVICIOS_INICIALES = [
    {
        id:1,
        nombre:"Primera consulta nutricional",
        precio:35000,
        duracion:60,
        modalidad:"Presencial"
    },
    {
        id:2,
        nombre:"Control nutricional",
        precio:25000,
        duracion:30,
        modalidad:"Presencial"
    },
    {
        id:3,
        nombre:"Consulta nutricional online",
        precio:20000,
        duracion:30,
        modalidad:"Online"
    },
    {
        id:4,
        nombre:"Antropometria completa",
        precio:18000,
        duracion:45,
        modalidad:"Presencial"
    }
]

function AdministracionServicios(){

    const [listaServicios, setListaServicios] = useState(SERVICIOS_INICIALES)
    const [modal, setModal] = useState(false)
    const [editandoServicio, setEditandoServicio] = useState(null)
    const abrirFormulario = ()=>{
        setEditandoServicio(null)
        setModal(true)
    }

    const cerrarFormulario = ()=>{
        setEditandoServicio(null)
        setModal(false)
    }

    const guardarServicio = (servicio)=>{
        if(editandoServicio !== null){
            setListaServicios(listaServicios.map((value) => value.id === servicio.id ? servicio : value))
            setEditandoServicio(null)
        }else{
            setListaServicios([...listaServicios, servicio])
        }
    }

    const editarServicio = (servicio)=>{
        setEditandoServicio(servicio)
        setModal(true)
    }

    const [modalEliminar, setModalEliminar] = useState(false)

    const [servicioEliminar, setServicioEliminar] = useState(null)

    const mostrarModalEliminar = (idServicio)=>{
        setModalEliminar(!modalEliminar)
        setServicioEliminar(idServicio)
    }

    const cancelarEliminar = ()=>{
        setModalEliminar(!modalEliminar)
        setServicioEliminar(null)
    }

    const eliminarServicio = (idServicio)=>{
        setListaServicios(listaServicios.filter((value) => value.id !== idServicio))
        setModalEliminar(!modalEliminar)
        setServicioEliminar(null)
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
                        className="px-4 py-2 bg-green-800 text-white font-semibold rounded-lg cursor-pointer"
                    >
                        Crear servicio
                    </button>
                </section>
                <section className="max-w-7xl w-full h-[25rem] overflow-auto border border-gray-200 rounded-lg">
                    <div className="min-w-[700px]">
                        <section className="w-full grid grid-cols-5 py-2 bg-gray-900 text-white px-4">
                            <p>Nombre</p>
                            <p>Precio</p>
                            <p>Duracion</p>
                            <p>Modalidad</p>
                            <p>Acciones</p>
                        </section>

                        <section>
                            {listaServicios.map((value)=>(
                                <Servicio
                                    key={value.id}
                                    datos={value}
                                    onEditar={()=> editarServicio(value)}
                                    onEliminar={()=> mostrarModalEliminar(value.id)}
                                />
                            ))}
                        </section>
                    </div>
                </section>
            </main>
            {modal &&
            <FormularioServicio
                onCerrarModal={()=> cerrarFormulario()}
                onGuardar={guardarServicio}
                servicioEditable={editandoServicio}
            />
        }
        {modalEliminar &&
            <ModalConfirmacion
                titulo={"¿Estas seguro que quieres eliminar el servicio?"}
                onCancelar={()=> cancelarEliminar()}
                onEvento={()=> eliminarServicio(servicioEliminar)}
                textEvento={"Eliminar"}
            />
        }
        </div>
    )

}

export default AdministracionServicios