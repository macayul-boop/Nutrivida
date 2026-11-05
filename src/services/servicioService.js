import axiosClient from "../api/axiosClient";

export const obtenerServicios = () => {
    return axiosClient.get("/servicios")
}

export const obtenerUnServicio = (idServicio) => {
    return axiosClient.get(`/servicios/${idServicio}`)
}

export const crearServicio = (datos) => {
    return axiosClient.post("/servicios", datos)
}

export const editarServicio = (idServicio, datos) => {
    return axiosClient.put(`/servicios/${idServicio}`, datos)
}

export const eliminarServicio = (idServicio) => {
    return axiosClient.delete(`/servicios/${idServicio}`)
}