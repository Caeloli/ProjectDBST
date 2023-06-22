import React, { useState, useEffect } from "react";
import ConsultingRoomRow from "./ConsultingRoomRow";
function ConsultingRoomList(props) {
    const isDashboard = props.isDashboard;
    const [listCRooms, setListCRooms] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44342/api/Rooms/GetAllRooms", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setListCRooms(data.Data);
                console.log(data.Data)
            })
            .catch(error => {
                console.log("Error no se pudo obtener la lista de consultorios", error);
            })
    }, []);

    if (isDashboard === true) {
        return (
            <div className="rooms-list col-span-2">
                <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white shadow-lg rounded-3xl border border-blue-hosta">
                    <header className="px-5 py-4">
                        <h2 className="font-semibold text-gray-800 mb-4">Consultorios</h2>
                    </header>

                    <div className=" overflow-y-auto max-h-[350px]">
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-2/12">

                                        <div className="font-semibold  text-left ">Número</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Médico</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Indicador de Limpieza</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Actualizar Limpieza</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Editar</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Eliminar</div>
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                {listCRooms.map(room => (
                                    <ConsultingRoomRow room={room} key={room.IdConsultorio} tipo={isDashboard} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        );
    } else {

        return (
            <div className="patients-list col-span-2">
                <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white shadow-lg rounded-3xl border border-blue-hosta">
                    <header className="px-5 py-4">
                        <h2 className="font-semibold text-gray-800 mb-4">Consultorios</h2>
                    </header>

                    <div className=" overflow-y-auto">
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-2/12">

                                        <div className="font-semibold  text-left ">Número</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Médico</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Indicador de Limpieza</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Actualizar Limpieza</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Editar</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Eliminar</div>
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                {listCRooms.map(room => (
                                    <ConsultingRoomRow room={room} key={room.IdConsultorio} tipo={isDashboard} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

    }
}

export default ConsultingRoomList;