import { useState, useEffect } from 'react';
import HeaderAdministracion from '../../componente/HeaderAdministracion';
import FormularioUsuario from '../../componente/FormularioUsuario';

function AdministracionUsuario(){

    const [modal, setModal] = useState(false)

    const toggle = ()=>{
        setModal(!modal)
    }

    const [listaUsuario, setListaUsuario] = useState(()=>{
        const usuariosGuardados = localStorage.getItem('usuarios');
        return usuariosGuardados 
            ? JSON.parse(usuariosGuardados) 
            : [{id:"1", rut:"22230649-7", nombre:"Matias", apellidos:"Cayul", telefono:"+56963391571", email:"example@gmail.com", contrasena:"1234567", rol:"Secretario"}];
    })

    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(listaUsuario));
    }, [listaUsuario]);

    const guardarUsuario = (usuario)=>{
        setListaUsuario([...listaUsuario, usuario])
    }

    return(
        <div>
            <HeaderAdministracion rol={"Administracion"}/>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Usuarios</h1>
                </section>
                <section className='w-full flex justify-end'>
                    <button onClick={()=> toggle()} className='px-4 py-2 bg-green-600 rounded-lg cursor-pointer'>Crear usuario</button>
                </section>
                
            </main>
            {modal && <FormularioUsuario onCerrarModal={()=> toggle()} onGuardar={guardarUsuario}/>}
        </div>
    )
    
}

export default AdministracionUsuario