import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppointmentRegister from "../components/AppointmentRegister";
import AdminNavDashboard from "../components/admindash/AdminNavDashboard";

function NewAppointment() {
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [appointmentId, setAppointmentId] = useState('');
    const [idPaciente, setIdPaciente] = useState('');

    
    const searchParams = new URLSearchParams(location.search);
    useEffect(() => {
        const isEdit = searchParams.get("edit") === "true";
        const idPaciente = searchParams.get("idPaciente");
        const getAppointmentId = searchParams.get("id");
        setAppointmentId(getAppointmentId);
        setIsEditing(isEdit);
        setIdPaciente(idPaciente)
    }, [location.search])

    return (
        <div className="flex w-screen h-screen">
            <AdminNavDashboard />
            <AppointmentRegister isEdit={searchParams.get("edit") === "true"} id={searchParams.get("id")} idPaciente={searchParams.get("idPaciente")}/>
        </div>
    );
}

export default NewAppointment;