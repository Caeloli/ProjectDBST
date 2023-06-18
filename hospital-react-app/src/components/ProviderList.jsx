import React, { useState, useEffect } from "react";
import ProviderRow from "./ProviderRow";

function ProviderList(props) {
    const isDashboard = props.isDashboard;
    const [listProviders, setListProviders] = useState([]);

    useEffect(() => {
        fetch("https://api.jsonserver.io/api/Manufacturer/GetAllManufacturers", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-Jsio-Token': '8ecc882dae5b1f14d3e86662a9dddb60'
            }
        })
            .then(response => response.json())
            .then(data => {
                setListProviders(data.Data);
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
                            Proveedores
                        </h2>
                    </header>
                    <div className=" overflow-y-auto max-h-[350px]">
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold  text-left ">Nombre</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold  text-left ">Info Licencia</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Info Registro</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                {
                                    listProviders.map((provider, index) => (
                                        <ProviderRow provider={provider} key={index} tipo={isDashboard} />
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
                            Proveedores
                        </h2>
                    </header>
                    <div className="overflow-y">
                        <table className="table-fixed w-full overflow-y-scroll">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold  text-left ">Nombre</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold  text-left ">Info Licencia</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Info Registro</div>
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
                                    listProviders.map((provider, index) => (
                                        <ProviderRow provider={provider} key={index} tipo={isDashboard} />
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
export default ProviderList;