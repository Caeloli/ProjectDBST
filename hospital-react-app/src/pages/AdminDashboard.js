import React, { useEffect, useState } from 'react';
import NavDashboard from "../components/NavDashboard";
import AdminNavDashboard from '../components/admindash/AdminNavDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Calendar from "../components/Calendar";
import MedicationList from "../components/MedicationList";
import Table from "../components/Table";
import { useSelector } from 'react-redux';
function AdminDashboard() {
    const [citas, setCitas] = useState([])
    const [paciente, setPaciente] = useState([])
    useEffect(() => {
        fetch(`https://localhost:44342/api/Appointment/GetAppointments`, {
            method: "GET"
          })
            .then(response => response.json())
            .then(data => {
              setCitas(data.Data)
            })
            .catch(error => {
              console.log("Error al obtener datos de citas", error);
            })
            fetch(`https://localhost:44342/api/Patient/GetAllPatients`, {
                method: "GET"
              })
                .then(response => response.json())
                .then(data => {
                  setPaciente(data.Data)
                })
                .catch(error => {
                  console.log("Error al obtener datos de pacientes", error);
                })
    
      
    }, [])
    

        const userState = useSelector((store) => store.user);
        const headerTitle = "Citas"
        const headerTable = ["idCita", "Descripción", "Fecha", "idMedico", "idPaciente", "Consultorio", "Medico", "Paciente"]
        const tableInfo = [
            ["info", "info", "info"],
            ["info", "info", "info"],
            ["info", "info", "info"]
        ]

        return (
            <div className="flex w-screen h-screen">
                <AdminNavDashboard />
                <div className="w-full p-2 flex justify-center items-center bg-aqua-squeeze">
                    <div className="w-11/12 flex flex-col h-full ">
                        <div className="title flex justify-between my-9">
                            <div className="w-1/2 background-green-blue-gradient flex flex-col justify-between p-4 rounded-2xl text-white">
                                <h2 className="font-bold text-2xl">Buenos Días, <span>{userState.nombre + ' ' + userState.paterno}</span></h2>
                                <p>Usted es <span className="font-bold">{userState.tipo}</span></p>
                            </div>
                            <div>
                                <FontAwesomeIcon className="border p-3 rounded-full " icon={faGear} />
                            </div>
                        </div>
                        <div className="panels grid grid-cols-3 gap-9 flex-1">
                            <div className="appointments col-span-1">
                                <Table headerTitle={headerTitle} headerTable={headerTable} tableInfo={citas} />
                            </div>
                            <div className="appointments-request col-span-1 ">
                                <Calendar />
                            </div>
                            <div className="doctor-review col-span-1">
                                <div className="bg-white shadow-md h-64 border border-blue-hosta rounded-3xl">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex flex-col items-center justify-center py-4">
                                            <div className="w-32 h-32 p-1 border shadow-md border-blue-hosta radial-bg-blue-hosta-gradient rounded-3xl flex items-center justify-center" >
                                                <img src={require('../assets/imgs/admin.png')} className=" object-contain h-full w-full"></img>
                                            </div>
                                            <h3 className="text-deep-sea-green font-semibold text-xl">Admin {userState.nombre + ' ' + userState.paterno + ' ' + userState.materno}</h3>
                                            <p className="font-light">{userState.titulacion}</p>
                                        </div>
                                        {/* <div className="grid grid-cols-2 gap-2 border-t border-t-gray-400 w-3/4 pt-4 my-0 mx-auto">
                                            <div className="flex flex-col text-xl">
                                                <span className="text-deep-sea-green font-bold">2.453</span>
                                                <p>Citas</p>
                                            </div>
                                            <div className="flex flex-col text-xl">
                                                <span className="text-deep-sea-green font-bold">2.453</span>
                                                <p>Pacientes</p>
                                            </div>
                                            <div className="flex flex-col text-xl">
                                                <span className="text-deep-sea-green font-bold">2.453</span>
                                                <p>Pacientes</p>
                                            </div>
                                            <div className="flex flex-col text-xl">
                                                <span className="text-deep-sea-green font-bold">2.453</span>
                                                <p>Consultas</p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="patients-list col-span-2">
                                <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white shadow-lg rounded-3xl border  border-blue-hosta">
                                    <header className="px-5 py-4 ">
                                        <h2 className="font-semibold text-gray-800">Pacientes</h2>
                                    </header>

                                    <div className="overflow-y-auto max-h-full">
                                        <table className="table-fixed w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Nombre</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Nacimiento</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Correo</div>
                                                    </th>
                                                    {/* <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-center"></div>
                                                    </th> */}
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                            {paciente.map((p) => (
                                                <tr>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="font-medium text-gray-800">{p.nombre}</div>
                                                        </div>
                                                    </td>
                                                    
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">{p.fechaNacimiento}</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">{p.email}</div>
                                                    </td>
                                                </tr>
                                                            
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>
                            <div className="medicinal-supplies col-span-1 ">
                                <div className="border-2  shadow-md rounded-3xl max-h-full h-full border-blue-hosta bg-white">
                                    {/* <h3>Medical Supplies</h3> */}
                                    <MedicationList isDashboard={true} ></MedicationList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default AdminDashboard;