import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useEffect } from "react";

function PatientRow(props) {
    const paciente = props.paciente;
    const isDashboard = props.tipo;
    const [showCard, setShowCard] = useState(false);
    


    const handleClick = () => {
        setShowCard(!showCard)
    };

    const handleDelete = (id) => {
        console.log(id);
        console.log(new Date().toLocaleString());
        fetch(`https://localhost:44342/api/Patient/DeletePatient?piId=${id}`, {
            method: "POST"
        })
            .then(response => {
                if (response.ok) {
                    console.log("Paciente borrado correctamente");
                } else {
                    console.error("No se pudo borrar el paciente");
                }
            })
            .catch(error => {
                console.error("Error al borrar paciente:", error);
            });
    };

    if (isDashboard) {
        return (
            <tr>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {paciente.nombre}
                    </div>
                </td>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {paciente.paterno}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                        {paciente.materno}
                    </div>
                </td>

            </tr>
        );
    } else {
        return (
            <>
                <tr className="hover:bg-gray-100">
                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {paciente.nombre}
                        </div>

                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {paciente.paterno}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {paciente.materno}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left font-mediu">
                            {paciente.fechaNacimiento.substring(0,10)}
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-mediu">
                            <Link to={`/NewPatient?edit=true&id=${paciente.idPaciente}`}>
                                <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faGear} style={{ color: "#545454", }} />
                            </Link>
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium text-green-500 hover:scale-110 translation">
                            <a href="/GestionPacientes" onClick={() => handleDelete(paciente.idPaciente)}>
                                <FontAwesomeIcon className='text-2xl' icon={faCircleXmark} style={{ color: "#ff0000", }} />
                            </a>
                        </div>
                    </td>
                </tr>
                {showCard && (
                    <tr>
                        <td colSpan="6" className="card-cell">
                            <div className="card-content grid grid-cols-3">
                                <div className="row-span-3  flex items-center justify-center flex-col">
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Email:</span>
                                        {paciente.email}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Telefono: </span>
                                        {paciente.telefono}
                                    </p>
                                </div>
                                <div className="col-span-2  flex justify-center">

                                </div>
                                <div className="row-span-2 col-span-2 flex flex-col divide-y">
                                    <div className=" grid grid-cols-2 py-2 px-2">
                                        <div className="flex justify-center">
                                            Dirección:
                                        </div>
                                        <div>
                                            <ul className="list-disc">
                                                {/* Lista de ingredientes activos */}
                                                <li>Estado: {paciente.estado}</li>
                                                <li>Municipio: {paciente.municipio}</li>
                                                <li>Colonia: {paciente.colonia}</li>
                                                <li>Calle: {paciente.calle}</li>
                                                <li>C.P: {paciente.cp}</li>
                                                <li>No.Exterior: {paciente.noExterior}</li>
                                                <li>No. Interior: {paciente.noInterior}</li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </>
        );

    }


}

export default PatientRow;