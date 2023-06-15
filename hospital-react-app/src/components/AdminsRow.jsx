import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function AdminRow(props) {
    const admin = props.admin;
    const isDashboard = props.tipo;
    const [showCard, setShowCard] = useState(false);


    const handleClick = () => {
        setShowCard(!showCard)
    };

    const handleDelete = (id) => {
        console.log(id);
        console.log(new Date().toLocaleString());
        fetch(`https://localhost:44342/api/Admin/DeleteAdmin?psRFC=${id}`, {
            method: "POST"
        })
            .then(response => {
                if (response.ok) {
                    console.log("Admin borrado correctamente");
                } else {
                    console.error("No se pudo borrar el admin");
                }
            })
            .catch(error => {
                console.error("Error al borrar admin:", error);
            });
    };

    if (isDashboard) {
        return (
            <tr>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {admin.nombre}
                    </div>
                </td>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {admin.segundoNombre}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                        {admin.Materno}
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
                            {admin.nombre}
                        </div>

                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {admin.paterno}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {admin.materno}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left font-mediu">
                            {admin.fechaNacimiento.substring(0,10)}
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-mediu">
                            <Link to={`/NewAdmin?edit=true&id=${admin.RFC}`}>
                                <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faGear} style={{ color: "#545454", }} />
                            </Link>
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium text-green-500 hover:scale-110 translation">
                            <a href="/GestionAdmin" onClick={() => handleDelete(admin.RFC)}>
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
                                        {admin.RFC}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Segundo Nombre:</span>
                                        {admin.segundoNombre}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Email: </span>
                                        {admin.email}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Telefono: </span>
                                        {admin.telefono}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Titulación: </span>
                                        {admin.Titulacion}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400 font-medium text-green-500">Salario: </span>
                                        ${admin.salario}
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
                                                <li>Estado: {admin.estado}</li>
                                                <li>Municipio: {admin.municipio}</li>
                                                <li>Colonia: {admin.colonia}</li>
                                                <li>Calle: {admin.calle}</li>
                                                <li>C.P: {admin.cp}</li>
                                                <li>No.Exterior: {admin.noExterior}</li>
                                                <li>No. Interior: {admin.noInterior}</li>
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

export default AdminRow;