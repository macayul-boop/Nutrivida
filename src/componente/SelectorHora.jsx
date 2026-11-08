
function SelectorHora({
    fechaSeleccionada,
    horasDisponibles = [],
    horaSeleccionada,
    onSeleccionarHora,
}){

    if (!fechaSeleccionada) {
        return <p style={{ color: '#888' }}>Selecciona primero un día disponible.</p>;
    }

    if (horasDisponibles.length === 0) {
        return <p style={{ color: '#888' }}>No hay horarios disponibles para este día.</p>;
    }

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
      {horasDisponibles.map((hora) => {
        const esSeleccionada = horaSeleccionada === hora;

        return (
          <button
            key={hora}
            type="button"
            onClick={() => onSeleccionarHora(hora)}
            className={`px-2 py-3.5 rounded-lg border ${esSeleccionada ? 'border-[#0d8a5f] bg-[#e8f5e9]' : 'border-[#dcdfe6] bg-[#f4f5f7]'} cursor-pointer `}
          >
            {hora} hrs
          </button>
        );
      })}
    </div>
  );

}

export default SelectorHora