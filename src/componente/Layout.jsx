import {Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import HeaderInvitado from './Headers/HeaderInvitado';
import HeaderCliente from './Headers/HeaderCliente';
import HeaderEmpleado from './Headers/HeaderEmpleado';


function Layout(){

    const { usuario, autenticado, cargando } = useAuth();

    if (cargando) {
        return null;
    }

    const renderHeader = ()=>{
        if(!autenticado){
            return <HeaderInvitado/>
        }

        const rol = usuario.roles[0];

        if(rol === 'CLIENTE'){
            return <HeaderCliente/>
        }

        if(rol === 'NUTRICIONISTA' || rol === 'SECRETARIO' || rol === 'ADMINISTRADOR'){
            return <HeaderEmpleado/>
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