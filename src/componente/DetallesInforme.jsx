function DetallesInforme({datos, onCerrar}){

    const formatearFecha = (fecha) => {
        if (!fecha) return ""
        if (typeof fecha === "string" && fecha.includes("-")) {
            const [anio, mes, dia] = fecha.split("-")
            return `${dia}/${mes}/${anio}`
        }
        return fecha
    }

    return(
        <article className="w-full max-w-[450px] p-4 border border-gray-300 rounded-md">
            <section className="flex justify-between">
                <div>
                    <h3 className="font-semibold text-lg">Informe #{datos.id}</h3>
                    <p className="text-sm">Fecha: {formatearFecha(datos.fecha)}</p>
                </div>
                <button type="button" onClick={onCerrar} className="w-8 h-8 flex justify-center items-center bg-gray-300 text-gray-600 rounded-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2.5">
                <ul>
                    <li><span className="font-semibold">Peso:</span> {datos.peso} kg</li>
                    <li><span className="font-semibold">Talla:</span> {datos.talla} cm</li>
                    <li><span className="font-semibold">Circunferencia cintura:</span> {datos.circunferenciaCintura} cm</li>
                </ul>
                <section >
                    <p className="font-semibold">Descripcion:</p>
                    <p className="whitespace-pre-line text-gray-700">{datos.descripcion}</p>
                </section>
            </section>
        </article>
    )
}

export default DetallesInforme