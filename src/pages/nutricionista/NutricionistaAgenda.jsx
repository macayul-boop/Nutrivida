import { useState, useEffect } from "react";

import SelectorDia from "../../componente/SelectorDia";
import DetalleReserva from "../../componente/DetalleReserva";

import { obtenerReservasDeUnNutricionista } from "../../services/reservaService";
import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../api/axiosClient";

const formatearFecha = (fecha) => {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
};

function NutricionistaAgenda() {
    const { usuario } = useAuth();

    const [fecha, setFecha] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [nutricionistaIdReal, setNutricionistaIdReal] = useState(null);

    //Cargar datos del Nutricionista autenticado y formatear horarios para SelectorDia
    useEffect(() => {
        if (!usuario?.id) return;

        axiosClient.get(`/usuarios/nutricionistaSimplificado/${usuario.id}`)
            .then((res) => {
                const data = res.data;

                const idReal = data.idNutricionista || data.id || usuario.id;
                console.log("ID de Nutricionista usado para consultar reservas:", idReal);

                setNutricionistaIdReal(idReal);

                // Extraemos el array de horarios
                const datosOriginales = 
                    data.horarioNutricionista || 
                    data.horarios || 
                    data.horario || 
                    (Array.isArray(data) ? data : []);

                // Normalizamos para SelectorDia
                const horarioFormateado = datosOriginales.map((item) => ({
                    ...item,
                    diaSemana: String(item.diaSemana || item.dia || '').trim()
                })).filter(item => item.diaSemana !== '');

                setHorarios(horarioFormateado);
            })
            .catch((err) => {
                console.error("Error al cargar perfil y horarios del nutricionista:", err);
            });
    }, [usuario?.id]);

    //Cargar las reservas de la fecha seleccionada
    useEffect(() => {
        if (fecha == null || !nutricionistaIdReal) return;

        obtenerReservasDeUnNutricionista(nutricionistaIdReal, formatearFecha(fecha))
            .then((res) => {
                setReservas(res.data || []);
            })
            .catch((error) => {
                console.error("Error al obtener las reservas:", error);
                setReservas([]);
            });
    }, [fecha, nutricionistaIdReal]);

    const handleDiaChange = (nuevaFecha) => {
        setFecha(nuevaFecha);
    };

    const reservasFiltradas = reservas.filter((val) => val.estado === "RESERVADA");

    return (
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Agenda</h1>
                </section>

                <section className="mt-5">
                    <SelectorDia
                        horario={horarios}
                        diaSeleccionado={fecha}
                        onSeleccionarDia={handleDiaChange}
                        diaSiguiente={false}
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 py-4">
                    {fecha == null && (
                        <span className="text-gray-700 col-span-full">Selecciona un día</span>
                    )}

                    {fecha != null && reservasFiltradas.length === 0 && (
                        <span className="text-gray-700 col-span-full">
                            No hay reservas agendadas para este día.
                        </span>
                    )}

                    {reservasFiltradas.map((val) => (
                        <DetalleReserva key={val.id} datos={val} />
                    ))}
                </section>
            </main>
        </div>
    );
}

export default NutricionistaAgenda;