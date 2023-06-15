import React, { useState, useEffect } from "react";
import HamburgerMenuDesktop from "../components/HamburgerMenuDesktop";
import {useLocation} from "react-router-dom";
import DoctorRegister from "../components/DoctorRegister";
import AdminRegister from "../components/AdminRegister";

function NewAdmin() {
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
      <HamburgerMenuDesktop></HamburgerMenuDesktop>
      <AdminRegister isEdit={searchParams.get("edit") === "true"} id={searchParams.get("id")}/>
    </div>
  );
}

export default NewAdmin;