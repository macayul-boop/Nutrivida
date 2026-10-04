import { useState } from 'react';
import Servicio from '../../componente/Servicio';

const SERVICIOS_INICIALES = [
    {
        id:1,
        nombre:"Primera consulta nutricional",
        precio:35000,
        duracion:60,
        modalidad:"Presencial"
    },
    {
        id:2,
        nombre:"Control nutricional",
        precio:25000,
        duracion:30,
        modalidad:"Presencial"
    },
    {
        id:3,
        nombre:"Consulta nutricional online",
        precio:20000,
        duracion:30,
        modalidad:"Online"
    },
    {
        id:4,
        nombre:"Antropometria completa",
        precio:18000,
        duracion:45,
        modalidad:"Presencial"
    }
]

function AdministracionServicios(){

    const [listaServicios] = useState(SERVICIOS_INICIALES)

    return(
        <div>
            <main className="overflow-x-hidden lg:ml-[300px] ml-0 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">
                        Servicios
                    </h1>
                </section>

                <section className="max-w-7xl w-full mt-4 h-[25rem] overflow-auto border border-gray-200 rounded-lg">
                    <div className="min-w-[700px]">
                        <section className="w-full grid grid-cols-4 py-2 bg-gray-900 text-white px-4">
                            <p>Nombre</p>
                            <p>Precio</p>
                            <p>Duracion</p>
                            <p>Modalidad</p>
                        </section>

                        <section>
                            {listaServicios.map((value)=>(
                                <Servicio
                                    key={value.id}
                                    datos={value}
                                />
                            ))}
                        </section>
                    </div>
                </section>
            </main>
        </div>
    )

}

export default AdministracionServicios