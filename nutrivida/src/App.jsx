import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
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
import AdministracionInicio from './pages/administracion/AdministracionInicio';

function App() {

  return (
    <BrowserRouter>
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
          <Route path='/administracion/inicio' element={<AdministracionInicio />} />
          <Route path='/administracion/empleados' element={<AdministracionEmpleado />} />
          <Route path='/administracion/servicios' element={<AdministracionServicios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
