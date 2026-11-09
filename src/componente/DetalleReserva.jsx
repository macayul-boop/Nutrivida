function DetalleReserva({datos}){
    if (!datos) return null;

    const cliente = datos.datosClientes || datos.datosCliente;
    const nombreCompleto = cliente
        ?`${cliente.nombre || ""} ${cliente.apellidos || ""}`.trim()
        :datos.nombreCliente || "Cliente no especificado"

    const rutCliente = cliente?.rutCliente || cliente?.rut || datos.rutCliente || "Sin RUT"

    return(
        <article className="w-full p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <header className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-emerald-800">
                    {datos.nombreServicio || datos.nombreConsulta || "Consulta Nutricional"}
                </h3>
                {datos.estado && (
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                        datos.estado === 'RESERVADA' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {datos.estado}
                    </span>
                )}
            </header>

            <div className="space-y-1 text-sm text-gray-700">
                <p>
                    <span className="font-medium text-gray-900">Paciente:</span> {nombreCompleto}
                </p>
                <p>
                    <span className="font-medium text-gray-900">RUT:</span> {rutCliente}
                </p>
                <p className="font-semibold text-gray-900 mt-2 pt-2 border-t border-gray-100">
                    Fecha: {datos.fecha} | Hora: {datos.horaInicio}
                </p>
            </div>
        </article>
    )
}

export default DetalleReserva