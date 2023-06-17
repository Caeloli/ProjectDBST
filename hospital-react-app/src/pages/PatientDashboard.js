import React, { useEffect, useState } from "react";
import PatientNavDashboard from "../components/patientdash/PatientNavDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Calendar from "../components/Calendar";
import Table from "../components/Table";
import { useLocation } from 'react-router-dom';

function PatientDashboard() {
    const [patientInfo, setPatientInfo] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [Doctor, setDoctor] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const PacienteId = searchParams.get("Id");

    useEffect(() => {

        // Obtener datos del paciente con PacienteId, cambiar RUTA si es necesario
        fetch(`https://localhost:44342/api/Patient/GetPatientInfo?piId=${PacienteId}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setPatientInfo(data);
            })
            .catch(error => {
                console.log("Error al obtener los datos del paciente", error);
            });

        // Obtener Cita si es que se tiene. Cambiar RUTA si es necesario
        fetch(`https://localhost:44342/api/Appointment/GetAppointmentsByPatient?piId=${PacienteId}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setAppointment(data);
            })
            .catch(error => {
                console.log("Error al obtener la cita del paciente", error);
            });

    }, []);

    useEffect(() => {
        if (appointment) {
          // Obtener información del médico. Cambiar RUTA si es necesario
            fetch(`https://localhost:44342/api/Doctor/GetDoctorInfo?piId=${appointment.IdMedico}`, {
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
      }, [appointment]);

    const headerTitle = "Cita";
    const headerTable = ["Medico", "Fecha - Hora"];
    const tableInfo = appointment && Doctor.length > 0 ? [[Doctor[0].Nombre + ' ' + Doctor[0].ApellidoPaterno + ' ' + Doctor[0].ApellidoMaterno, appointment.fecha]] : [];

    return (
        <div className="flex w-screen h-screen">
            <PatientNavDashboard />
            <div className="w-full p-2 flex justify-center items-center bg-aqua-squeeze">
                <div className="w-11/12 flex flex-col h-full ">
                    <div className="title flex justify-between my-9">
                        <div className="w-1/2 background-green-blue-gradient flex flex-col justify-between p-4 rounded-2xl text-white">
                            <h2 className="font-bold text-2xl">Buenos Días, <span>{patientInfo?.Nombre}</span></h2>
                        </div>
                        <div>
                            <FontAwesomeIcon className="border p-3 rounded-full " icon={faGear} />
                        </div>
                    </div>
                    <div className="panels grid grid-cols-3 gap-9 flex-1">
                        <div className="paciente-review col-span-1">
                            <div className="bg-white shadow-md h-full border border-blue-hosta rounded-3xl">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <div className="w-32 h-32 p-1 border shadow-md border-blue-hosta radial-bg-blue-hosta-gradient rounded-3xl flex items-center justify-center" >
                                            <img src={require('../assets/imgs/patient.png')} className=" object-contain h-full w-full"></img>
                                        </div>
                                        <h3 className="text-deep-sea-green font-semibold text-xl">{patientInfo?.Nombre  + ' ' + patientInfo?.Paterno + ' ' + patientInfo?.Materno}</h3>
                                        <p className="font-light">Paciente</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 border-t border-t-gray-400 w-3/4 pt-4 my-0 mx-auto">
                                        <div className="flex flex-col text-xl">
                                            <span className="text-deep-sea-green font-bold">Email: </span>
                                            <p>{patientInfo?.Email}</p>
                                        </div>
                                        <div className="flex flex-col text-xl">
                                            <span className="text-deep-sea-green font-bold">Teléfono:</span>
                                            <p>{patientInfo?.Telefono}</p>
                                        </div>
                                        <div className="flex flex-col text-xl">
                                            <span className="text-deep-sea-green font-bold">Dirección:</span>
                                            <p>{patientInfo?.Estado + ' ' + patientInfo.Municipio + ' ' + patientInfo?.Calle + ' ' + patientInfo?.NoExterior}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="appointments-request col-span-1 ">
                            <Calendar />
                        </div>
                        <div className="appointments col-span-1">
                            <Table headerTitle={headerTitle} headerTable={headerTable} tableInfo={tableInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;
