import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useEffect } from "react";

function MedicineRow(props) {
    const medicina = props.medicina;
    const isDashboard = props.tipo;
    const [showCard, setShowCard] = useState(false);
    const[providerName, setProviderName] = useState("");

    useEffect(() => {
        const getProviderName = () => {
            fetch(`https://localhost:44342/api/Provider/GetProviderById?piId=${medicina.idFabricante}`, {
              method: "GET"
            })
              .then(response => response.json())
              .then(data => {
                setProviderName(data.Data[0].nombre)
              })
              .catch(error => {
                console.log("Error al obtener fabricante", error);
              });
        
          };
          getProviderName();
    }, [])

    const handleClick = () => {
        setShowCard(!showCard)
    };

    const handleDelete = (id) => {
        console.log(id);
        console.log(new Date().toLocaleString());
        fetch(`https://localhost:44342/api/Medicine/DeleteMedicine?piId=${id}`, {
            method: "POST"
        })
            .then(response => {
                if (response.ok) {
                    console.log("Medicamento borrado correctamente");
                } else {
                    console.error("No se pudo borrar el medicamento");
                }
            })
            .catch(error => {
                console.error("Error al borrar medicamento:", error);
            });
    };

    if (isDashboard) {
        return (
            <tr>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {medicina.formaFarmaceutica}
                    </div>
                </td>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {medicina.nombreComun}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                        ${medicina.precio}
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
                            {medicina.formaFarmaceutica}
                        </div>

                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left">
                            {medicina.nombreComun}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left font-medium text-green-500">
                            ${medicina.precio}
                        </div>
                    </td>

                    <td className="p-2  whitespace-nowrap cursor-pointer" onClick={handleClick}>
                        <div className="text-left font-mediu">
                            {medicina.dosificacionRecomendada}
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-mediu">
                            <Link to={`/NewMedicine?edit=true&id=${medicina.idMedicamento}`}>
                                <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faGear} style={{ color: "#545454", }} />
                            </Link>
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium text-green-500 hover:scale-110 translation">
                            <a href="/Medicamentos" onClick={() => handleDelete(medicina.idMedicamento)}>
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
                                        <span className="text-sky-400">Nombre:</span>
                                        {medicina.nombreComun}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Nombre Farmaceutico: </span>
                                        {medicina.formaFarmaceutica}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Dosis recomendada: </span>
                                        {medicina.dosificacionRecomendada}
                                    </p>
                                    <p className="font-sans text-base">
                                        <span className="text-sky-400">Fabricante: </span>
                                        {providerName}
                                    </p>

                                    <p className="font-sans text-green-600 text-xl">
                                        ${medicina.precio}
                                    </p>
                                </div>
                                <div className="col-span-2  flex justify-center">

                                </div>
                                <div className="row-span-2 col-span-2 flex flex-col divide-y">
                                    <div className=" grid grid-cols-2 py-2 px-2">
                                        <div className="flex justify-center">
                                            Ingrediente(s) Activo:
                                        </div>
                                        <div>
                                            <ul className="list-disc">
                                                {/* Lista de ingredientes activos */}
                                                <li>Ingrediente 1</li>
                                                <li>Ingrediente 2</li>
                                                <li>Ingrediente 3</li>
                                            </ul>

                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-2  py-2 px-2">
                                        <div className="flex justify-center">
                                            <p>Precauciones:</p>
                                        </div>
                                        <div>
                                            <p>
                                                {medicina.precauciones}
                                            </p>

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

export default MedicineRow;