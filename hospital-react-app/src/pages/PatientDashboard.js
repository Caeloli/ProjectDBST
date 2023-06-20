import React, { useEffect, useState } from "react";
import PatientNavDashboard from "../components/patientdash/PatientNavDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Calendar from "../components/Calendar";
import Table from "../components/Table";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

function PatientDashboard() {
    const [patientInfo, setPatientInfo] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [Doctor, setDoctor] = useState([]);
    const userState = useSelector((store) => store.user);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const PacienteId = searchParams.get("Id");

    useEffect(() => {

        // Obtener datos del paciente con PacienteId, cambiar RUTA si es necesario
        console.log(userState.idPaciente)
        fetch(`https://localhost:44342/api/Patient/GetPatientById?piId=${userState.idPaciente}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setPatientInfo(data.Data[0]);
                console.log(data.Data)
            })
            .catch(error => {
                console.log("Error al obtener los datos del paciente", error);
            });

        // Obtener Cita si es que se tiene. Cambiar RUTA si es necesario
        fetch(`https://localhost:44342/api/Appointment/GetAppointmentsByPatient?piId=${userState.idPaciente}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setAppointment(data.Data);
                console.log(data.Data)
                if (data.Data.length > 0) {
                    console.log(appointment)
                  // Obtener información del médico. Cambiar RUTA si es necesario
                    fetch(`https://localhost:44342/api/Doctor/GetDoctorById?piId=${data.Data[0].IdMedico}`, {
                        method: "GET"
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data.Data)
                            setDoctor(data.Data);
                        })
                        .catch(error => {
                        console.log("Error al obtener la información del médico", error);
                        });
                    }
            })
            .catch(error => {
                console.log("Error al obtener la cita del paciente", error);
            });


    }, []);

    const handleDelete = (id, idPaciente) => {
        fetch(`https://localhost:44342/api/Appointment/DeleteAppointment?piId=${id}&piIdPaciente=${idPaciente}`, {
            method: "POST",
        })
        .then(response => response.json())
        .then(data => {
            if(data.StatusCode === 200){
                alert(data.Message)
            }else{
                alert(data.Message)
            }
        })
            .catch(error => {
                console.error("Error al borrar la cita:", error);
            });
    };

    // useEffect(() => {
    //     if (appointment) {
    //         console.log(appointment)
    //       // Obtener información del médico. Cambiar RUTA si es necesario
    //         fetch(`https://localhost:44342/api/Doctor/GetDoctorById?piId=${appointment[0].IdMedico}`, {
    //             method: "GET"
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data.Data)
    //                 setDoctor(data.Data);
    //             })
    //             .catch(error => {
    //             console.log("Error al obtener la información del médico", error);
    //             });
    //         }
    //   }, [appointment]);

    const headerTitle = "Cita";
    const headerTable = ["Medico", "Fecha - Hora"];
    const tableInfo = appointment && Doctor.length > 0 ? [[Doctor[0].nombre + ' ' + Doctor[0].paterno + ' ' + Doctor[0].materno, appointment[0].Fecha]] : [];

    return (
        <div className="flex w-screen h-screen">
            <PatientNavDashboard />
            <div className="w-full p-2 flex justify-center items-center bg-aqua-squeeze">
                <div className="w-11/12 flex flex-col h-full ">
                    <div className="title flex justify-between my-9">
                        <div className="w-1/2 background-green-blue-gradient flex flex-col justify-between p-4 rounded-2xl text-white">
                            <h2 className="font-bold text-2xl">Buenos Días, <span>{userState.nombre}</span></h2>
                        </div>
                        <div>
                            <FontAwesomeIcon className="border p-3 rounded-full " icon={faGear} />
                        </div>
                    </div>
                    <div className="panels grid grid-cols-1 gap-9 flex-1">
                        <div className="paciente-review col-span-1">
                            <div className="bg-white shadow-md h-full border border-blue-hosta rounded-3xl">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <div className="w-32 h-32 p-1 border shadow-md border-blue-hosta radial-bg-blue-hosta-gradient rounded-3xl flex items-center justify-center" >
                                            <img src={require('../assets/imgs/patient.png')} className=" object-contain h-full w-full"></img>
                                        </div>
                                        <h3 className="text-deep-sea-green font-semibold text-xl">{userState.nombre  + ' ' + userState.paterno + ' ' + userState.materno}</h3>
                                        <p className="font-light">Paciente</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 border-t border-t-gray-400 w-3/4 pt-4 my-0 mx-auto">
                                        <div className="flex flex-col text-xl">
                                            <span className="text-deep-sea-green font-bold">Email: </span>
                                            <p>{userState.email}</p>
                                        </div>
                                        <div className="flex flex-col text-xl">
                                            <span className="text-deep-sea-green font-bold">Teléfono:</span>
                                            <p>{userState.telefono}</p>
                                        </div>
                                        <div className="flex flex-col text-xl">
                                            <span className="text-deep-sea-green font-bold">Dirección:</span>
                                            <p>{patientInfo.estado + ' ' + patientInfo.municipio + ' ' + patientInfo.calle + ' ' + patientInfo.noExterior}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="appointments-request col-span-1 ">
                            <Calendar />
                        </div> */}
                        <div className="appointments col-span-1">
                            <div className="text-left font-medium text-red-500 hover:scale-110 translation button">
                                    <a href="/PatientDashboard" onClick={() => handleDelete(appointment.idCita, appointment.idPaciente)}>
                                        Cancelar Cita
                                    </a>
                            </div>
                            <Table headerTitle={headerTitle} headerTable={headerTable} tableInfo={tableInfo} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;
