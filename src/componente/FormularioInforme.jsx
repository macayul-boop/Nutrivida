import { useState, useEffect } from "react"
import InputText from "./InputText"

function FormularioInforme({onCerrarModal, onGuardar, editandoInforme}){

    const [peso, setPeso] = useState('')
    const [talla, setTalla] = useState('')
    const [circunferenciaCircular, setCircunferenciaCircular] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [error, setError] = useState({})

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(()=>{
        if(editandoInforme){
            setPeso(editandoInforme.peso?.toString() ?? "")
            setTalla(editandoInforme.talla?.toString() ?? "")
            setCircunferenciaCircular(editandoInforme.circunferenciaCintura?.toString() ?? "")
            setDescripcion(editandoInforme.descripcion ?? "")
        }else{
            setPeso("")
            setTalla("")
            setCircunferenciaCircular("")
            setDescripcion("")
        }

    }, [editandoInforme])
    /* eslint-disable react-hooks/set-state-in-effect */

    const validarFormulario = (e)=>{
        e.preventDefault()
        let nuevosErrores = {}

        const pesoNumerico = Number(peso)
        const tallaNumerica = Number(talla)
        const circunferenciaNumerica = Number(circunferenciaCircular)

        if(peso.trim().length === 0){
            nuevosErrores.peso = "El peso es obligatorio"
        }else if(Number.isNaN(pesoNumerico) || pesoNumerico <= 0){
            nuevosErrores.peso = "Ingresa un valor válido mayor a 0"
        }

        if(talla.trim().length === 0){
            nuevosErrores.talla = "La talla es obligatoria"
        }else if(Number.isNaN(tallaNumerica) || tallaNumerica <= 0){
            nuevosErrores.talla = "Ingresa un valor válido mayor a 0"
        }

        if(circunferenciaCircular.trim().length === 0){
            nuevosErrores.circunferenciaCircular = "La circunferencia circular es obligatoria"
        }else if(Number.isNaN(circunferenciaNumerica) || circunferenciaNumerica <= 0){
            nuevosErrores.circunferenciaCircular = "Ingresa un valor válido mayor a 0"
        }

        if(descripcion.trim().length === 0){
            nuevosErrores.descripcion = "La descripcion es obligatorio"
        }else if(descripcion.trim().length < 10){
            nuevosErrores.descripcion = "La desripción mínimo debe tener 10 caracteres"
        }

        setError(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){
            const fechaISO = editandoInforme?.fecha || new Date().toISOString().split("T")[0]

            const datos = {
                fecha: fechaISO,
                peso: pesoNumerico,
                talla: tallaNumerica,
                circunferenciaCintura: circunferenciaNumerica,
                descripcion: descripcion.trim()
            }
            onGuardar(datos)
        }
    }

    return(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-scroll">
            <form className="bg-white max-w-2xl w-full mx-auto mt-5 md:mt-20 px-5 py-6 border border-gray-200 rounded-lg">
                <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    <InputText 
                        titulo={"Peso (kg)"} 
                        placeholder={"70"} 
                        value={peso} 
                        onChange={(e)=> setPeso(e.target.value)} 
                        error={error.peso}
                    />
                    <InputText
                        titulo={"Talla"}
                        placeholder={"170"}
                        value={talla}
                        onChange={(e)=> setTalla(e.target.value)}
                        error={error.talla}
                    />
                </section>
                <section className="mt-2">
                    <InputText 
                        titulo={"Circunferencia circular"} 
                        placeholder={"85"} 
                        value={circunferenciaCircular} 
                        onChange={(e)=> setCircunferenciaCircular(e.target.value)} 
                        error={error.circunferenciaCircular}
                    />
                </section>
                <section className="flex flex-col gap-1.5 mt-2">
                    <label className="flex flex-col">Descripcion
                        <textarea 
                        className="w-full h-44 resize-none border border-gray-200 rounded-lg py-2 px-4"
                        placeholder="Agrega información extra ac..."
                        value={descripcion}
                        onChange={(e)=> setDescripcion(e.target.value)}
                        >
                        </textarea>
                    </label>
                    
                    {error.descripcion && <span className="text-sm text-red-500">{error.descripcion}</span>}
                </section>
                <section className="flex justify-end gap-3.5 mt-5">
                    <button type="button" onClick={(e)=> onCerrarModal(e)} className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-pointer">
                        Cancelar
                    </button>
                    <button onClick={(e)=> validarFormulario(e)} className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg cursor-pointer">
                        Guardar
                    </button>
                </section>
            </form>
        </div>
    )
}

export default FormularioInforme