import { useState } from "react"
import ReservaSecretario from "../../componente/ReservaSecretario"
import FormularioCrearReservaSecreatario from "../../componente/FormularioCrearReservaSecretario"
import ModalConfirmacion from "../../componente/ModalConfirmacion"
import FormularioEditarReserva from "../../componente/FormularioEditarReserva"

const DATOS_RESERVAS = [
    {id:1, idCliente: 1, nombreCliente: "Matias", rutCliente: "222606497", idConsulta:2, idNutricionista: 2, nombreNutricionista: "Alavaro", fecha:"10/12/2026", horaInicio:"10:30", estado:"Reservado"}
]

function SecretarioReserva(){

    // Lista de reservas
    const [reservas, setReservas] = useState(DATOS_RESERVAS)

    // Para mostra el modal de crear reserva
    const [modalCrearReserva, setModalCrearReserva] = useState(false)

    // Mostrar el modal para cancelar reserva
    const [modalCancelarReserva, setModalCancelarReserva] = useState(false)

    // id de la resevra que se va a cancelar
    const [reservaCancelar, setReservaCancelar] = useState(null)

    const [reservaEditar, setReservaEditar] = useState(null)
    const [modalEditarReserva, setModalEditarReserva] = useState(false)

    // Crear una reserva
    const crearReserva = (datos)=>{
        setReservas([...reservas, datos])
    }

    // Mostar el modal y asignar el id de la reserva a cancelar
    const mostrarModalCancelar = (idReserva) => {
        setModalCancelarReserva(!modalCancelarReserva)
        setReservaCancelar(idReserva)
        console.log(idReserva)
    }

    // Cambio de estado de la reserva y actualiza la lista de reserva
    const cancelarReserva = ()=>{
        const nuevaLista = reservas.map((value)=>{
            if(value.id === reservaCancelar){
                value.estado = 'Cancelado'
            }
            return value
        })

        setReservas(nuevaLista);
        setReservaCancelar(null)
        setModalCancelarReserva(!modalCancelarReserva)
    }

    const mostrarModalEditar = (reserva)=>{
        setModalEditarReserva(!modalEditarReserva)
        setReservaEditar(reserva)
    }

    const editarRserva = (reserva)=>{
        console.log(reserva)
        const nuevaLista = reservas.map((value)=> value.id === reserva.id ? reserva : value)
        console.log(nuevaLista)
        setReservas(nuevaLista)
    }

    return(
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">Reservas</h1>
                </section>
                <section className="pt-5 flex justify-end">
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
            {modalCrearReserva && <FormularioCrearReservaSecreatario onCerrarModal={()=> setModalCrearReserva(!modalCrearReserva)} onGuardar={crearReserva}/>}
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
            {modalEditarReserva && <FormularioEditarReserva datos={reservaEditar} onCerrarModal={()=>setModalEditarReserva(!modalEditarReserva)} onGuardar={editarRserva}/>}
        </div>
    )
}

export default SecretarioReserva