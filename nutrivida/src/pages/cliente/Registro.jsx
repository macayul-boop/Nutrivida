import { Link } from "react-router-dom"
import FormularioRegistro from "../../componente/FormularioRegistro"

function Registro(){
    return(
        <div className="w-full px-2 sm:px-4 md:px-6">
            <section className="text-center mt-10 md:mt-15">
                <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800">
                    Registrarse
                </h1>
            </section>
            <section className="max-w-2xl mx-auto mt-10">
                <FormularioRegistro />
            </section>
            <p className="text-md sm:text-lg text-center mt-5">
                ¿Ya tienes una cuenta? Inicia sesion{" "}
                <Link to="/login" className="font-bold text-emerald-800">
                    aqui
                </Link>
            </p>
        </div>
    )
}

export default Registro