

function DiaSemana({index, datos, onEliminar}){
    return(
        <article className="flex items-center flex-wrap gap-1.5 border-t border-gray-200">
            <div>
                <p>Dia</p>
                <select defaultValue={datos?.dia || ''} name={`dia_${index}`}>
                    <option value="">Sin seleccionar</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miercoles">Miercoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sabado">Sabado</option>
                    <option value="Domingo">Domingo</option>
                </select>
            </div>
            <div>
                <p>Hora Inicio</p>
                <input type="time" defaultValue={datos?.horaInicio || ''} name={`horaInicio_${index}`}/>
            </div>
            <div>
                <p>Hora Termino</p>
                <input type="time" defaultValue={datos?.horaTermino || ''} name={`horaTermino_${index}`}/>
            </div>
            <div>
                <button onClick={onEliminar} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
        </article>
    )
}

export default DiaSemana