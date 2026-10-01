import { useState } from "react"

function HeaderInvitado(){

    const [menuAbierto, setMenuAbierto] = useState(false)

    return(
        <header className=" text-zinc-900 px-4 py-6 border-b border-zinc-200">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">

                <a href="./iniciar-sesion.html" className="flex items-center gap-2 text-xl font-bold">
                    <span>Nutrivida</span>
                </a>

                <button onClick={()=> setMenuAbierto(!menuAbierto)} id="menu-btn" className="lg:hidden text-zinc-600  focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>

                <nav id="menu" className={`w-full lg:flex lg:w-auto lg:items-center mt-4 lg:mt-0 ${menuAbierto ? '' : 'hidden'}`}>
                    <ul className="flex flex-col lg:flex-row gap-4 font-medium">
                        <li><a href="../index.html" className="block hover:text-emerald-500">Inicio</a></li>
                        <li><a href="./servicios.html" className="block hover:text-emerald-500">Servicios</a></li>
                        <li><a href="./nosotros.html" className="block hover:text-emerald-500">Nosotros</a></li>
                        <li><a href="./registrarse.html" className="border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white text-emerald-500 px-4 py-2 rounded-lg text-center font-bold">Registrarse</a></li>
                        <li className="mt-2 lg:mt-0"><a href="#" className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-center font-bold">Iniciar Sesion</a></li>
                    </ul>
                </nav>
            </div>
    </header>
    )

}

export default HeaderInvitado