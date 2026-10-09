import {Outlet, useNavigate} from 'react-router-dom';

import HeaderInvitado from './Headers/HeaderInvitado';
import HeaderCliente from './Headers/HeaderCliente';
import HeaderEmpleado from './Headers/HeaderEmpleado';


function Layout(){
    const navigate = useNavigate()

    const usuarioActivo = JSON.parse(localStorage.getItem('sesion_activa'));

    const cerrarSesion = ()=>{
        localStorage.removeItem('sesion_activa');
        navigate('/login');
    }

    const renderHeader = ()=>{
        if(!usuarioActivo){
            return <HeaderInvitado/>
        }

        if(usuarioActivo.rol === 'Cliente'){
            return <HeaderCliente datos={usuarioActivo} onCerrarSesion={cerrarSesion}/>
        }

        if(usuarioActivo.rol === 'Nutricionista' || usuarioActivo.rol === 'Secretario' || usuarioActivo.rol === 'Admin'){
            return <HeaderEmpleado datos={usuarioActivo} onCerrarSesion={cerrarSesion}/>
        }

        return <HeaderInvitado/>
    }

    return( 
        <div>
            {renderHeader()}
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout