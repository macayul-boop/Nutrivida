import axiosClient from "../api/axiosClient";

export const obtenerMisInformes = () => {
    return axiosClient.get("/fichas-clinicas/mis-informes")
}
export const obtenerMiPlan = () => {
    return axiosClient.get("/fichas-clinicas/mi-plan");
};