import { Link, useNavigate } from "react-router-dom"

import FormularioRegistroCliente from "../../componente/FormularioRegistroCliente"

function Login(){


    return(
        <div className="w-full px-2 sm:px-4 md:px-6">
            <section className="text-center mt-10 md:mt-15 ">
                <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800">Inicio Sesion</h1>
            </section>
            <section className="max-w-2xl mx-auto mt-10">
                <FormularioRegistroCliente/>
            </section>
            <p className="text-md sm:text-lg text-center mt-5">¿No tienes una cuenta? <span className="font-bold text-emerald-800"><Link to={"/registrarse"}>Registrate aca</Link></span></p>
        </div>
    )
}

export default Login