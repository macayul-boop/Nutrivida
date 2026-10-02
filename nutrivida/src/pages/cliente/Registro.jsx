import { useState } from "react"
import { Link } from "react-router-dom"

function Registro(){

    const [error, setError] = useState({})
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [rut, setRut] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [confirmacionContrasena, setConfirmacionContrasena] = useState("")

    const enviarFormulario = (e)=>{
        e.preventDefault()

        let nuevosErrores = {}

        if(nombre.trim().length === 0){
            nuevosErrores.nombre = "El nombre es obligatorio"
        }

        if(apellidos.trim().length === 0){
            nuevosErrores.apellidos = "Los apellidos son obligatorios"
        }

        if(rut.trim().length === 0){
            nuevosErrores.rut = "El rut es obligatorio"
        }else if(rut.trim().length < 8 || rut.trim().length > 9){
            nuevosErrores.rut = "El formato del rut es incorrecto"
        }

        if(telefono.trim().length === 0){
            nuevosErrores.telefono = "El telefono es obligatorio"
        }else if(telefono.trim().length !== 12){
            nuevosErrores.telefono = "El formato del telefono es incorrecto"
        }

        if(email.trim().length === 0){
            nuevosErrores.email = "El email es obligatorio"
        }else if(!email.includes("@")){
            nuevosErrores.email = "El formato del email es incorrecto"
        }

        if(contrasena.trim().length === 0){
            nuevosErrores.contrasena = "La contraseña es obligatoria"
        }else if(contrasena.trim().length < 6){
            nuevosErrores.contrasena = "La contraseña debe tener minimo 6 caracteres"
        }

        if(confirmacionContrasena.trim().length === 0){
            nuevosErrores.confirmacionContrasena = "Confirma la contraseña"
        }else if(confirmacionContrasena !== contrasena){
            nuevosErrores.confirmacionContrasena = "Las contraseñas no coinciden"
        }

        setError(nuevosErrores)
    }

    return(
        <div className="w-full px-2 sm:px-4 md:px-6">

            {/* Titulo */}
            <section className="text-center mt-10 md:mt-15">
                <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800">
                    Registrarse
                </h1>
            </section>

            {/* Formulario */}
            <section className="max-w-2xl mx-auto mt-10">
                <form noValidate onSubmit={enviarFormulario} className="w-full border border-gray-200 rounded-xl py-8 px-4">

                    {/* Seccion 1 */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="nombre">Nombre</label>
                            <input id="nombre" type="text" name="nombre" value={nombre} onChange={(e)=> setNombre(e.target.value)} placeholder="Nombre" className="py-2 px-2 border border-gray-200 rounded-lg sm:mt-1.5"/>
                            {error.nombre && <span className="text-red-500 text-sm">{error.nombre}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input id="apellidos" type="text" name="apellidos" value={apellidos} onChange={(e)=> setApellidos(e.target.value)} placeholder="Apellidos" className="py-2 px-2 border border-gray-200 rounded-lg sm:mt-1.5"/>
                            {error.apellidos && <span className="text-red-500 text-sm">{error.apellidos}</span>}
                        </div>
                    </div>

                    {/* Seccion 2 */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5 mt-2">
                        <div className="flex flex-col">
                            <label htmlFor="rut">Rut</label>
                            <input id="rut" type="text" name="rut" value={rut} onChange={(e)=> setRut(e.target.value)} placeholder="12345678k" className="py-2 px-2 border border-gray-200 rounded-lg sm:mt-1.5"/>
                            {error.rut && <span className="text-red-500 text-sm">{error.rut}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="telefono">Telefono</label>
                            <input id="telefono" type="tel" name="telefono" value={telefono} onChange={(e)=> setTelefono(e.target.value)} placeholder="+56912345678" className="py-2 px-2 border border-gray-200 rounded-lg sm:mt-1.5"/>
                            {error.telefono && <span className="text-red-500 text-sm">{error.telefono}</span>}
                        </div>
                    </div>

                    {/* Seccion 3 */}
                    <div className="w-full mt-2 flex flex-col gap-1">
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Example@gmail.com" className="py-2 px-2 border border-gray-200 rounded-lg my-2"/>
                            {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
                        </div>

                        <div className="flex flex-col relative">
                            <label htmlFor="contrasena">Contraseña</label>
                            <input id="contrasena" type="password" name="contrasena" value={contrasena} onChange={(e)=> setContrasena(e.target.value)} placeholder="Contraseña" className="py-2 px-2 border border-gray-200 rounded-lg my-2"/>
                            {error.contrasena && <span className="text-red-500 text-sm">{error.contrasena}</span>}
                        </div>

                        <div className="flex flex-col relative">
                            <label htmlFor="confirmacionContrasena">Confirmacion contraseña</label>
                            <input id="confirmacionContrasena" type="password" name="confirmacionContrasena" value={confirmacionContrasena} onChange={(e)=> setConfirmacionContrasena(e.target.value)} placeholder="Confirma contraseña" className="py-2 px-2 border border-gray-200 rounded-lg my-2"/>
                            {error.confirmacionContrasena && <span className="text-red-500 text-sm">{error.confirmacionContrasena}</span>}
                        </div>
                    </div>

                    {/* Seccion boton */}
                    <section className="mt-4 flex justify-center items-center">
                        <button type="submit" className="w-lg py-2 px-4 bg-emerald-800 text-white font-semibold rounded-md cursor-pointer">
                            Registrarse
                        </button>
                    </section>
                </form>
            </section>

            <p className="text-md sm:text-lg text-center mt-5">
                ¿Ya tienes una cuenta? Inicia sesion{" "}
                <Link to={"/login"} className="font-bold text-emerald-800">
                    aqui
                </Link>
            </p>
        </div>
    )
}

export default Registro