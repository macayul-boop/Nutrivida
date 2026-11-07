function ReservaSecretario({datos, onEditar, onCancelar}){

    const esReservaPasada = (fechaTextoBackend) => {
        // 1. Separar el texto "2026-11-11" por sus guiones [año, mes, día] 
        const [año, mes, dia] = fechaTextoBackend.split('-');

        // 2. Crear el objeto Date real (restando 1 al mes porque en JS van de 0 a 11)
        const fechaReserva = new Date(Number(año), Number(mes) - 1, Number(dia));

        // 3. Obtener la fecha actual del sistema
        const fechaActual = new Date();

        // 4. Crear el día de hoy a las 00:00:00 para ignorar las horas y minutos actuales
        const hoySinHora = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

        // 5. Comparar: Retorna true si la fecha es estrictamente menor a hoy (ayer o antes)
        return fechaReserva.getTime() < hoySinHora.getTime();
    };

    const esPasada = esReservaPasada(datos.fecha);
    const estaCancelada = datos.estado == "CANCELADA";
    const esEditable = !esPasada && !estaCancelada;

    return(
        <article className="">
            { datos &&
                <div className="w-full grid grid-cols-5 py-2 px-4">
                    <p className="flex items-center">{datos.datosClientes.nombre}</p>
                    <p className="flex items-center">{datos.datosNutricionista.nombre}</p>
                    <p className="flex items-center">{datos.fecha} - {datos?.horaInicio}</p>
                    <p className="flex items-center">{datos.estado}</p>
                    
                    { esEditable && 
                    
                        <div className="flex justify-end items-center">
                            <button onClick={onEditar}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <button onClick={onCancelar}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                            </button>
                        </div>

                    }

                </div>
            }
        </article>
    )

}

export default ReservaSecretario