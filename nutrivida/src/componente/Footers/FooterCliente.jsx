function FooterCliente(){
    return(
        <>
        <footer className="w-full bg-emerald-700 py-10 px-10 mt-35">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
                <section className="flex flex-col justify-center items-center">
                    <p className="text-sm text-slate-300">Nutrivida</p>
                    <p className="text-sm text-slate-300 mt-1 w-xs text-center">NutriVida es una clínica de nutrición y dietética fundada en 2016 en Temuco, Región de La Araucanía</p>
                </section>
                <section className="flex flex-col justify-center items-center">
                    <a href="#" className="text-sm text-slate-300">Terminos de servicios</a>
                    <a href="#" className="text-sm text-slate-300 mt-1">Política de Privacidad</a>
                </section>
                <section className="flex flex-col justify-center items-center">
                    <address className="flex flex-col ">
                        <a href="#" className="text-sm text-slate-300">+56 9 1234 5678</a>
                        <a href="mailto:correoejemplo@gmail.com" className="text-sm text-slate-300">contacto@empresa.com</a>
                        <p className="text-sm text-slate-300">Temuco, Araucania, Chile</p>
                    </address>
                </section>
            </div>
            <section className="w-full">
                <p className="text-center text-slate-300 text-sm mt-10">Copyright: © 2026 Nutrivida. Todos los derechos reservados.</p>
            </section>
        </footer>
        </>
    )

}

export default FooterCliente;