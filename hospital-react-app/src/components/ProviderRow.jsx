import React from "react";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
//props: provider, tipo
function ProviderRow(props) {
    console.log("Proveedor");
    console.log(props.provider);
    const provider = (props.provider)[0];
    const isDashboard = props.tipo;
    const [showCard, setShowCard] = useState(false);

    const handleClick = () => {
        setShowCard(!showCard);
    };

    const handleDelete = (id) => {
        fetch(`https://localhost:44342/api/Provider/DeleteProvider?piId=${id}`, {
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
                        {provider.Nombre}
                    </div>
                </td>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {provider.Licencia}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                        {provider.Registro}
                    </div>
                </td>
            </tr>
        );
    } else {
        return (
            <Fragment>
                <tr className="hover:bg-gray-100">
                    <td className="p-2  whitespace-nowrap" onClick={handleClick}>
                        <div className="text-left">
                            {provider.Nombre}
                        </div>
                    </td>
                    <td className="p-2  whitespace-nowrap" onClick={handleClick}>
                        <div className="text-left">
                            {provider.Licencia}
                        </div>
                    </td>
                    <td className="p-2 whitespace-nowrap" onClick={handleClick}>
                        <div className="text-left">
                            {provider.Registro}
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium">
                            <Link to={`/NewProvider?edit=true&id=${provider.idFabricante}`}>
                                <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faGear} style={{ color: "#545454", }} />
                            </Link>
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium text-green-500 hover:scale-110 translation">
                            <a href="/GestionFabricantes" onClick={() => handleDelete(provider.idFabricante)}>
                                <FontAwesomeIcon className='text-2xl' icon={faCircleXmark} style={{ color: "#ff0000", }} />
                            </a>
                        </div>
                    </td>
                </tr>
                {showCard && (
                    <tr>
                        <td colSpan="5" className="card-cell">
                            <div className="card-content grid grid-cols-2">
                                <div className="col-span-1 flex items-center justify-center flex-col">
                                    <div className="grid grid-cols-2 py-2 px-2">
                                        <p className="font-sans text-base">
                                            <span className="text-sky-400">Teléfono: </span>
                                            {provider.Telefono}
                                        </p>
                                        <p className="font-sans text-base">
                                            <span className="text-sky-400">Email: </span>
                                            {provider.Email}
                                        </p>
                                        <p className="font-sans text-base">
                                            <span className="text-sky-400">Sitio Web: </span>
                                            {provider.Sitio}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col justify-center items-center">
                                    <div className="grid grid-cols-2 py-2 px-2">
                                        <div className="flex justify-center items-center text-sky-400">
                                            <p className="font-sans text-base">Dirección:</p>
                                        </div>
                                        <div>
                                            <ul className="list-disc">
                                                {/* Lista de ingredientes activos */}
                                                <li>Estado: provider.estado</li>
                                                <li>Municipio: provider.municipio</li>
                                                <li>Colonia: provider.colonia</li>
                                                <li>Calle: provider.calle</li>
                                                <li>C.P: provider.cp</li>
                                                <li>No.Exterior: provider.noExterior</li>
                                                <li>No. Interior: provider.noInterior</li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </Fragment>
        );
    }
}

export default ProviderRow;