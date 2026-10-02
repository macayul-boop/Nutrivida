import { useMemo } from 'react';

const MAPA_DIAS = {
  domingo: 0,
  lunes: 1,
  martes: 2,
  miercoles: 3,
  miércoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  sábado: 6,
};

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function SelectorDia({horario = [], diaSeleccionado, onSeleccionarDia}){

    const diasDisponibles = useMemo(() => {

    if (!horario || horario.length === 0) return [];

    // Extraemos solo los nombres de los días y los convertimos a números (0 a 6)
    const diasNumeros = horario.map((h) => MAPA_DIAS[h.dia.toLowerCase()]);

    const fechas = [];
    let fechaEvaluada = new Date();
    fechaEvaluada.setDate(fechaEvaluada.getDate() + 1);

    // Buscamos hasta juntar 7 fechas
    while (fechas.length < 7) {
      const numeroDiaSemana = fechaEvaluada.getDay();

      if (diasNumeros.includes(numeroDiaSemana)) {
        fechas.push({
          numeroDia: fechaEvaluada.getDate(),
          nombreMes: MESES[fechaEvaluada.getMonth()],
          fechaCompleta: new Date(fechaEvaluada),
        });
      }

      fechaEvaluada.setDate(fechaEvaluada.getDate() + 1);
    }

    console.log(fechas)
    return fechas;
  }, [horario]);


  return(
    <div className='flex gap-2 flex-wrap'>
        {diasDisponibles.map((dia, index)=> {
            const seleccionado = diaSeleccionado && diaSeleccionado.getTime() === dia.fechaCompleta.getTime();

            return(
                <button 
                    key={index}
                    onClick={(e)=> {
                        e.preventDefault()
                        onSeleccionarDia(dia.fechaCompleta)
                        console.log(dia.fechaCompleta)
                    }}
                    className={`flex flex-col items-center justify-center w-[60px] h-[80px] rounded-lg ${seleccionado ? 'border border-[#0d8a5f]' : 'border border-gray-500'} ${seleccionado ? 'bg-[#e8f5e9]' :'bg-[#f4f5f7]'} cursor-pointer font-bold`}
                    >

                    <span>{dia.numeroDia}</span>
                    <span>{dia.nombreMes}</span>
                </button>
            )
        })}
    </div>
  )
}

export default SelectorDia