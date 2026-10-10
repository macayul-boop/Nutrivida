import { HashRouter, Routes, Route } from 'react-router-dom';
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

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* Rutas Invitados */}
          <Route index element={<Inicio/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/registrarse' element={<Registro/>} />
          <Route path='/nosotros' element={<Nosotros/>} />
          <Route path='/servicios' element={<ServiciosCliente/>} />

          {/* Rutas Clientes */}
          <Route path='/reservar' element={<Reservar/>} />
          <Route path='/tusReservas' element={<TusReservas/>} />

          {/* Rutas Empleados */}
          <Route path='/administracion/empleados' element={<AdministracionEmpleado />} />
          <Route path='/administracion/servicios' element={<AdministracionServicios />} />
          <Route path='/secretario/reserva' element={<SecretarioReserva/>}/>
          <Route path='/secretario/horario' element={<SecretarioHorario/>}/>
          <Route path='/nutricionista/agenda' element={<NutricionistaAgenda/>}/>
          <Route path='/nutricionista/fichaClinica' element={<NutricionistaFichaClinica/>}/>

        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
