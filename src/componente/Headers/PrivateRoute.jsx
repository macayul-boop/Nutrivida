import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PrivateRoute({ children, rolesPermitidos }) {

    const { autenticado, usuario, cargando } = useAuth();

    const obtenerRutaPorRol = (rol) => {
        switch (rol) {
            case "CLIENTE":
                return "/";

            case "ADMINISTRADOR":
                return "/administracion/empleados";

            case "SECRETARIO":
                return "/secretario/reserva";

            case "NUTRICIONISTA":
                return "/nutricionista/agenda";

            default:
                return "/login";
        }
    };

    if (cargando) {
        return <p>Cargando...</p>;
    }

    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }

    console.log("Usuario:", usuario);
    console.log("Rol del usuario:", usuario.roles[0]);
    console.log("Ruta de redirección:", obtenerRutaPorRol(usuario.roles[0]));

    if (rolesPermitidos && !rolesPermitidos.includes(usuario.roles[0])) {
        return <Navigate to={obtenerRutaPorRol(usuario.roles[0])} replace />;
    }

    return children;
}

export default PrivateRoute;