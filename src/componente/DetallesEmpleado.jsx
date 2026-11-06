function DetallesEmpleados({datos, onCerrar}){

    return(
        <article className="w-full lg:max-w-2xl p-4 border boder-gray-200 rounded-lg">
            <section className="w-full flex justify-between">
                <h3 className="text-lg font-semibold">{datos.nombre}</h3>
                <button onClick={onCerrar} className="p-2 bg-gray-300 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </section>
            <section className="flex flex-wrap w-full gap-1.5">
                <span className="px-2 py-1.5 bg-gray-200 rounded-sm">{datos.estado}</span>
                <span className="px-2 py-1.5 bg-gray-200 rounded-sm">{datos.rol}</span>
            </section>
            <section className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-5">
                <ul>
                    <li><span className="font-semibold">Nombre:</span> {datos.nombre} {datos.apellidos}</li>
                    <li><span className="font-semibold">Rut:</span>{datos.rut}</li>
                    <li><span className="font-semibold">Telefono:</span>: {datos.telefono}</li>
                    <li><span className="font-semibold">Email:</span>: {datos.email}</li>
                    <li><span className="font-semibold">Contraseña:</span> {datos.contrasena}</li>
                </ul>
                {datos.rol === 'NUTRICIONISTA' && 
                    <div>
                        <p className="font-semibold">Dias de trabajo</p>
                        {datos.horarioNutricionista.map((value, key)=>(
                            <li key={key}><span className="font-semibold">Dia:</span>: {value.diaSemana} - <span className="font-semibold">Hora Inicio:</span> {value.horaEntrada} - <span className="font-semibold">Hora Final:</span> {value.horaSalida}</li>
                        ))}
                    </div>
                }
            </section>
        </article>
    )
}

export default DetallesEmpleados