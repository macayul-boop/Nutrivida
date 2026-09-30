function ModalConfirmacion({titulo, descripcion, onCancelar, onEvento, textEvento}){
    return(
        <section className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <section className="bg-white max-w-2xs p-4 rounded-2xl flex flex-col justify-center items-center">
                <h4 className="text-center">{titulo}</h4>
                <p>{descripcion}</p>
                <div className="flex justify-end gap-2.5 mt-3.5">
                    <button onClick={onCancelar} className="px-4 py-2 bg-gray-300 rounded-lg">Cancelar</button>
                    <button onClick={onEvento} className="px-4 py-2 bg-red-500 text-white rounded-lg">{textEvento}</button>
                </div>
            </section>
        </section>
    )
}

export default ModalConfirmacion