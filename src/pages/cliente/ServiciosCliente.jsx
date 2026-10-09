import FooterCliente from "../../componente/Footers/FooterCliente";
import { Link } from "react-router-dom"


export const listaTipoConsultas = [
    {
        id:1,
        nombre: "Primera consulta nutricional",
        detalle: "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio.",
        precio: 35000,
        duracion: 50
    },
    {
        id:2,
        nombre: "Control nutricional",
        detalle: "Seguimiento mensual: medición de indicadores y ajuste del plan vigente.",
        precio: 25000,
        duracion: 30
    },
    {
        id:3,
        nombre: "Control nutricional quincenal",
        detalle: "Seguimiento intensivo cada 15 días. Recomendado en los primeros 2 meses.",
        precio: 22000,
        duracion: 30
    },{
        id:4,
        nombre: "Teleconsulta nutricional",
        detalle: "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa.",
        precio: 20000,
        duracion: 30
    },
    {
        id:5,
        nombre: "Consulta de urgencia",
        detalle: "Para pacientes que requieren atención fuera de su control habitual.",
        precio: 28000,
        duracion: 30
    }

]


export const listaTipoEvaluaciones = [
    {
        id:1,
        nombre: "Antropometría completa",
        detalle: "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría.",
        precio: 18000,
        duracion: 20
    },
    {
        id:2,
        nombre: "Bioimpedanciometría",
        detalle: "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica.",
        precio: 12000,
        duracion: 15
    },
    {
        id:3,
        nombre: "Encuesta de hábitos alimentarios",
        detalle: "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales.",
        precio: 10000,
        duracion: 20
    },
    {
        id:4,
        nombre: "Análisis de exámenes de laboratorio",
        detalle: "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional.",
        precio: 15000,
        duracion: 20
    }
]




function ServiciosCliente(){

    const usuarioActivo = JSON.parse(localStorage.getItem('sesion_activa'));

    return(
        <>
        <section className="w-full">
            <section className="py-20 flex flex-col justify-center items-center bg-emerald-700" >
                <h2 className="text-5xl font-bold text-white">Servicios</h2>
                <p className="text-slate-300 text-md mt-2 w-[23rem] text-center">Atención personalizada presencial en Temuco o mediante Telemedicina.</p>
                {usuarioActivo 
                ? (<Link  to={"/reservar"} className="mt-5 py-3 px-8 border-2 border-emerald-300 rounded-lg text-emerald-300 hover:bg-emerald-300 hover:text-emerald-800 font-medium">Reservar</Link>)
                : (<Link to={"/login"} className="mt-5 py-3 px-8 border-2 border-emerald-300 rounded-lg text-emerald-300 hover:bg-emerald-300 hover:text-emerald-800 font-medium">Reservar</Link>)}
                
            </section>

            
            <section className="bg-white rounded-2xl max-w-6xl mx-auto px-8">
                <section className="max-w-4xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 place-items-start gap-8">
                    <section className="flex flex-col w-full">
                        <section className="w-full border-b-4 border-emerald-800 mb-10">
                            <h2 className="text-center text-3xl font-bold text-emerald-800 pb-3.5">Consulta</h2>
                        </section>
                        <section className="flex flex-col gap-4">
                            {listaTipoConsultas.map((consulta) => (<article key={consulta.id} className="w-full border-2 border-emerald-800 rounded-lg flex min-h-[8rem]">
                                <div className="w-1/3 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-emerald-700">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                </div>
                                <div className="w-2/3 flex flex-col justify-center py-2 pr-2">
                                    <h3 className="font-semibold">{consulta.nombre}</h3>
                                    <p className="text-sm mb-1.5">{consulta.detalle}</p>
                                    <div className="text-sm flex justify-between pr-6">
                                        <span className="font-semibold text-base">${consulta.precio.toLocaleString("es-CL")}</span>
                                        <span className="text-base">{consulta.duracion} min</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                        </section>                    
                    </section>



                    <section className="flex flex-col w-full">
                        <section className="w-full border-b-4 border-emerald-800 mb-10">
                            <h2 className="text-center text-3xl font-bold text-emerald-800 pb-3.5">Evaluaciones</h2>
                        </section>
                        <section className="flex flex-col gap-4">
                            {listaTipoEvaluaciones.map((evaluacion) => (
                            <article key={evaluacion.id} className="w-full border-2 border-emerald-800 rounded-lg flex min-h-[8rem]">
                                <div className="w-1/3 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-emerald-700">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                </div>
                                <div className="w-2/3 flex flex-col justify-center py-2 pr-2">
                                    <h3 className="font-semibold">{evaluacion.nombre}</h3>
                                    <p className="text-sm mb-1.5">{evaluacion.detalle}</p>
                                    <div className="text-sm flex justify-between pr-6">
                                        <span className="font-semibold text-base">${evaluacion.precio.toLocaleString("es-CL")}</span>
                                        <span className="text-base">{evaluacion.duracion} min</span>
                                    </div>
                                </div>
                            </article>
                            ))}
                        </section>                    
                    </section>
                </section>
            </section>
        </section>
        <FooterCliente/>
        </>
    )
}

export default ServiciosCliente