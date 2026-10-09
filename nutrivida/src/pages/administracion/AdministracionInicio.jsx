import { Link } from "react-router-dom"

function AdministracionInicio(){

    return(
        <div>
            <main className="max-w-8xl overflow-x-hidden lg:ml-[300px] ml-0 lg:ml-20 p-4">
                <section className="bg-gray-900 w-full mt-15 lg:mt-1 rounded-md">
                    <h1 className="text-3xl font-bold text-white py-4 px-8">
                        Inicio
                    </h1>
                </section>

                <section className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Panel de administración
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Desde esta sección puedes administrar los empleados y servicios de Nutrivida.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <article className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8 text-green-800"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                                />
                            </svg>

                            <h3 className="text-xl font-semibold">
                                Empleados
                            </h3>
                        </div>

                        <p className="text-gray-600 mt-4">
                            Crea, edita, visualiza y elimina los empleados registrados.
                        </p>

                        <Link
                            to="/administracion/empleados"
                            className="inline-block mt-5 px-4 py-2 bg-green-800 text-white font-semibold rounded-lg"
                        >
                            Administrar empleados
                        </Link>
                    </article>

                    <article className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8 text-green-800"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25A2.25 2.25 0 0 1 8.25 10.5H6A2.25 2.25 0 0 1 3.75 8.25V6ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
                                />
                            </svg>

                            <h3 className="text-xl font-semibold">
                                Servicios
                            </h3>
                        </div>

                        <p className="text-gray-600 mt-4">
                            Crea, edita y elimina los servicios ofrecidos por Nutrivida.
                        </p>

                        <Link
                            to="/administracion/servicios"
                            className="inline-block mt-5 px-4 py-2 bg-green-800 text-white font-semibold rounded-lg"
                        >
                            Administrar servicios
                        </Link>
                    </article>
                </section>
            </main>
        </div>
    )
}

export default AdministracionInicio