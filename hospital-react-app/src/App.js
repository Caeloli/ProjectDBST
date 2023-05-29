import logo from './logo.svg';
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './style.css';

function App() {
  return (
    <div className="App">
      <nav className='bg-deep-sea-green py-3 px-3'>
        <ul className='container m-auto grid grid-cols-5 gap-1 justify-around'>
          <div className='flex mx-auto col-start-1 col-end-3'>
            <div className='logo mr-2'>
              <div className='circle-logo'></div>
            </div>
            <li className='font-bold text-xl ml-2 text-white'>Infinita HealthCare</li>
          </div>
          <div className='flex justify-between text-blue-hosta'>
            <li className='transition hover:text-aqua-squeeze'>
              <Link to="/">Home</Link>
            </li>
            <li className='transition hover:text-aqua-squeeze'>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
            <li className='transition hover:text-aqua-squeeze'>
              <Link to="/Contacto">Contacto</Link>
            </li>
          </div>
          <div className='flex col-start-4 col-end-6 justify-center'>
            <li className='mr-4 text-blue-hosta hover:text-aqua-squeeze transition'>
              <Link to="/Login">Login</Link>
            </li>
            <li className='button-primary'>
              <Link to="/Registro">Sign-Up</Link>
            </li>
          </div>
        </ul>
      </nav>

      <Outlet />
      {
        // Navbar
        // Hero (Presntando Doctores SVG, adjunta una cita, empezar)
        // Section Servicios (Vacunas, registros de pacientes, especialidades)
        // Section Tarjetas (Doctores)
        // Section Features (Instalaciones)
        // Section Testimonios
      }
    </div>
  );
}

export default App;
