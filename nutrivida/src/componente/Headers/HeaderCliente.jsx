import { useState } from "react"
import { Link } from "react-router-dom"

function HeaderCliente({datos, onCerrarSesion}){

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
                            <li className="flex lg:items-center"><Link to={"/"} className="block hover:text-emerald-500">Inicio</Link></li>
                            <li className="flex lg:items-center"><Link to={"/servicios"} className="block hover:text-emerald-500">Servicios</Link></li>
                            <li className="flex lg:items-center"><Link to={"/nosotros"} className="block hover:text-emerald-500">Nosotros</Link></li>

                            <li className="flex lg:items-center"><Link to={"/tusReservas"} className="block hover:text-emerald-500">Tus reservas</Link></li>
                            <li className="flex lg:items-center"><Link to={"/reservar"} className="block hover:text-emerald-500">Reservar</Link></li>
                            <div className="max-w-[120px] flex flex-col justify-center items-center ">
                                <p>{datos.nombre}</p>
                                <button onClick={onCerrarSesion} className="cursor-pointer bg-green-700 tetx-white rounded-sm px-2 text-white">Cerrar Sesion</button>
                            </div>
                        </ul>
                    </nav>
                </div>
        </header>
    )

}

export default HeaderCliente