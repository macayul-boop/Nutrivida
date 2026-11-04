import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Recuperar la sesión cuando se carga la aplicación

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const tokenGuardado = localStorage.getItem("token");

        if (tokenGuardado) {
            try {
                const datosToken = jwtDecode(tokenGuardado);

                if (datosToken.exp * 1000 > Date.now()) {
                    setToken(tokenGuardado);
                    setUsuario({
                        email: datosToken.sub,
                        id: datosToken.id,
                        roles: datosToken.roles
                    });
                } else {
                    localStorage.removeItem("token");
                }

            } catch (error) {
                localStorage.removeItem("token");
            }
        }

        setCargando(false);
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    // Iniciar sesión
    const login = async (credenciales) => {

        const response = await axiosClient.post(
            "/usuarios/auth/login",
            credenciales
        );

        const nuevoToken = response.data.token;
        const datosToken = jwtDecode(nuevoToken);

        localStorage.setItem("token", nuevoToken);

        setToken(nuevoToken);
        setUsuario({
            email: datosToken.sub,
            id: datosToken.id,
            roles: datosToken.roles
        });

        return datosToken;
    };

    // Registrar usuario
    const register = async (datosRegistro) => {

        const response = await axiosClient.post(
            "/usuarios/auth/register",
            datosRegistro
        );

        const nuevoToken = response.data.token;
        const datosToken = jwtDecode(nuevoToken);

        localStorage.setItem("token", nuevoToken);

        setToken(nuevoToken);
        setUsuario({
            email: datosToken.sub,
            id: datosToken.id,
            roles: datosToken.roles
        });

        return datosToken;
    };

    // Cerrar sesión
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUsuario(null);
    };

    const autenticado = !!token && !!usuario;

    return (
        <AuthContext.Provider
            value={{
                token,
                usuario,
                autenticado,
                cargando,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}