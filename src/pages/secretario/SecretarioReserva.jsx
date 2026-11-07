import { useState, useEffect} from "react"
import ReservaSecretario from "../../componente/ReservaSecretario"
import FormularioCrearReservaSecreatario from "../../componente/FormularioCrearReservaSecretario"
import ModalConfirmacion from "../../componente/ModalConfirmacion"
import FormularioEditarReserva from "../../componente/FormularioEditarReserva"
import {crearReserva, obtenerTodasReservas, cancelarReservaSecretario, editarReservaSecretario} from '../../services/reservaService'
import { obtenerReservasDeUnCliente } from '../../services/usuarioService'

/* const DATOS_RESERVAS = [
    {id:1, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idConsulta:2, idNutricionista: 2, nombreNutricionista: "Alavaro", fecha:"10/12/2026", horaInicio:"10:30", estado:"Reservado"}
] */

function SecretarioReserva(){

    // Lista de reservas
    const [reservas, setReservas] = useState([])

    // Para mostra el modal de crear reserva
    const [modalCrearReserva, setModalCrearReserva] = useState(false)

    // Mostrar el modal para cancelar reserva
    const [modalCancelarReserva, setModalCancelarReserva] = useState(false)

    // id de la resevra que se va a cancelar
    const [reservaCancelar, setReservaCancelar] = useState(null)

    const [reservaEditar, setReservaEditar] = useState(null)
    const [modalEditarReserva, setModalEditarReserva] = useState(false)

    const [textBuscador, setTextBuscador] = useState('')

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        obtenerTodasReservas()
            .then((res)=> setReservas(res.data))
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    // Crear una reserva
    const crearReservaFuncion = (datos)=>{
        crearReserva(datos)
            .then((res)=> setReservas([...reservas, res.data]))
    }

    // Mostar el modal y asignar el id de la reserva a cancelar
    const mostrarModalCancelar = (idReserva) => {
        setModalCancelarReserva(!modalCancelarReserva)
        setReservaCancelar(idReserva)
        console.log(idReserva)
    }

    // Cambio de estado de la reserva y actualiza la lista de reserva
    const cancelarReserva = async ()=>{

         try {
            const res = await cancelarReservaSecretario(reservaCancelar);

            setReservas(
                reservas.map(r =>
                    r.id === reservaCancelar ? res.data : r
                )
            );

        } catch (error) {
            console.error("Error al cancelar la reserva:", error);
        }

    }

    const mostrarModalEditar = (reserva)=>{
        setReservaEditar(reserva)
        setModalEditarReserva(true)
    }

    const editarRserva = async (reserva)=>{
        console.log(reserva)

        try {

            const idReservaEditada = reservaEditar.id;
            const res = await editarReservaSecretario(idReservaEditada, reserva)

            setModalEditarReserva(false)
            setReservaEditar(null)

            setReservas(
                reservas.map(r =>
                    r.id === idReservaEditada ? res.data : r
                )
            );

        } catch (error) {
            console.log(error)
        }

    }

    const buscador = async ()=>{
        if(textBuscador.trim().length === 0){
            obtenerTodasReservas()
                .then((res)=> setReservas(res.data))

        }else{

            try {
                
                const res = await obtenerReservasDeUnCliente(textBuscador.trim())

                setReservas(res.data);                

            } catch (error) {
                console.log(error)
                setReservas([])
            }

        }
    }

    return(
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Reservas</h1>
                </section>
                <section className="pt-5 flex flex-col sm:flex-row justify-between">
                    <section className="flex gap-3.5 max-w-2xl px-4">
                        <input value={textBuscador} onChange={(e)=> setTextBuscador(e.target.value)} type="text" className="border border-gray-400 rounded-lg px-4 py-2 w-full" placeholder="222606497"/>
                        <button onClick={()=> buscador()} className="bg-gray-200 text-gray-600 flex justify-center px-3 py-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            Buscar
                        </button>
                    </section>
                    <button onClick={()=> setModalCrearReserva(!modalCrearReserva)} className="px-4 py-2 bg-green-800 text-white font-semibold rounded-lg">
                        Crear reserva
                    </button>
                </section>
                <section className="max-w-7xl w-full m-4 h-[25rem] overflow-y-scroll border border-gray-200 rounded-lg">
                    <div className="w-full grid grid-cols-5 py-2 bg-gray-900 text-white px-4">
                        <p>Cliente</p>
                        <p>Nutricionista</p>
                        <p>Fecha y Hora</p>
                        <p>Estado</p>
                    </div>
                    <section>
                        {reservas.map((value)=>(
                            <ReservaSecretario datos={value} key={value.id} onEditar={()=> mostrarModalEditar(value)} onCancelar={()=> mostrarModalCancelar(value.id)}/>
                        ))}
                    </section>
                </section>
            </main>
            {modalCrearReserva && <FormularioCrearReservaSecreatario onCerrarModal={()=> setModalCrearReserva(!modalCrearReserva)} onGuardar={crearReservaFuncion}/>}
            {modalCancelarReserva && 
                <ModalConfirmacion 
                    titulo={"¿Estas seguro de que quiere cancelar la reserva?"} 
                    onCancelar={()=> {
                        setModalCancelarReserva(!modalCancelarReserva)
                        setReservaCancelar(null)
                    }} 
                    onEvento={()=> cancelarReserva()}
                    textEvento={"Cancelar Reserva"}
                />
            }
            {modalEditarReserva && 
                <FormularioEditarReserva 
                    datos={reservaEditar} 
                    onCerrarModal={()=>{
                        setModalEditarReserva(false)
                        setReservaEditar(null)
                    }} 
                    onGuardar={editarRserva}/>
            }
        </div>
    )
}

export default SecretarioReserva