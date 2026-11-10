function ModalConfirmacion({titulo, descripcion, onCancelar, onEvento, textEvento, procesando = false, error}){
    return(
        <section className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <section role="dialog" aria-label={titulo} className="bg-white max-w-2xs p-4 rounded-2xl flex flex-col justify-center items-center">
                <h4 className="text-center">{titulo}</h4>
                <p>{descripcion}</p>
                {error && <p role="alert" className="mt-2 text-red-600">{error}</p>}
                <div className="flex justify-end gap-2.5 mt-3.5">
                    <button onClick={onCancelar} disabled={procesando} className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50">Cancelar</button>
                    <button onClick={onEvento} disabled={procesando} className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50">{procesando ? 'Procesando...' : textEvento}</button>
                </div>
            </section>
        </section>
    )
}

export default ModalConfirmacion
