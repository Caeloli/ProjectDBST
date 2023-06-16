import React, { useState, useEffect } from "react";
import HamburgerMenuDesktop from "../components/HamburgerMenuDesktop";
import imagen from '../assets/imgs/nuevoMedicamento.png'
import {useLocation} from "react-router-dom";
import PatientRegister from "../components/PatientRegister";
import DoctorRegister from "../components/DoctorRegister";
import AdminNavDashboard from "../components/admindash/AdminNavDashboard";

function NewDoctor() {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [doctorId, setDoctorId] = useState('');

 
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    const isEdit = searchParams.get("edit") === "true";
    const getDoctorId = searchParams.get("id");
    setDoctorId(getDoctorId)
    setIsEditing(isEdit);
  }, [location.search]);

  

  return (
    <div className="flex w-screen h-screen">
      <AdminNavDashboard></AdminNavDashboard>
      <DoctorRegister isEdit={searchParams.get("edit") === "true"} id={searchParams.get("id")}/>
    </div>
  );
}

export default NewDoctor;