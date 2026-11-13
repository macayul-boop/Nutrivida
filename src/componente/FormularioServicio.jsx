import { useState } from "react"

const MAXIMO_ENTERO = 2147483647

function FormularioServicio({onCerrarModal,onGuardar,servicioEditable = null}){

    const [error, setError] = useState({})
    const [nombre, setNombre] = useState(servicioEditable?.nombre ?? '')
    const [descripcion, setDescripcion] = useState(servicioEditable?.descripcion ?? '')
    const [precio, setPrecio] = useState(servicioEditable?.precio.toString() ?? '')
    const [duracion, setDuracion] = useState(servicioEditable?.duracionMinutos.toString() ?? '')
    const [modalidad, setModalidad] = useState(servicioEditable?.modalidad ?? '')
    const [guardando, setGuardando] = useState(false)
    const [errorGuardar, setErrorGuardar] = useState('')

    const guardarServicio = async (e)=>{
        e.preventDefault()
        if(guardando) return
        setErrorGuardar('')

        let nuevosErrores = {}

        if(nombre.trim().length === 0){
            nuevosErrores.nombre = 'El nombre es obligatorio'
        }

        if(descripcion.trim().length === 0){
            nuevosErrores.descripcion = 'La descripción es obligatoria'
        }

        if(precio.trim().length === 0){
            nuevosErrores.precio = 'El precio es obligatorio'
        }else if(!Number.isInteger(Number(precio)) || Number(precio) <= 0 || Number(precio) > MAXIMO_ENTERO){
            nuevosErrores.precio = 'Ingresa un precio entero entre 1 y 2.147.483.647'
        }

        if(duracion.trim().length === 0){
            nuevosErrores.duracion = 'La duración es obligatoria'
        }else if(!Number.isInteger(Number(duracion)) || Number(duracion) <= 0 || Number(duracion) > MAXIMO_ENTERO){
            nuevosErrores.duracion = 'Ingresa una duración entera entre 1 y 2.147.483.647'
        }

        if(modalidad !== 'PRESENCIAL' && modalidad !== 'ONLINE'){
            nuevosErrores.modalidad = 'Selecciona una modalidad'
        }

        setError(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){

            const nuevoServicio = {
                nombre:nombre.trim(),
                descripcion:descripcion.trim(),
                precio:Number(precio),
                duracionMinutos:Number(duracion),
                modalidad:modalidad
            }

            setGuardando(true)
            try{
                await onGuardar(nuevoServicio)
                onCerrarModal()
            }catch{
                setErrorGuardar('No se pudo guardar el servicio. Vuelve a intentarlo.')
            }finally{
                setGuardando(false)
            }
        }
    }

    return(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-scroll">
            <form onSubmit={guardarServicio} noValidate role="dialog" aria-labelledby="titulo-formulario-servicio" className="max-w-2xl w-full mt-5 md:mt-20 p-6 bg-white rounded-xl">
                <fieldset disabled={guardando}>
                    <h2 id="titulo-formulario-servicio" className="text-2xl font-semibold">
                        {servicioEditable ? 'Editar servicio' : 'Crear servicio'}
                    </h2>

                    <div className="flex flex-col w-full gap-1 mt-4">
                        <label htmlFor="nombre-servicio">Nombre</label>
                        <input
                            id="nombre-servicio"
                            maxLength={60}
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

                    <div className="flex flex-col w-full gap-1 mt-3">
                        <label htmlFor="descripcion-servicio">Descripción</label>
                        <textarea
                            id="descripcion-servicio"
                            maxLength={250}
                            value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        {error.descripcion && <span className="text-red-500 text-sm">{error.descripcion}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3">
                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor="precio-servicio">Precio</label>
                            <input
                                id="precio-servicio"
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
                            <label htmlFor="duracion-servicio">Duración en minutos</label>
                            <input
                                id="duracion-servicio"
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
                        <label htmlFor="modalidad-servicio">Modalidad</label>
                        <select
                            id="modalidad-servicio"
                            value={modalidad}
                            onChange={(e)=> setModalidad(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="">Sin seleccionar</option>
                            <option value="PRESENCIAL">Presencial</option>
                            <option value="ONLINE">Online</option>
                        </select>
                        {error.modalidad &&
                            <span className="text-red-500 text-sm">
                                {error.modalidad}
                            </span>
                        }
                    </div>

                    {errorGuardar && <p role="alert" className="mt-3 text-red-600">{errorGuardar}</p>}

                    <div className="flex justify-end mt-4 gap-2.5">
                        <button
                            type="button"
                            onClick={onCerrarModal}
                            className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-700 rounded-lg text-white cursor-pointer disabled:opacity-50"
                        >
                            {guardando ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    )

}

export default FormularioServicio
