import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './style.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Home from './pages/Home'
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from "./pages/AdminDashboard";
import Medicines from './pages/Medicines';
import NewMedicine from './pages/NewMedicine';
import AuthGuard from './guards/auth.guard'
import RoleGuard from './guards/role.guard'
import { Provider } from 'react-redux';
import store from './redux/store';
import { Roles } from './models/roles';
import GestionPacientes from './pages/GestionPacientes';
import NewPatient from './pages/NewPatient';
import GestionMedicos from './pages/GestionMedicos';
import NewDoctor from './pages/NewDoctor';
import GestionAdmin from './pages/GestionAdmin';
import NewAdmin from './pages/NewAdmin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path="/Contacto" element={<Contact />} />

          <Route path='*' element={<Home />} />
        </Route>
        <Route path="/GestionPacientes" element={<GestionPacientes />} />
        <Route path="/GestionMedicos" element={<GestionMedicos />} />
        <Route path="/GestionAdmin" element={<GestionAdmin />} />
        <Route path="/NewPatient" element={<NewPatient />} />
        <Route path="/NewDoctor" element={<NewDoctor />} />
        <Route path="/NewAdmin" element={<NewAdmin />} />
        <Route path='/Medicamentos' element={<Medicines />} />
        <Route path='/NewMedicine' element={<NewMedicine />} />

        <Route element={<AuthGuard/>}>
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* <Route path='/Medicamentos' element={<Medicines />} /> */}
        </Route>
        <Route element={<RoleGuard rol={Roles.ADMIN} />}>
          <Route path='/AdminDashboard' element={<AdminDashboard/>} />
          {/* <Route path='/NewMedicine' element={<NewMedicine />} /> */}
        </Route>
        <Route element={<RoleGuard rol={Roles.MEDICO} />}>
          <Route path='/Dashboard' element={<Dashboard/>} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
