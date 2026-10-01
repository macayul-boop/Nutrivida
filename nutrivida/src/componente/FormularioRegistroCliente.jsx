import { useState } from "react"
import InputText from "./InputText"
import { useNavigate } from "react-router-dom"

const listaUsuario = [
                {
                    id:1, 
                    rut:"222306497", 
                    nombre:"Matias", 
                    apellidos:"Cayul", 
                    telefono:"+56963391571", 
                    email:"admin@gmail.com", 
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
                    email: "nutri1@gmail.com", 
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
                    email: "nutri2@gmail.com", 
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
                    email: "nutri3@gmail.com", 
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
                    email: "nutri4@gmail.com", 
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
                    email: "nutri5@gmail.com", 
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
            ]

const existeDatos = JSON.parse(localStorage.getItem('usuarios'));

if(existeDatos == null ){
    localStorage.setItem('usuarios', JSON.stringify(listaUsuario));
}

const DATOS_GUARDADOS = JSON.parse(localStorage.getItem('usuarios'));

function FormularioRegistroCliente(){
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [errores, setErrores] = useState({})

    const validarFormulario = (e)=>{
        e.preventDefault()
        
        let nuevosErrores = {}

        if(email.trim().length === 0){
            console.log(email)
            nuevosErrores.email = 'El email es obligatorio'
        }

        if(contrasena.trim().length === 0){
            nuevosErrores.contrasena = 'La contraseña es obligatoria'
        }

        setErrores(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){
            console.log("Paso con los campos llenos")
            iniciarSesion()
        }else{
            console.log("Fallo")
        }
    }

    const iniciarSesion = ()=>{
        const usuarioFiltrado = DATOS_GUARDADOS.filter((value)=> value.email == email && value.contrasena == contrasena)
        console.log(usuarioFiltrado)
        
        if(!usuarioFiltrado){
            console.log("usuario no encontrado")
        }{
            const sesionActiva = {
                id: usuarioFiltrado[0].id, 
                nombre: usuarioFiltrado[0].nombre, 
                rol: usuarioFiltrado[0].rol
            }

            localStorage.setItem('sesion_activa', JSON.stringify(sesionActiva));

            if(sesionActiva.rol === 'Cliente'){
                navigate("/");
            }else if(sesionActiva.rol === 'Admin'){
                navigate("/administracion/inicio");
                console.log("Entro al cmabio de vista de admin")
            }else if(sesionActiva.rol === 'Nutricionista'){
                console.log("Cambio a vista nutricionista")
            }else if(sesionActiva.rol === 'Secretario'){
                console.log("Cambio a vista Secretario")
            }

            setContrasena('')
            setEmail('')
        }
        console.log(usuarioFiltrado)
    }

    return(
        <form className="w-full border border-gray-200 rounded-xl py-8 px-4">
            <InputText titulo={"Email"} value={email} placeholder={"Example@gmail.com"} onChange={(e)=>setEmail(e.target.value)} error={errores.email}/>
            <div className="flex flex-col w-full gap-1 text-[#0f172a]">
                <label>Contraseña</label>
                <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e)=> setContrasena(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg"/>
                {errores.contrasena && <span className="text-red-500 text-sm">{errores.contrasena}</span>}
            </div>
            <div className="mt-4 flex justify-center items-center">
                <button onClick={(e)=> validarFormulario(e)} className="w-lg py-2 px-4 bg-emerald-800 text-white font-semibold rounded-md cursor-pointer">Iniciar Sesion</button>
            </div>
        </form>
    )
}

export default FormularioRegistroCliente