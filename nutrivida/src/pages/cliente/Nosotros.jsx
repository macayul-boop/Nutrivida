import FooterCliente from "../../componente/Footers/FooterCliente";

function Nosotros(){
    return(
        <>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 lg:mt-20">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <section className="overflow-hidden rounded-2xl shadow-xl bg-slate-100 aspect-4/3">
                        <img 
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
                        alt="Consulta nutricional NutriVida en Temuco" 
                        className="w-full h-full object-cover"/>
                    </section>
                    <section className="flex flex-col justify-center items-center lg:items-start">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-700 text-center lg:text-start">Clínica Nutricional Nutrivida</h2>
                        <p className="mt-6 text-slate-800 max-w-2xl text-center lg:text-start lg:max-w-full lg:mt-3.5">Desde hace 5 años, en <strong className="text-emerald-700">NutriVida</strong> nos dedicamos 
                            a transformar la relación de nuestra comunidad con la alimentación. Nacimos en Temuco 
                            como un proyecto enfocado en la salud integral, entendiendo que cada cuerpo, rutina y 
                            estilo de vida es único.
                        </p>
                        <p className="text-slate-600 mt-6 text-center lg:text-start lg:mt-3.5 max-w-2xl lg:max-w-full">
                            Nuestro equipo de 4 nutricionistas especializadas te acompaña paso a paso para alcanzar tus metas personales, garantizando tratamientos sostenibles en el tiempo sin dietas restrictivas ni soluciones mágicas.
                        </p>
                        <section className="w-full flex justify-center items-center mt-10 lg:mt-8 lg:justify-end">
                            <a href="#contacto" className="py-4 px-7 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-3xl">Contactanos</a>
                        </section>
                    </section>
                </section>
                
            </section>
            
            
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-15 lg:mt-35">
                <h2 className="text-center text-3xl sm:text-4xl font-bold text-emerald-700">Nuestro equipo</h2>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-15 place-items-center mt-10 p-2">
                    <article className="w-full max-w-[35rem] min-h-52 max-h-[208px] rounded-2xl flex shadow-lg">
                        <div className="w-2/4 rounded-l-2xl">
                            <img src="/nutricionista-1.webp" alt="rostro nutricionista" className="w-full h-full object-cover rounded-l-2xl"></img>
                        </div>
                        <div className="w-3/4 bg-gray-100 px-5 py-5 rounded-r-2xl">
                            <div className="w-full flex justify-end">
                                <svg className="w-6 h-6 text-emerald-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">Nut. Rodrigo Sepúlveda A.</h3>
                            <p className="mt-2.5">Nutrición deportiva y rendimiento</p>
                        </div>
                    </article>
                    <article className="w-full max-w-[35rem] min-h-52 max-h-[208px] rounded-2xl flex shadow-lg">
                        <div className="w-2/4 rounded-l-2xl">
                            <img src="/nutricionista-5.jpeg" alt="rostro nutricionista" class="w-full h-full object-cover rounded-l-2xl"></img>
                        </div>
                        <div className="w-3/4 bg-gray-100 px-5 py-5 rounded-r-2xl">
                            <div className="w-full flex justify-end">
                                <svg className="w-6 h-6 text-emerald-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">Nut. Daniela Morales C.</h3>
                            <p className="mt-2.5">Alimentación vegetariana, vegana y trastornos alimentarios</p>
                        </div>
                    </article>
                    <article className="w-full max-w-[35rem] min-h-52 max-h-[208px] rounded-2xl flex shadow-lg">
                        <div className="w-2/4 rounded-l-2xl">
                            <img src="/nutricionista-3.jfif" alt="rostro nutricionista" class="w-full h-full object-cover rounded-l-2xl"></img>
                        </div>
                        <div className="w-3/4 bg-gray-100 px-5 py-5 rounded-r-2xl">
                            <div className="w-full flex justify-end">
                                <svg className="w-6 h-6 text-emerald-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">Nut. Felipe Araya R.</h3>
                            <p className="mt-2.5">Nutrición pediátrica y familiar</p>
                        </div>
                    </article>
                    <article className="w-full max-w-[35rem] min-h-52 max-h-[208px] rounded-2xl flex shadow-lg">
                        <div className="w-2/4 rounded-l-2xl">
                            <img src="/nutricionista-4.jpeg" alt="rostro nutricionista" class="w-full h-full object-cover rounded-l-2xl"></img>
                        </div>
                        <div className="w-3/4 bg-gray-100 px-5 py-5 rounded-r-2xl">
                            <div className="w-full flex justify-end">
                                <svg className="w-6 h-6 text-emerald-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">Nut. Carolina Fuentes M.</h3>
                            <p className="mt-2.5">Obesidad y síndrome metabólico</p>
                        </div>
                    </article>
                </section>
            </section>

            <section id="contacto" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-15 lg:mt-35">
                <h2 className="text-center text-3xl sm:text-4xl font-bold text-emerald-700">Contactanos</h2>
                <p className="text-center text-lg mt-4 text-slate-800">¿Quieres ponerte en contacto con nosotros? Hablanos mediante el formualrio</p>
                <form className="max-w-3xl mx-auto mt-10 p-5 border border-gray-300 rounded-lg" id="formulario">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-5">
                        <div className="flex flex-col">
                            <label for="nombre">Nombre</label>
                            <input type="text" placeholder="Nombre" id="nombre" name="nombre" className="border border-gray-300 rounded-md p-2 my-2"></input>
                        </div>
                        <div className="flex flex-col">
                            <label for="email">Email</label>
                            <input type="text" placeholder="Email" id="email" name="email" className="border border-gray-300 rounded-md p-2 my-2"></input>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="py-1">Mensaje</label>
                        <textarea id="text-area" name="mensaje" placeholder="Mensaje" className="p-2 border border-gray-300 rounded-md resize-none min-h-50"></textarea>
                    </div>
                    <div className="w-full flex justify-center items-center mt-5">
                        <button type="submit" className="py-3 px-9 bg-emerald-700 text-white font-semibold rounded-3xl">Enviar</button>
                    </div>
                </form>
            </section>

            <FooterCliente/>
        </>
    )
}

export default Nosotros