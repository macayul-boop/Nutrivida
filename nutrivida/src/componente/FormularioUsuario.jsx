import { useEffect, useState } from "react"
import InputText from "./InputText"
import DiaSemana from "./DiaSemana"

function FormularioUsuario({onCerrarModal, onGuardar}){

    const [error, setError] = useState({})
    const [rut, setRut] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [rol, setRol] = useState('')
    const [dias, setDias] = useState([])

    const cancelar = (e)=>{
        e.preventDefault()
        onCerrarModal()
        console.log("Hola")
    }

    const agregarHorario = (e)=>{
        e.preventDefault()
        if(dias.length >= 7) return

        setDias([
            ...dias, 
            {id:Date.now()}
        ])
        console.log(dias)
    }

    const eliminarHorario = (e, indice)=>{
        e.preventDefault()
        setDias(dias.filter((valor, index) => index !== indice))
    }

    const guardarUsuario = (e)=>{
        e.preventDefault()

        let nuevosErrores = {}
        let molde = {}

        // Validacion rut
        if(rut.trim().length === 0){
            nuevosErrores.rut = 'El rut es obligatorio';
        }else if(rut.trim().length !== 9){
            nuevosErrores.rut = 'Formato de rut incorrecto';
        }

        // Validacion nombre
        if(nombre.trim().length === 0){
            nuevosErrores.nombre = 'El nombre es obligatorio'
        }

        // Validacion apellido
        if(apellidos.trim().length === 0){
            nuevosErrores.apellidos = 'Los apellidos son obligatorios'
        }

        // Validacion telefono
        if(telefono.trim().length === 0){
            nuevosErrores.telefono = 'El telefono es obligatorio'
        }else if(telefono.trim().length !== 12){
            nuevosErrores.telefono = 'Formato de telefono incorrecto'
        }

        // Validacion email
        if(email.trim().length === 0){
            nuevosErrores.email = 'El email es obligatorio'
        }else if(!email.includes('@')){
            nuevosErrores.email = 'Formato email incorrecto'
        }

        // Contraseña
        if(contrasena.trim().length === 0){
            nuevosErrores.contrasena = 'La contraseña es obligatoria'
        }else if(contrasena.trim().length < 6){
            nuevosErrores.contrasena = 'La contraseña debe tener minimo 6 caracteres'
        }

        // Rol
        if(rol != 'Nutricionista' && rol != 'Secretario'){
            nuevosErrores.rol = 'Selecciona un rol'
        }

        if(rol === 'Secretario'){
            molde = {
                "id":Date.now(),
                "rut":rut,
                "nombre":nombre,
                "apellidos":apellidos,
                "telefono":telefono,
                "email":email,
                "contrasena":contrasena,
                "rol":rol
            }
        }else if(rol === 'Nutricionista'){

            const formData = new FormData(e.target)
            const horarioFinal = dias.map((_, index)=>({
                dia: formData.get(`dia_${index}`),
                horaInicio: formData.get(`horaInicio_${index}`),
                horaTermino: formData.get(`horaTermino_${index}`)
            }))

            // Validar de campos vacio y dias repetidos
            const hayVacios = horarioFinal.some(h => !h.dia || !h.horaInicio || !h.horaTermino);
            const diasSeleccionados = horarioFinal.map(h => h.dia);
            const hayRepetidos = new Set(diasSeleccionados).size !== diasSeleccionados.length;

            if(hayVacios){
                nuevosErrores.horario = 'Completa todos los campos'
                console.log(hayVacios)

            }else if(hayRepetidos){
                nuevosErrores.horario = 'Hay dias repetidos'
            }

            molde = {
                "id":Date.now(),
                "rut":rut,
                "nombre":nombre,
                "apellidos":apellidos,
                "telefono":telefono,
                "email":email,
                "contrasena":contrasena,
                "rol":rol,
                "horario":horarioFinal
            }
        }

        setError(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){
            console.log("Paso")
            console.log(molde)
            onGuardar(molde)
        }else{
            console.log("Fallo")
            console.log(rol)
        }
        
    }

    return(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-scroll ">
            <form onSubmit={guardarUsuario} className="max-w-2xl w-full p-6 bg-white rounded-xl">
                <h2>Crear Usuario</h2>
                <InputText titulo={'Rut'} value={rut} placeholder={'123456789k'} onChange={(e)=> setRut(e.target.value)} error={error.rut}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <InputText titulo={'Nombre'} value={nombre} placeholder={'Nombre'} onChange={(e)=> setNombre(e.target.value)} error={error.nombre}/>
                    <InputText titulo={'Apellidos'} value={apellidos} placeholder={'Apellidos'} onChange={(e)=> setApellidos(e.target.value)} error={error.apellidos}/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <InputText titulo={'Telefono'} value={telefono} placeholder={'+56963391573'} onChange={(e)=> setTelefono(e.target.value)} error={error.telefono}/>
                    <InputText titulo={'Email'} value={email} placeholder={'Example@gmail.com'} onChange={(e) => setEmail(e.target.value)} error={error.email}/>
                </div>
                <div className="flex flex-col w-full gap-1 text-[#0f172a]">
                    <label>Contraseña</label>
                    <input type="password" value={contrasena} placeholder="Contraseña" onChange={(e)=> setContrasena(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg"/>
                    {error.contrasena && <span className="text-red-500 text-sm">{error.contrasena}</span>}
                </div>
                <div className="flex flex-col w-full gap-1 text-[#0f172a]">
                    <label>Rol</label>
                    <select value={rol} onChange={(e)=> setRol(e.target.value)} name="roles" className="w-full border border-gray-300 rounded-lg px-4 py-2">
                        <option value="">Sin seleccionar</option>
                        <option value="Nutricionista">Nutricionista</option>
                        <option value="Secretario">Secretario</option>
                    </select>
                    {error.rol && <span className="text-red-500">{error.rol}</span>}
                </div>
                {rol === 'Nutricionista' &&
                    <div>
                        <section className="w-full flex justify-between">
                            <h3>Dias de la semana</h3>
                            <button onClick={(e)=> agregarHorario(e)} className="px-2 bg-gray-100 cursor-pointer">+</button>
                        </section>
                        <section className="overflow-y-scroll max-h-60 h-30 flex flex-col gap-1.5">
                            {dias.map((value, index)=>(
                                <DiaSemana key={value.id} index={index} dia={value} horaInicio={value} horaTermino={value} onEliminar={(e)=> eliminarHorario(e, index)}/>
                            ))}
                        </section>
                        {error.horario && <span className="text-red-500">{error.horario}</span>}
                    </div>
                }

                <div className="flex justify-end mt-4 gap-2.5">
                    <button onClick={(e)=> cancelar(e)} className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-green-700 rounded-lg text-white cursor-pointer">Guardar</button>
                </div>
            </form>
        </div>
    )

}

export default FormularioUsuario