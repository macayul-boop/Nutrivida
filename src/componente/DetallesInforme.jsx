function DetallesInforme({datos, onCerrar}){
    return(
        <article className="w-full max-w-[450px] p-4 border border-gray-300 rounded-md">
            <section className="flex justify-between">
                <div>
                    <h3 className="font-semibold text-lg">Informe #{datos.id}</h3>
                    <p className="text-sm">Fecha: {datos.fecha}</p>
                </div>
                <button onClick={onCerrar} className="w-8 h-8 flex justify-center items-center bg-gray-300 text-gray-600 rounded-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2.5">
                <ul>
                    <li><span className="font-semibold">Peso:</span> {datos.peso}</li>
                    <li><span className="font-semibold">Talla:</span> {datos.talla}</li>
                    <li><span className="font-semibold">Circunferencia cintura:</span> {datos.circunferenciaCintura}</li>
                </ul>
                <section >
                    <p className="font-semibold">Descripcion:</p>
                    <p>{datos.descripcion}</p>
                </section>
            </section>
        </article>
    )
}

export default DetallesInforme