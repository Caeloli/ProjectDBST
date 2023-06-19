import React, { useState, useEffect } from 'react';
import PatientNavDashboard from '../components/patientdash/PatientNavDashboard';
import TableAp from "../components/TableAp";
import { useLocation } from 'react-router-dom';

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [patientInfo, setPatientInfo] = useState([]);
    const [doctor, setDoctor] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pacienteId = searchParams.get("Id");

  useEffect(() => {
    // Datos Paciente con PacienteId, cambiar RUTA si es necesario
    fetch(`https://localhost:44342/api/Patient/GetPatientInfo?piId=${pacienteId}`, {
      method: "GET",
  })
      .then(response => response.json())
      .then(data => {
          setPatientInfo(data);
      })
      .catch(error => {
          console.log("Error al obtener los datos del paciente", error);
      });

  // Obtener Citas. Cambiar RUTA si es necesario
  fetch(`https://localhost:44342/api/Appointment/GetAppointmentsByPatient?piId=${pacienteId}`, {
      method: "GET"
  })
      .then(response => response.json())
      .then(data => {
          setAppointments(data);
      })
      .catch(error => {
          console.log("Error al obtener la cita del paciente", error);
      });
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      // Obtener información del médico. Cambiar RUTA si es necesario
        fetch(`https://localhost:44342/api/Doctor/GetDoctorInfo?piId=${appointments.IdMedico}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
            setDoctor(data);
            })
            .catch(error => {
            console.log("Error al obtener la información del médico", error);
            });
        }
  }, [appointments]);


    const headerTitle = "Historial de Citas";
    const headerTable = ["Medico", "Fecha - Hora", "Descripción"];
    const tableInfo = appointments.map(appointment =>{
      const doctorName = doctor.length > 0 ? `${doctor[0].Nombre} ${doctor[0].ApellidoPaterno} ${doctor[0].ApellidoMaterno}` : "";
      return [doctorName, appointment.Fecha, appointment.Descripcion];
    });

  return (
    <div className="flex w-screen h-screen">
    <PatientNavDashboard />
    <div className="w-full p-2 flex justify-center items-center bg-aqua-squeeze">
      <div className="w-11/12 flex flex-col h-full ">
        <div className="title flex justify-between my-9">
                        <div className="w-1/2 background-green-blue-gradient flex flex-col justify-between p-4 rounded-2xl text-white">
                            <h2 className="font-bold text-2xl">Mis citas</h2>
                        </div>
        </div>
        <div className="panels grid grid-cols-1 gap-9 flex-1  ">
          <div className="appointments col-span-1">
              <TableAp headerTitle={headerTitle} headerTable={headerTable} tableInfo={tableInfo} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
