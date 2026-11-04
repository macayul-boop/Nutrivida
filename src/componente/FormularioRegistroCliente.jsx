import { useState } from "react"
import InputText from "./InputText"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


function FormularioRegistroCliente(){
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [errores, setErrores] = useState({})
    const {login} = useAuth()

    const validarFormulario = async (e)=>{
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
            
            try {
                
                const datosUsuario = await login({
                    email: email,
                    contrasena: contrasena
                });

                let rol = datosUsuario.roles[0];

                if(rol === 'CLIENTE'){
                    navigate("/");
                }else if(rol === 'ADMINISTRADOR'){
                    navigate("/administracion/empleados");
                    console.log("Entro al cmabio de vista de admin")
                }else if(rol === 'NUTRICIONISTA'){
                    navigate("/nutricionista/agenda")
                }else if(rol === 'SECRETARIO'){
                    console.log("Cambio a vista Secretario")
                    navigate("/secretario/reserva");
                }

                setContrasena('')
                setEmail('')

            } catch (error) {
                console.log(error)
            }
        }else{
            console.log("Fallo")
        }
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