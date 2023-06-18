import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function AppointmentAdminRow(props) {
    const cita = (props.cita)[0];
    const isDashboard = props.tipo;
    const [showCard, setShowCard] = useState(false);


    const handleClick = () => {
        setShowCard(!showCard);
    };

    const handleDelete = (id) => {
        fetch(`https://localhost:44342/api/Appointment/DeleteAppointment?piId=${id}`, {
            method: "POST",
        })
            .then(response => {
                if (response.ok) {
                    console.log("Cita borrada correctamente");
                } else {
                    console.error("No se pudo borrar la cita");
                }
            })
            .catch(error => {
                console.error("Error al borrar la cita:", error);
            });
    };

    if (isDashboard) {
        return (
            <tr>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {cita.IdCita}
                    </div>
                </td>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {cita.IdPaciente}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                        {cita.IdMedico}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                        {cita.Fecha}
                    </div>
                </td>
            </tr>
        );
    } else {
        return (
            <Fragment>
                <tr className="hover:bg-gray-100">
                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {cita.IdCita}
                        </div>

                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {cita.IdPaciente}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {cita.IdMedico}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left font-mediu">
                            {cita.Fecha}
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium">
                            <Link to={`/NewAppointment?edit=true&id=${cita.IdCita}`}>
                                <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faGear} style={{ color: "#545454", }} />
                            </Link>
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium text-green-500 hover:scale-110 translation">
                            <a href="/GestionPacientes" onClick={() => handleDelete(cita.IdCita)}>
                                <FontAwesomeIcon className='text-2xl' icon={faCircleXmark} style={{ color: "#ff0000", }} />
                            </a>
                        </div>
                    </td>
                </tr>
                {showCard && (
                    <tr>
                        <td colSpan="6" className="card-cell">
                            <div className="card-content grid grid-cols-6">
                                <div className="row-span-3  flex items-center justify-center flex-col">
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Descripción:</span>
                                        {cita.Descripcion}
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </Fragment>
        );
    }
}

export default AppointmentAdminRow;