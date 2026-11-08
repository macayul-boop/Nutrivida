function DetalleReserva({datos}){
    return(
        <article className="w-full p-4 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-lg">{datos.nombreServicio}</h3>
            <p>Nombre paciente: {datos.datosClientes.nombre}</p>
            <p>Rut: {datos.datosClientes.rutCliente}</p>
            <p className="font-semibold">Fecha: {datos.fecha} Hora: {datos.horaInicio}</p>
        </article>
    )
}

export default DetalleReserva