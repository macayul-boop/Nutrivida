import { useState, useEffect } from 'react';
import HeaderAdministracion from '../../componente/HeaderAdministracion';
import FormularioUsuario from '../../componente/FormularioUsuario';
import Empleado from '../../componente/Empleado';

function AdministracionUsuario(){

    const [modal, setModal] = useState(false)
    const [editandoUsuario, setEditandoUsuario] = useState(null)

    const toggle = ()=>{
        setModal(!modal)
    }

    const [listaUsuario, setListaUsuario] = useState(()=>{
        const usuariosGuardados = localStorage.getItem('usuarios');
        return usuariosGuardados 
            ? JSON.parse(usuariosGuardados) 
            : [{id:"1", rut:"22230649-7", nombre:"Matias", apellidos:"Cayul", telefono:"+56963391571", email:"example@gmail.com", contrasena:"1234567", rol:"Secretario", "estado":"Activo"}];
    })

    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(listaUsuario));
    }, [listaUsuario]);

    const guardarUsuario = (usuario)=>{
        if(editandoUsuario !== null){
            setListaUsuario(listaUsuario.map((value) => value.id === usuario.id ? usuario : value))
            setEditandoUsuario(null)
        }else{
            setListaUsuario([...listaUsuario, usuario])
        }
    }

    const editarUsuario = (usuario)=>{
        toggle()
        setEditandoUsuario(usuario)
    }

    return(
        <div>
            <HeaderAdministracion rol={"Administracion"}/>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Empleados</h1>
                </section>
                <section className='w-full flex justify-end'>
                    <button onClick={()=> toggle()} className='px-4 py-2 bg-green-600 rounded-lg cursor-pointer'>Crear usuario</button>
                </section>
                <section className='max-w-7xl w-full h-[25rem] overflow-y-scroll border border-gray-200 rounded-lg'>
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
                            <Empleado key={key} datos={value} onEditar={()=> editarUsuario(value)}/>
                        ))}
                    </section>
                </section>
            </main>
            {modal && <FormularioUsuario onCerrarModal={()=> toggle()} usuarioEditado={editandoUsuario} onGuardar={guardarUsuario} onLimpiarEditable={()=>setEditandoUsuario(null)} />}
        </div>
    )
    
}

export default AdministracionUsuario