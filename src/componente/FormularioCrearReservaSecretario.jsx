import { useEffect, useState,  } from "react"
import SelectorDia from "./SelectorDia"
import SelectorHora from "./SelectorHora"
import {obtenerClientesSimplificados, obtenerNutricionistasSimplificados, } from '../services/usuarioService'
import {obtenerHorasDisponibles} from '../services/reservaService'
import {obtenerServicios} from '../services/servicioService'

/* const nutricionistas = [
    {id:2, nombre:"Carolina", apellidos:"Fuentes", horario:[{dia:"Lunes",horaInicio:"09:00",horaTermino:"17:00"},{dia:"Miercoles",horaInicio:"09:00",horaTermino:"17:00"},  { dia:"Viernes",horaInicio:"09:00",horaTermino:"17:00"}]},
    {id:3, nombre:"Rodrigo", apellidos:"Sepulveda", horario:[{dia:"Martes",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Jueves",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Sabado",horaInicio:"09:00",horaTermino:"14:00"}]},
    {id:4, nombre:"Daniela", apellidos:"Morales", horario:[{dia:"Lunes", horaInicio:"08:00", horaTermino:"13:00"},{dia:"Viernes",horaInicio:"08:00",horaTermino:"13:00"}]},
    {id:5, nombre:"Rodrigo", apellidos:"Sepulveda", horario:[{dia:"Martes",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Jueves",horaInicio:"09:00",horaTermino:"14:00"},{dia:"Sabado",horaInicio:"09:00",horaTermino:"14:00"}]},
    {id:6, nombre:"Felipe", apellidos:"Araya", horario:[{dia:"Martes",horaInicio:"14:00",horaTermino:"19:00"},{dia:"Viernes",horaInicio:"14:00",horaTermino:"19:00"}]}
]

const tipoConsultas = [
    {id:1, nombre:"Primera consulta nutricional", modalidad:"Presencial", precio:30000, duracion:30},
    {id:2, nombre:"Control nutricional (seguiminento)", modalidad:"Presencial", precio:30000, duracion:30},
    {id:3, nombre:"Control nutricional quincinal", modalidad:"Presencial", precio:30000, duracion:30},
    {id:4, nombre:"Consulta de urgencia", modalidad:"Presencial", precio:30000, duracion:30},
    {id:5, nombre:"Antropometria completa", modalidad:"Presencial", precio:30000, duracion:30},
    {id:6, nombre:"Bioimpedanciometría", modalidad:"Presencial", precio:30000, duracion:30},
    {id:7, nombre:"Encuesta de hábitos alimenticios", modalidad:"Presencial", precio:30000, duracion:30},
    {id:8, nombre:"Análisis de exámenes de laboratorio.", modalidad:"Presencial", precio:30000, duracion:30}
    
]

const clientes = [
    {id:7, nombre:"Benjamin", apellidos:"Herrera", rut: "222606498"},
    {id:8, nombre:"Messi", apellidos:"Cristiano", rut:"222606499"}
] */

const formatearFecha = (fecha) => {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
};

function FormularioCrearReservaSecreatario({onCerrarModal, onGuardar}){

    const [nutricionistas, setNutricionistas] = useState([]);
    const [tipoConsultas, setTipoConsultas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [horasDisponibles, setHorasDisponibles] = useState([]);

    const [cargando, setCargando] = useState(true);

    const [nutricionistaId, setNutricionistaId] = useState(null)
    const [tipoConsultaId, setTipoConsultaId] = useState(null)
    const [clienteId, setClienteId] = useState(null)
    const [fechaReserva, setFechaReserva] = useState(null)
    const [horaReserva, setHoraReserva] = useState(null);
    const [error, setError] = useState({})

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resClientes, resNutricionistas, resServicios] = await Promise.all([
                    obtenerClientesSimplificados(),
                    obtenerNutricionistasSimplificados(),
                    obtenerServicios()
                ]);

                setClientes(resClientes.data);
                setNutricionistas(resNutricionistas.data);
                setTipoConsultas(resServicios.data);

                // Seleccionar los primeros elementos, si existen
                setClienteId(resClientes.data[0]?.id ?? null);
                setNutricionistaId(resNutricionistas.data[0]?.id ?? null);
                setTipoConsultaId(resServicios.data[0]?.id ?? null);

            } catch (error) {
                console.error("Error al cargar los datos:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

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


    
    //const clienteSeleccionado = clientes.find((c) => c.id === Number(clienteId));
    const nutricionistaSeleccionado = nutricionistas.find((n) => n.id === Number(nutricionistaId));
    const servicioSeleccionado = tipoConsultas.find((s) => s.id === Number(tipoConsultaId));

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

    const cancelar = (e)=>{
        e.preventDefault()
        onCerrarModal()
    }

    const validar = (e)=>{
        e.preventDefault()

        let nuevosErrores = {}

        if(fechaReserva == null){
            nuevosErrores.fecha = 'Selecciona un dia'
        }

        if(horaReserva == null){
            nuevosErrores.hora = 'Selecciona una hora'
        }

        setError(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){

            const datos = {
                idNutricionista: nutricionistaId,
                idServicio: tipoConsultaId,
                idCliente: Number(clienteId),
                fecha: formatearFecha(fechaReserva),
                horaInicio: horaReserva,
            }

            onGuardar(datos)
            setError({})
            setFechaReserva(null)
            setHoraReserva(null)
            onCerrarModal()
            console.log(datos)
        }else{
            console.log("Hay un error")
        }
    }


    return(
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-scroll">
            <form className="bg-white max-w-2xl mx-auto mt-5 md:mt-20 px-5 py-6 border border-gray-200 rounded-lg">
                {cargando == false && 
                    <div>
                        <section className="flex flex-col gap-1.5">
                            <label className="flex flex-col">
                                Cliente
                                <select onChange={(e)=> setClienteId(e.target.value)} value={clienteId} name="tipoConsulta" className="py-2 py-2 border border-gray-300 rounded-lg">
                                    {clientes.map((value) => (
                                        <option key={value.id} value={value.id}>{value.nombre}</option>
                                    ))}
                                </select>
                            </label>
                                
                        </section>
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
                        <section className="flex justify-center">
                            {error && <span className="text-red-500 text-center">{error.fecha}</span>}
                            {error && <span className="text-red-500 text-center">{error.hora}</span>}
                        </section> 
                        <section className="flex justify-end gap-5 py-5">
                            <button  onClick={(e)=> cancelar(e)} className="bg-gray-300 rounded-lg py-2 px-4 text-gray-700 font-semibold">
                                Cancelar
                            </button>
                            <button onClick={(e)=> validar(e)} className="bg-green-800 rounded-lg py-2 px-4 text-white font-semibold">
                                Reservar
                            </button>
                        </section>
                    </div>   
                }
            </form>
        </div>
    )
}

export default FormularioCrearReservaSecreatario