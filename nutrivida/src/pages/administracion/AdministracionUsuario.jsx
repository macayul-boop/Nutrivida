import { useState, useEffect } from 'react';
import HeaderAdministracion from '../../componente/HeaderAdministracion';
import FormularioUsuario from '../../componente/FormularioUsuario';
import Empleado from '../../componente/Empleado';
import ModalConfirmacion from '../../componente/ModalConfirmacion';
import DetallesEmpleados from '../../componente/DetallesEmpleado';

function AdministracionUsuario(){

    // Controlar el modal de crear
    const [modal, setModal] = useState(false)

    // Controlar y mandar informacion para eliminar un usuario
    const [modalEliminar, setModalEliminar] = useState(false)
    const [usuarioEliminar, setUsuarioEliminar] = useState(null)

    // Controlar el usaurio que se esta eliminado
    const [editandoUsuario, setEditandoUsuario] = useState(null)

    // lista de usaurios
    const [listaUsuario, setListaUsuario] = useState(()=>{
        const usuariosGuardados = localStorage.getItem('usuarios');
        return usuariosGuardados 
            ? JSON.parse(usuariosGuardados) 
            : [
                {
                    id:1, 
                    rut:"222306497", 
                    nombre:"Matias", 
                    apellidos:"Cayul", 
                    telefono:"+56963391571", 
                    email:"example@gmail.com", 
                    contrasena:"1234567", 
                    rol:"Admin", 
                    estado:"Activo"
                },
                {
                    id:2, 
                    rut:"123456789", 
                    nombre:"Carolina", 
                    apellidos:"Fuentes", 
                    telefono:"+56912345678", 
                    email: "example@gmail.com", 
                    contrasena:"1234567", 
                    rol:"Nutricionista", 
                    estado:"Activo", 
                    horario:[
                        {
                            dia:"Lunes",
                            horaInicio:"09:00",
                            horaTermino:"17:00"
                        },
                        {
                            dia:"Miercoles",
                            horaInicio:"09:00",
                            horaTermino:"17:00"
                        },
                        {
                            dia:"Viernes",
                            horaInicio:"09:00",
                            horaTermino:"17:00"
                        }
                    ]
                },
                {
                    id:3, 
                    rut:"123456789", 
                    nombre:"Rodrigo", 
                    apellidos:"Sepulveda", 
                    telefono:"+56912345678", 
                    email: "example@gmail.com", 
                    contrasena:"1234567", 
                    rol:"Nutricionista", 
                    estado:"Activo", 
                    horario:[
                        {
                            dia:"Martes",
                            horaInicio:"09:00",
                            horaTermino:"14:00"
                        },
                        {
                            dia:"Jueves",
                            horaInicio:"09:00",
                            horaTermino:"14:00"
                        },
                        {
                            dia:"Sabado",
                            horaInicio:"09:00",
                            horaTermino:"14:00"
                        }
                    ]
                },
                {
                    id:4, 
                    rut:"123456789", 
                    nombre:"Daniela", 
                    apellidos:"Morales", 
                    telefono:"+56912345678", 
                    email: "example@gmail.com", 
                    contrasena:"1234567", 
                    rol:"Nutricionista", 
                    estado:"Activo", 
                    horario:[
                        {
                            dia:"Lunes",
                            horaInicio:"08:00",
                            horaTermino:"13:00"
                        },
                        {
                            dia:"Viernes",
                            horaInicio:"08:00",
                            horaTermino:"13:00"
                        }
                    ]
                },
                {
                    id:4, 
                    rut:"123456789", 
                    nombre:"Rodrigo", 
                    apellidos:"Sepulveda", 
                    telefono:"+56912345678", 
                    email: "example@gmail.com", 
                    contrasena:"1234567", 
                    rol:"Nutricionista", 
                    estado:"Activo", 
                    horario:[
                        {
                            dia:"Martes",
                            horaInicio:"09:00",
                            horaTermino:"14:00"
                        },
                        {
                            dia:"Jueves",
                            horaInicio:"09:00",
                            horaTermino:"14:00"
                        },
                        {
                            dia:"Sabado",
                            horaInicio:"09:00",
                            horaTermino:"14:00"
                        }
                    ]
                },
                {
                    id:5, 
                    rut:"123456789", 
                    nombre:"Felipe", 
                    apellidos:"Araya", 
                    telefono:"+56912345678", 
                    email: "example@gmail.com", 
                    contrasena:"1234567", 
                    rol:"Nutricionista", 
                    estado:"Activo", 
                    horario:[
                        {
                            dia:"Martes",
                            horaInicio:"14:00",
                            horaTermino:"19:00"
                        },
                        {
                            dia:"Viernes",
                            horaInicio:"14:00",
                            horaTermino:"19:00"
                        }
                    ]
                }
            ];
    })

    const [detallesUsuarios, setDetallesUsuarios] = useState([])

    // Se guarada los datos cada vez que se modifica la lista de usuario
    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(listaUsuario));
    }, [listaUsuario]);

    // Abrir o cerrar el modal de crear usuario
    const toggle = ()=>{
        setModal(!modal)
    }

    // Guardar el usuario
    const guardarUsuario = (usuario)=>{
        if(editandoUsuario !== null){
            setListaUsuario(listaUsuario.map((value) => value.id === usuario.id ? usuario : value))
            setEditandoUsuario(null)
        }else{
            setListaUsuario([...listaUsuario, usuario])
        }
    }

    // le asiganas el usaurio a ediat y activa el formulario
    const editarUsuario = (usuario)=>{
        toggle()
        setEditandoUsuario(usuario)
    }

    // Activa el modal y asignar el id del usuario a eliminar
    const mostrarModalEliminar = (idUsuario)=>{
        console.log("Funcion mostrar modal eliminar")
        setModalEliminar(!modalEliminar)
        setUsuarioEliminar(idUsuario);
    }

    // Caneler la accion y quita el usuario a eliminar y descativa el modal
    const cancelarEliminar = ()=>{
        setModalEliminar(!modalEliminar)
        setUsuarioEliminar(null)
    }

    // Elimina el usuario y libera el id del usaurio eliminado
    const eliminarUsuario = (idUsuario)=>{
        setListaUsuario(listaUsuario.filter(value=> value.id !== idUsuario));
        setModalEliminar(!modalEliminar)
        setUsuarioEliminar(null)
    }

    // Agregar un usuario a la lista ver detalles
    const agregarDetallesUsuarios = (usuario)=>{
        const existeUsuario = detallesUsuarios.find((value) => value.id === usuario.id)
        if(existeUsuario !== undefined) return
        setDetallesUsuarios([...detallesUsuarios, usuario])
    }

    // Ocultar detalles de un usuario
    const ocultarDetallesUsuario = (idUsuario) => {
        const nuevaLista = detallesUsuarios.filter((value) => value.id !== idUsuario);
        setDetallesUsuarios(nuevaLista)
    }

    return(
        <div>
            <HeaderAdministracion rol={"Administracion"}/>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Empleados</h1>
                </section>
                <section className='w-full flex justify-end py-4'>
                    <button onClick={()=> toggle()} className='px-4 py-2 bg-green-800 text-white font-semibold rounded-lg cursor-pointer'>Crear usuario</button>
                </section>
                <section className='max-w-7xl w-full h-[20rem] overflow-y-scroll border border-gray-200 rounded-lg'>
                    <section className='w-full grid py-2 bg-gray-900 text-white px-4 grid grid-cols-4'>
                        <div>
                            <p>Nombre</p>
                        </div>
                        <div>
                            <p>Rol</p>
                        </div>
                        <div>
                            <p>Estado</p>
                        </div>
                    </section>
                    <section>
                        {listaUsuario.map((value, key) => (
                            <Empleado key={key} datos={value} onEditar={()=> editarUsuario(value)} onEliminar={()=> mostrarModalEliminar(value.id)} onShow={()=> agregarDetallesUsuarios(value)}/>
                        ))}
                    </section>
                </section>
                <section className='flex flex-wrap items-center lg:justify-start'>
                    {detallesUsuarios.map((value, key)=> (
                        <DetallesEmpleados key={key} datos={value} onCerrar={()=> ocultarDetallesUsuario(value.id)}/>
                    ))}
                </section>
            </main>
            {modal && <FormularioUsuario onCerrarModal={()=> toggle()} usuarioEditado={editandoUsuario} onGuardar={guardarUsuario} onLimpiarEditable={()=>setEditandoUsuario(null)} />}
            {modalEliminar && <ModalConfirmacion titulo={"¿Estas seguro que quieres eliminar el usuario?"} onCancelar={()=> cancelarEliminar()} onEvento={()=>eliminarUsuario(usuarioEliminar)} textEvento={"Eliminar"}/>}
        </div>
    )
    
}

export default AdministracionUsuario