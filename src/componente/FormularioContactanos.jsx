import { useState } from "react"


function FormularioContactanos(){

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [mensaje,setMensaje] = useState("")
    const [error, setErrores] = useState({})


    const validarFormulario = (e)=>{
        e.preventDefault()
        
        let nuevosErrores = {}

        if(nombre.trim().length === 0){
            nuevosErrores.nombre = 'La nombre es obligatoria'
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(email.trim().length === 0){
            nuevosErrores.email = 'El email es obligatorio'
        }else if(!regexEmail.test(email)){
            nuevosErrores.email = "El formato del email no es válido"
        }

        if (mensaje.trim().length === 0){
            nuevosErrores.mensaje = "El mensaje es obligatorio"
        }
        
        setErrores(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){
            console.log("Formulario válido",{nombre,email,mensaje})

            setNombre("")
            setEmail("")
            setMensaje("")
            setErrores({})

        }
    }

        return(
        <section id="contacto" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-15 lg:mt-35">
                <h2 className="text-center text-3xl sm:text-4xl font-bold text-emerald-700">Contactanos</h2>
                <p className="text-center text-lg mt-4 text-slate-800">¿Quieres ponerte en contacto con nosotros? Hablanos mediante el formualrio</p>
                <form onSubmit={validarFormulario} noValidate className="max-w-3xl mx-auto mt-10 p-5 border border-gray-300 rounded-lg" id="formulario">
                                        
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-5">
                        
                        <div className="flex flex-col">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" placeholder="Nombre" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className={`border rounded-md p-2 my-2 focus:outline-none ${error.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />{error.nombre && <p className="text-red-500 text-xs mb-2">{error.nombre}</p>}
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input type="text" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`border rounded-md p-2 my-2 focus:outline-none ${error.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />{error.email && <p className="text-red-500 text-xs mb-2">{error.email}</p>}
                        </div>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="text-area" className="py-1">Mensaje</label>
                        <textarea id="text-area" name="mensaje" placeholder="Mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} className={`border rounded-md p-2 my-2 focus:outline-none ${error.mensaje ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />{error.mensaje && <p className="text-red-500 text-xs mb-2">{error.mensaje}</p>}
                    </div>
                    <div className="w-full flex justify-center items-center mt-5">
                        <button type="submit" className="py-3 px-9 bg-emerald-700 text-white font-semibold rounded-3xl">Enviar</button>
                    </div>
                </form>
            </section>
        )
}

export default FormularioContactanos;