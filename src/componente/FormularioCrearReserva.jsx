import { useState, useEffect } from "react"
import SelectorDia from "./SelectorDia"
import SelectorHora from "./SelectorHora"
import {useAuth} from '../context/AuthContext'
import {obtenerServicios} from '../services/servicioService'
import {obtenerHorasDisponibles, crearReserva} from '../services/reservaService'
import {obtenerNutricionistasSimplificados } from '../services/usuarioService'

const formatearFecha = (fecha) => {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
};

function FormularioCrearReserva(){

    const {usuario} = useAuth()

    const [nutricionistas, setNutricionista] = useState([])
    const [tipoConsultas, setTipoConsultas] = useState([])
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [nutricionistaId, setNutricionistaId] = useState(null)
    const [tipoConsultaId, setTipoConsultaId] = useState(null)
    const [fechaReserva, setFechaReserva] = useState(null)
    const [horaReserva, setHoraReserva] = useState(null);
    const [error, setError] = useState({})
    const [mensajeExito, setMensajeExito] = useState(null)
    const [mensajeError, setMensajeError] = useState(null)

    const nutricionistaSeleccionado = nutricionistas.find((n) => n.id === Number(nutricionistaId));
    const servicioSeleccionado = tipoConsultas.find((s) => s.id === Number(tipoConsultaId));

    useEffect(()=> {

        const cargarDatos = async () => {

            try {
                
                const [resNutricionstas, resServicios] = await Promise.all([
                    obtenerNutricionistasSimplificados(),
                    obtenerServicios()
                ])

                setNutricionista(resNutricionstas.data)
                setTipoConsultas(resServicios.data)
                setNutricionistaId(resNutricionstas.data[0].id)
                setTipoConsultaId(resServicios.data[0].id)
        
            } catch (error) {
                console.error(error)
            }
        }
        
        cargarDatos()
    }, [])

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {

        // Si falta alguno de los datos, no hacemos la consulta
        if (!nutricionistaId || !tipoConsultaId || !fechaReserva) {
            setHorasDisponibles([]);
            return;
        }

        const cargarHorasDisponibles = async () => {
        
            setHorasDisponibles([]);

            const fecha = formatearFecha(fechaReserva);

            const res = await obtenerHorasDisponibles(
                nutricionistaId,
                tipoConsultaId,
                fecha
            );

            setHorasDisponibles(res.data);
        };

        cargarHorasDisponibles();

    }, [nutricionistaId, tipoConsultaId, fechaReserva]);
    /* eslint-enable react-hooks/set-state-in-effect */

    const handleNutricionistaChange = (e) => {
        setNutricionistaId(Number(e.target.value));
        setFechaReserva(null);
        setHoraReserva(null);
    };

    const handleServicioChange = (e) => {
        setTipoConsultaId(Number(e.target.value));
        setHoraReserva(null); 
    };

    const handleDiaChange = (nuevaFecha) => {
        setFechaReserva(nuevaFecha);
        setHoraReserva(null); 
    };

    const validar = async (e)=>{
        e.preventDefault()
        setMensajeError(null)
        setMensajeExito(null)

        let nuevosErrores = {}

        if(fechaReserva == null){
            nuevosErrores.fecha = 'Selecciona un dia'
        }

        if(horaReserva == null){
            nuevosErrores.hora = 'Selecciona una hora'
        }

        setError(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){

            try {

                const datos = {
                    idNutricionista: nutricionistaId,
                    idCliente: usuario.id,
                    idServicio: tipoConsultaId,
                    fecha: formatearFecha(fechaReserva),
                    horaInicio: horaReserva
                }

                crearReserva(datos)
                    .then(() => {
                        setFechaReserva(null)
                        setHoraReserva(null)
                        setMensajeExito("¡Reserva creada con exito! Revisa tus reservas")
                        console.log(datos)
                    })
                    .catch(()=>{
                        setMensajeError("Ha ocurrido un error")
                    })
                
            } catch (error) {
                console.log(error)
            }

            setError({})
        }else{
            console.log("Hay un error")
        }
    }

    return(
        <form className=" max-w-2xl mx-auto mt-5 md:mt-20 px-5 py-6 border border-gray-200 rounded-lg">
            {(nutricionistaId && tipoConsultaId) && 
            
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="flex flex-col">Tipo Consulta
                            <select onChange={(e)=> handleServicioChange(e)} value={tipoConsultaId} name="tipoConsulta" className="py-2 py-2 border border-gray-300 rounded-lg">
                                {tipoConsultas.map((value) => (
                                    <option key={value.id} value={value.id}>{value.nombre}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="flex flex-col">Nutricionista
                            <select onChange={(e)=> handleNutricionistaChange(e)} value={nutricionistaId} name="nutricionista" className="py-2 py-2 border border-gray-300 rounded-lg">
                                {nutricionistas.map((value)=>(
                                    <option key={value.id} value={value.id}>{value.nombre}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </section>    

            }

            {servicioSeleccionado && 
            
                <section className="flex justify-between items-center px-2 sm:px-10 md:px-25 my-5">
                    <div>
                        <p className="text-sm text-gray-600">Modalidad</p>
                        <p className="text-gray-950">{servicioSeleccionado.modalidad}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Precio</p>
                        <p className="text-gray-950">${servicioSeleccionado.precio}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Duracion</p>
                        <p className="text-gray-950">{servicioSeleccionado.duracionMinutos} min</p>
                    </div>
                </section>
            
            }
            
            <section>
                <h4>Dias disponibles</h4>
                <SelectorDia
                    horario={nutricionistaSeleccionado?.horarioNutricionista}
                    diaSeleccionado={fechaReserva}
                    onSeleccionarDia={handleDiaChange}
                />

                <h4>Horas disponibles</h4>
                <SelectorHora
                    fechaSeleccionada={fechaReserva}
                    horasDisponibles={horasDisponibles}
                    horaSeleccionada={horaReserva}
                    onSeleccionarHora={setHoraReserva}
                />
            </section>
           
           <section className="flex justify-center py-5">
                <button onClick={(e)=> validar(e)} className="max-w-2xs bg-green-800 w-full rounded-2xl py-2 px-4 text-white font-semibold">
                    Reservar
                </button>
           </section>
           <section className="flex justify-center">
                {error && <span className="text-red-500 text-center">{error.fecha}</span>}
                {error && <span className="text-red-500 text-center">{error.dia}</span>}
                {mensajeError && <span className="text-red-500">{mensajeError}</span>}
                {mensajeExito && <span className="text-green-700">{mensajeExito}</span>}
           </section> 
        </form>
    )

}

export default FormularioCrearReserva