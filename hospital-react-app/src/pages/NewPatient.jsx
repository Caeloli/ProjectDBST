import React, { useState, useEffect } from "react";
import HamburgerMenuDesktop from "../components/HamburgerMenuDesktop";
import imagen from '../assets/imgs/nuevoMedicamento.png'
import {useLocation} from "react-router-dom";
import PatientRegister from "../components/PatientRegister";

function NewPatient() {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [pacienteId, setPacienteId] = useState('');

 
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    const isEdit = searchParams.get("edit") === "true";
    const getPacienteId = searchParams.get("id");
    setPacienteId(getPacienteId)
    setIsEditing(isEdit);
    console.log(isEdit, getPacienteId)
  }, [location.search]);

  

  return (
    <div className="flex w-screen h-screen">
      <HamburgerMenuDesktop></HamburgerMenuDesktop>
      <PatientRegister isEdit={searchParams.get("edit") === "true"} id={searchParams.get("id")}/>
    </div>
  );
}

export default NewPatient;