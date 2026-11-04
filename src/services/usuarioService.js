import axiosClient from "../api/axiosClient";

export const obtenerClientesSimplificados = () => {
    return axiosClient.get("/usuarios/clienteSimplificado");
}

export const obtenerClienteSimplificado = (idCliente) => {
    return axiosClient.get(`/usuarios/clienteSimplificado/${idCliente}`)
}

export const obtenerNutricionistasSimplificados = () => {
    return axiosClient.get("/usuarios/nutricionistaSimplificado")
}

export const obtenerNutricionistaSimplificado = (idNutricionista) => {
    return axiosClient.get(`/usuarios/nutricionistaSimplificado/${idNutricionista}`)
}

export const obtenerEmpleados = () => {
    return axiosClient.get("/usuarios/empleados")
}

export const crearEmpleado = (datos) => {
    return axiosClient.post("/usuarios/empleados", datos)
}

export const editarEmpleado = (idEmpleado, datos) => {
    return axiosClient.put(`/usuarios/empleados/${idEmpleado}`, datos)
}

export const eliminarUsuario = (idUsuario) => {
    return axiosClient.delete(`/usuarios/${idUsuario}`)
}

export const obtenerReservasDeUnCliente = (rutCliente) => {
    return axiosClient.get("/usuarios/reservas/secretarios/clientes", {
        params: {
            rutCliente: rutCliente
        }
    });
}