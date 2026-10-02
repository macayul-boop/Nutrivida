import { useMemo } from 'react';

const DIAS_SEMANA = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

// Función auxiliar para convertir "09:30" a minutos totales (ej: 570 min)
const horaAMinutos = (horaStr) => {
  const [horas, minutos] = horaStr.split(':').map(Number);
  return horas * 60 + minutos;
};

// Función auxiliar para convertir minutos totales (ej: 570 min) a formato "09:30"
const minutosAHora = (minutosTotales) => {
  const horas = Math.floor(minutosTotales / 60);
  const mins = minutosTotales % 60;
  const hFormateada = String(horas).padStart(2, '0');
  const mFormateada = String(mins).padStart(2, '0');
  return `${hFormateada}:${mFormateada}`;
};

function SelectorHora({
    fechaSeleccionada,
    horarioNutricionista = [],
    duracionServicioMinutos,
    horaSeleccionada,
    onSeleccionarHora,
}){

    const bloquesHorarios = useMemo(() => {
        if (!fechaSeleccionada || !horarioNutricionista.length) return [];

        // 1. Identificamos qué día de la semana es la fecha seleccionada
        const numeroDia = fechaSeleccionada.getDay(); // 0 = Domingo, 1 = Lunes...
        const nombreDiaElegido = DIAS_SEMANA[numeroDia];

        // 2. Buscamos en el horario del nutricionista la configuración para este día
        const horarioDelDia = horarioNutricionista.find(
            (h) => h.dia.toLowerCase() === nombreDiaElegido.toLowerCase()
        );

        console.log(horarioDelDia)

        // Si el nutricionista no trabaja este día, no generamos bloques
        if (!horarioDelDia) return [];

        // 3. Convertimos horaInicio y horaTermino a minutos para iterar fácilmente
        const inicioMin = horaAMinutos(horarioDelDia.horaInicio);
        const finMin = horaAMinutos(horarioDelDia.horaTermino);

        console.log(inicioMin)
        console.log(finMin)

        const horasGeneradas = [];
        let horaActualMin = inicioMin;

        // 4. Iteramos desde la hora de inicio hasta que no quepa otra cita completa
        console.log(duracionServicioMinutos)
        console.log(horaActualMin + duracionServicioMinutos <= finMin)
        while (horaActualMin + duracionServicioMinutos <= finMin) {
            horasGeneradas.push(minutosAHora(horaActualMin));
            // Avanzamos el reloj según la duración del servicio
            horaActualMin += duracionServicioMinutos;
            console.log('entro')
        }

        console.log(horasGeneradas)
        return horasGeneradas;
        
    }, [fechaSeleccionada, horarioNutricionista, duracionServicioMinutos]);

    if (!fechaSeleccionada) {
        return <p style={{ color: '#888' }}>Selecciona primero un día disponible.</p>;
    }

    if (bloquesHorarios.length === 0) {
        return <p style={{ color: '#888' }}>No hay horarios disponibles para este día.</p>;
    }

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
      {bloquesHorarios.map((hora, index) => {
        const esSeleccionada = horaSeleccionada === hora;

        return (
          <button
            key={index}
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