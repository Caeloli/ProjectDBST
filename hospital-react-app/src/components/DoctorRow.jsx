import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function DoctorRow(props) {
    const doctor = props.doctor;
    const isDashboard = props.tipo;
    const [showCard, setShowCard] = useState(false);


    const handleClick = () => {
        setShowCard(!showCard)
    };

    const handleDelete = (id) => {
        console.log(id);
        console.log(new Date().toLocaleString());
        fetch(`https://localhost:44342/api/Doctor/DeleteDoctor?psRFC=${id}`, {
            method: "POST"
        })
            .then(response => {
                if (response.ok) {
                    console.log("Doctor borrado correctamente");
                } else {
                    console.error("No se pudo borrar el doctor");
                }
            })
            .catch(error => {
                console.error("Error al borrar doctor:", error);
            });
    };

    if (isDashboard) {
        return (
            <tr>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {doctor.nombre}
                    </div>
                </td>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {doctor.segundoNombre}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                        {doctor.Materno}
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
                            {doctor.nombre}
                        </div>

                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {doctor.paterno}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {doctor.materno}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left font-mediu">
                            {doctor.fechaNacimiento.substring(0,10)}
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-mediu">
                            <Link to={`/NewDoctor?edit=true&id=${doctor.idMedico}`}>
                                <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faGear} style={{ color: "#545454", }} />
                            </Link>
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium text-green-500 hover:scale-110 translation">
                            <a href="/GestionMedicos" onClick={() => handleDelete(doctor.RFC)}>
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
                                        <span className="text-sky-400">RFC:</span>
                                        {doctor.RFC}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Segundo Nombre:</span>
                                        {doctor.segundoNombre}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Email: </span>
                                        {doctor.email}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Telefono: </span>
                                        {doctor.telefono}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Cedula Profesional: </span>
                                        {doctor.cedulaProfesional}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Consultorio: </span>
                                        {doctor.idConsultorio}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400 font-medium text-green-500">Salario: </span>
                                        ${doctor.salario}
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
                                                <li>Estado: {doctor.estado}</li>
                                                <li>Municipio: {doctor.municipio}</li>
                                                <li>Colonia: {doctor.colonia}</li>
                                                <li>Calle: {doctor.calle}</li>
                                                <li>C.P: {doctor.cp}</li>
                                                <li>No.Exterior: {doctor.noExterior}</li>
                                                <li>No. Interior: {doctor.noInterior}</li>
                                            </ul>

                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-2 py-2 px-2">
                                        <div className="flex justify-center">
                                            Especialidades:
                                        </div>
                                        <div>
                                            <ul className="list-disc">
                                                <li>Especialidad 1</li>
                                                <li>Especialidad 2</li>
                                                <li>Especialidad 3</li>
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

export default DoctorRow;