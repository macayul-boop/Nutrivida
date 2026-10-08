import { useState } from "react"

function FormularioServicio({onCerrarModal, onGuardar}){

    const [error, setError] = useState({})
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [duracion, setDuracion] = useState('')
    const [modalidad, setModalidad] = useState('')

    const cancelar = ()=>{
        onCerrarModal()
    }

    const guardarServicio = (e)=>{
        e.preventDefault()

        let nuevosErrores = {}

        if(nombre.trim().length === 0){
            nuevosErrores.nombre = 'El nombre es obligatorio'
        }

        if(precio.trim().length === 0){
            nuevosErrores.precio = 'El precio es obligatorio'
        }else if(Number(precio) <= 0){
            nuevosErrores.precio = 'El precio debe ser mayor a cero'
        }

        if(duracion.trim().length === 0){
            nuevosErrores.duracion = 'La duracion es obligatoria'
        }else if(Number(duracion) <= 0){
            nuevosErrores.duracion = 'La duracion debe ser mayor a cero'
        }

        if(modalidad != 'Presencial' && modalidad != 'Online'){
            nuevosErrores.modalidad = 'Selecciona una modalidad'
        }

        setError(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){

            const nuevoServicio = {
                id:Date.now(),
                nombre:nombre.trim(),
                precio:Number(precio),
                duracion:Number(duracion),
                modalidad:modalidad
            }

            onGuardar(nuevoServicio)
            onCerrarModal()
        }
    }

    return(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-scroll">
            <form onSubmit={guardarServicio} className="max-w-2xl w-full mt-5 md:mt-20 p-6 bg-white rounded-xl">
                <h2 className="text-2xl font-semibold">
                    Crear servicio
                </h2>

                <div className="flex flex-col w-full gap-1 mt-4">
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e)=> setNombre(e.target.value)}
                        placeholder="Nombre del servicio"
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    {error.nombre &&
                        <span className="text-red-500 text-sm">
                            {error.nombre}
                        </span>
                    }
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3">
                    <div className="flex flex-col w-full gap-1">
                        <label>Precio</label>
                        <input
                            type="number"
                            value={precio}
                            onChange={(e)=> setPrecio(e.target.value)}
                            placeholder="35000"
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        {error.precio &&
                            <span className="text-red-500 text-sm">
                                {error.precio}
                            </span>
                        }
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label>Duracion en minutos</label>
                        <input
                            type="number"
                            value={duracion}
                            onChange={(e)=> setDuracion(e.target.value)}
                            placeholder="60"
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        {error.duracion &&
                            <span className="text-red-500 text-sm">
                                {error.duracion}
                            </span>
                        }
                    </div>
                </div>

                <div className="flex flex-col w-full gap-1 mt-3">
                    <label>Modalidad</label>
                    <select
                        value={modalidad}
                        onChange={(e)=> setModalidad(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="">Sin seleccionar</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Online">Online</option>
                    </select>
                    {error.modalidad &&
                        <span className="text-red-500 text-sm">
                            {error.modalidad}
                        </span>
                    }
                </div>

                <div className="flex justify-end mt-4 gap-2.5">
                    <button
                        type="button"
                        onClick={()=> cancelar()}
                        className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-700 rounded-lg text-white cursor-pointer"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )

}

export default FormularioServicio