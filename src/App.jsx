import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './componente/Layout';
import Inicio from './pages/cliente/InicioCliente';
import Login from './pages/cliente/Login';
import Registro from './pages/cliente/Registro';
import Reservar from './pages/cliente/ReservarCliente';
import AdministracionEmpleado from './pages/administracion/AdministracionEmpleado';
import Nosotros from './pages/cliente/Nosotros';
import ServiciosCliente from './pages/cliente/ServiciosCliente';
import TusReservas from './pages/cliente/TusReservas';
import AdministracionServicios from './pages/administracion/AdministracionServicios';
import SecretarioReserva from './pages/secretario/SecretarioReserva';
import SecretarioHorario from './pages/secretario/SecretarioHorario';
import NutricionistaAgenda from './pages/nutricionista/NutricionistaAgenda';
import NutricionistaFichaClinica from './pages/nutricionista/NutricionistaFichaClinica';
import PrivateRoute from './componente/Headers/PrivateRoute';

function App() {

  return (
    <HashRouter>
      <AuthProvider>
      
        <Routes>
          <Route path='/' element={<Layout/>}>
            {/* Rutas Invitados */}
            <Route index element={<Inicio/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/registrarse' element={<Registro/>} />
            <Route path='/nosotros' element={<Nosotros/>} />
            <Route path='/servicios' element={<ServiciosCliente/>} />

            {/* Rutas Clientes */}
            <Route path='/reservar' element={<PrivateRoute rolesPermitidos={["CLIENTE"]}> <Reservar/> </PrivateRoute>} />
            <Route path='/tusReservas' element={<PrivateRoute rolesPermitidos={["CLIENTE"]}> <TusReservas/> </PrivateRoute>} />

            {/* Rutas Empleados */}
            <Route path='/administracion/empleados' element={<PrivateRoute rolesPermitidos={["ADMINISTRADOR"]}> <AdministracionEmpleado /> </PrivateRoute>} />
            <Route path='/administracion/servicios' element={<PrivateRoute rolesPermitidos={["ADMINISTRADOR"]}> <AdministracionServicios /> </PrivateRoute>} />
            <Route path='/secretario/reserva' element={<PrivateRoute rolesPermitidos={["SECRETARIO"]}> <SecretarioReserva/> </PrivateRoute>}/>
            <Route path='/secretario/horario' element={<PrivateRoute rolesPermitidos={["SECRETARIO"]}> <SecretarioHorario/> </PrivateRoute>}/>
            <Route path='/nutricionista/agenda' element={<PrivateRoute rolesPermitidos={["NUTRICIONISTA"]}> <NutricionistaAgenda/> </PrivateRoute>}/>
            <Route path='/nutricionista/fichaClinica' element={<PrivateRoute rolesPermitidos={["NUTRICIONISTA"]}> <NutricionistaFichaClinica/> </PrivateRoute>}/>

          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
