import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import FooterCliente from "../../componente/Footers/FooterCliente";
import axiosClient from "../../api/axiosClient"
import {useAuth} from "../../context/AuthContext"



function ServiciosCliente(){
    const {usuario} = useAuth()
    const [servicios, setServicios] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        axiosClient.get("/servicios").then((res) => {
            setServicios(res.data || [])
        }).catch((err) => {
            console.error("Error al obtener los servicios: ", err)
        }).finally(() => {
            setCargando(false)
        })

    }, [])

    return(
        <>
        <section className="w-full">
            <section className="py-20 flex flex-col justify-center items-center bg-emerald-700" >
                <h1 className="text-5xl font-bold text-white">Servicios</h1>
                <p className="text-slate-300 text-md mt-2 w-[23rem] text-center">Atención personalizada presencial en Temuco o mediante Telemedicina.</p>
                {usuario
                ? (<Link  to={"/reservar"} className="mt-5 py-3 px-8 border-2 border-emerald-300 rounded-lg text-emerald-300 hover:bg-emerald-300 hover:text-emerald-800 font-medium">Reservar</Link>)
                : (<Link to={"/login"} className="mt-5 py-3 px-8 border-2 border-emerald-300 rounded-lg text-emerald-300 hover:bg-emerald-300 hover:text-emerald-800 font-medium">Reservar</Link>)}
                
            </section>

            
            <section className="bg-white rounded-2xl max-w-6xl mx-auto px-8">
                {cargando
                    ?(<div className="py-20 text-center text-gray-600 font-medium">
                            Cargando servicios disponibles...
                        </div>)
                    :(
                    <section className="max-w-4xl mx-auto py-20 flex flex-col items-center">
                        <div className="w-full border-b-4 border-emerald-800 mb-10">
                            <div className="w-full border-b-4 border-emerald-800 mb-10">
                                <h2 className="text-center text-3xl font-bold text-emerald-800 pb-3.5">Nuestros Servicios</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {servicios.map((servicio) => (
                                    <article key={servicio.id} className="w-full border-2 border-emerald-800 rounded-lg flex min-h-[8rem]">
                                        <div className="w-1/3 flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-emerald-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                            </svg>
                                        </div>
                                        <div className="w-2/3 flex flex-col justify-center py-2 pr-2">
                                            <h3 className="font-semibold">{servicio.nombre}</h3>
                                            <p className="text-sm mb-1.5">{servicio.descripcion || servicio.detalle}</p>
                                            <div className="text-sm flex justify-between pr-6">
                                                <span className="font-semibold text-base">${Number(servicio.precio).toLocaleString("es-CL")}</span>
                                                <span className="text-base">{servicio.duracionMinutos || servicio.duracion} min</span>
                                            </div>
                                        </div>
                                    </article>
                                    ))}
                            </div>
                        </div>                    
                    </section>
                    )}
                </section>
            </section>
        <FooterCliente/>
        </>
    )
}

export default ServiciosCliente