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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path="/Contacto" element={<Contact />} />

        <Route path='*' element={<Home />} />
      </Route>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path='/AdminDashboard' element={<AdminDashboard/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Registro" element={<Register />} />
      <Route path='/Medicamentos' element={<Medicines />} />
      <Route path='/NewMedicine' element={<NewMedicine />} />
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
