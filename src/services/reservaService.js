import axiosClient from "../api/axiosClient";

export const crearReserva = (datos) => {
    return axiosClient.post("/reservas", datos)
}

export const editarReservaSecretario = (idReserva, datos) => {
    return axiosClient.put(`/reservas/secretarios/${idReserva}`, datos)
}

export const editarReservaCliente = (idReserva, datos) => {
    return axiosClient.put(`/reservas/clientes/${idReserva}`, datos)
}

export const cancelarReservaSecretario = (idReserva) => {
    return axiosClient.patch(`/reservas/secretarios/cancelar/${idReserva}`)
}

export const cancelarReservaCliente = (idReserva) => {
    return axiosClient.patch(`/reservas/clientes/cancelar/${idReserva}`)
}

export const obtenerReservasDeUnCliente = () => {
    return axiosClient.get("/reservas/clientes")
}

export const obtenerReservasDeUnNutricionista = (idNutricionista, fecha) => {
    return axiosClient.get(`/reservas/nutricionista/${idNutricionista}`, {
        params: {
            fecha: fecha
        }
    })
}

export const obtenerHorasDisponibles = (idNutricionista, idServicio, fecha) => {
    return axiosClient.get("/reservas/horas-disponibles", {
        params: {
            idNutricionista: idNutricionista,
            idServicio: idServicio,
            fecha: fecha
        }
    })
}

export const obtenerTodasReservas = () => {
    return axiosClient.get("/reservas/secretarios")
}