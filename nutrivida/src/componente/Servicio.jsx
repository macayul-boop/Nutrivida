function Servicio({datos}){

    return(
        <article className="w-full grid grid-cols-4 py-2 px-4">
            <p>{datos.nombre}</p>
            <p>${datos.precio.toLocaleString('es-CL')}</p>
            <p>{datos.duracion} minutos</p>
            <p>{datos.modalidad}</p>
        </article>
    )
}

export default Servicio