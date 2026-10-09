import { Link } from "react-router-dom";
import FooterCliente from "../../componente/Footers/FooterCliente";


function InicioCliente(){

    const usuarioActivo = JSON.parse(localStorage.getItem('sesion_activa'));

    return(
        <>
            <main className="w-full bg-gray-50">

            
            <section className="w-full h-100 bg-emerald-700 md:h-[38rem] grid grid-cols-1">
                <section className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-3">
                        <h2 className="text-3xl md:text-5xl font-bold text-white text-center ">Clinica Nutricional Nutrivida</h2>
                        <p className="text-slate-300 text-lg">Asesoría nutricional personalizada</p>
                    </div>
                    {usuarioActivo 
                    ? (<Link  to={"/reservar"} className="bg-white text-emerald-700 font-semibold hover:bg-emerald-50 py-4 px-6 rounded-3xl mt-6">Reservar Cita</Link>)
                    : (<Link to={"/login"} className="bg-white text-emerald-700 font-semibold hover:bg-emerald-50 py-4 px-6 rounded-3xl mt-6">Reservar Cita</Link>)}
                </section>
            </section>

            
            <section className="w-full bg-gray-200 flex items-center py-5">
                    <section className="max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto">
                            <article className="flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-extrabold text-emerald-600">+1,500</span>
                                <p className="text-sm md:text-base font-medium text-slate-600 mt-1">Pacientes Atendidos</p>
                            </article>
                            <article className="flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-extrabold text-emerald-600">98%</span>
                                <p className="text-sm md:text-base font-medium text-slate-600 mt-1">Planes Adaptados con Éxito</p>
                            </article>
                            <article className="flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-extrabold text-emerald-600">100%</span>
                                <p className="text-sm md:text-base font-medium text-slate-600 mt-1">Atención Personalizada</p>
                            </article>
                            <article className="flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-extrabold text-emerald-600">5+</span>
                                <p className="text-sm md:text-base font-medium text-slate-600 mt-1">Años de Experiencia Médica</p>
                            </article>
                    </section>
            </section>

            
            <section className="max-w-3xl mx-auto px-5">
                    <h2 className="text-2xl text-emerald-800 font-bold text-center mt-10 py-6  md:text-3xl md:pt-5">¿Qué hace un nutricionista por ti?</h2>
                    <div className="max-w-5xl px-15 mx-auto">
                        <p className="text-center text-lg md:text-2xl font-extralight">
                            Un nutricionista no te da una lista de prohibiciones; te enseña a comer según tus necesidades reales. 
                            Evaluamos tu composición corporal, tu metabolismo y tus hábitos diarios para crear un plan nutricional que se ajuste a tus gustos, 
                            horarios y metas. Ya sea que busques perder grasa, ganar masa muscular o mejorar tu salud, te guiamos paso a paso sin pasar hambre.
                        </p>
                    </div>
                    <section className="max-w-3xl flex justify-center items-center mt-10">
                        <div className="w-[20rem] md:w-[30rem] grid grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
                            <article className="w-24 h-24 bg-emerald-500 rounded-lg flex flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                            </article>
                            <article className="w-24 h-24 bg-emerald-500 rounded-lg flex flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                </svg>
                            </article>
                            <article className="w-24 h-24 bg-emerald-500 rounded-lg flex flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                </svg>
                            </article>
                            <article className="w-24 h-24 bg-emerald-500 rounded-lg flex flex-col justify-center items-center" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>
                            </article>
                        </div>
                    </section>
            </section>

            
            <section className="max-w-7xl mx-auto px-5">
                <h2 className="text-2xl text-emerald-800 font-bold text-center mt-10 py-6 md:text-start md:text-3xl md:pt-5">Servicios principales</h2>
                <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 mt-5">
                    <article className="w-full max-w-[19rem] mx-5px px-2 py-5 shadow-md rounded-5xl border-amber-50">
                        <section className="w-full h-[15rem] bg-emerald-500">
                            <img src="/img-1.jpg" alt="fruta" className="w-full h-full object-cover"></img>
                        </section>
                        <section className="px-2 py-2">
                            <h3 className="text-lg font-medium">Primera consulta nutricional</h3>
                            <p className="text-sm">Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio.</p>
                            <p className="text-sm mt-3">$35000</p>
                        </section>
                    </article>
                    <article className="w-full max-w-[19rem] mx-5px px-2 py-5 shadow-md rounded-t-5xl border-amber-50">
                        <section className="w-full h-[15rem] bg-emerald-500 ">
                            <img src="/img-2.jfif" alt="fruta" className="w-full h-full object-cover"></img>
                        </section>
                        <section className="px-2 py-2">
                            <h3 className="text-lg font-medium">Análisis de exámenes de laboratorio</h3>
                            <p className="text-sm">Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría.</p>
                            <p className="text-sm mt-3">$18000</p>
                        </section>
                    </article>
                    <article className="w-full max-w-[19rem] mx-5px px-2 py-5 shadow-md rounded-t-5xl border-amber-50">
                        <section className="w-full h-[15rem] bg-emerald-500 ">
                            <img src="/img-3.jfif" alt="fruta" className="w-full h-full object-cover"></img>
                        </section>
                        <section className="px-2 py-2">
                            <h3 className="text-lg font-medium">Control nutricional (seguimiento)</h3>
                            <p className="text-sm">Seguimiento mensual: medición de indicadores y ajuste del plan vigente.</p>
                            <p className="text-sm mt-3">$25000</p>
                        </section>
                    </article>
                </section>
                <section className="w-full mt-10 px-10 flex justify-center md:justify-end">
                    <Link to={"/servicios"} className="border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white text-emerald-500 px-4 py-2 rounded-lg text-center font-bold">Saber más</Link>
                </section>
            </section>
            </main>
            <FooterCliente/>
        </>
    )
}

export default InicioCliente