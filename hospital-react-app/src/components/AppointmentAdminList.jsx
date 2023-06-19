import React, { useEffect, useState } from "react";
import AppointmentAdminRow from "./AppointmentAdminRow";

function AppointmentAdminList(props) {

    const isDashboard = props.isDashboard;
    const [listaCitas, setListaCitas] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44342/api/Appointment/GetAppointments", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setListaCitas(data.Data);
                console.log(data.Data);
            })
            .catch(error => {
                console.log("Error, no se logró obtener la lista de pacientes de la API");
            })
    }, [])

    if (isDashboard === true) {
        return (
            <div className="dates-list col-span-2">
                <div className="w-auto max-w-full mx-auto bg-white shadow-lg rounded-3xl border border-blue-hosta">
                    <header className="px-5 py-4">
                        <h2 className="font-semibold text-gray-800 mb-4">
                            Citas
                        </h2>
                    </header>
                    <div className=" overflow-y-auto max-h-[350px]">
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold  text-left ">Num. Cita</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold  text-left ">Nombre Paciente</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Nombre Doctor</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Fecha</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                {
                                    listaCitas.map((cita, index) => (
                                        <AppointmentAdminRow cita={cita} key={index} tipo={isDashboard} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
    else if (isDashboard === false) {
        return (
            <div className="dates-list col-span-2">
                <div className="w-auto max-w-full mx-auto bg-white shadow-lg rounded-3xl border border-blue-hosta">
                    <header className="px-5 py-4">
                        <h2 className="font-semibold text-gray-800 mb-4">
                            Citas
                        </h2>
                    </header>
                    <div className="overflow-y">
                        <table className="table-fixed w-full overflow-y-scroll">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold  text-left ">Num. Cita</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold  text-left ">Nombre Paciente</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Nombre Doctor</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Fecha</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Editar</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Eliminar</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 max-h-screen">
                                
                                    {
                                        listaCitas.map((cita, index) => (
                                            <AppointmentAdminRow cita={cita} key={index} tipo={isDashboard} />
                                        ))
                                    }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}



export default AppointmentAdminList;