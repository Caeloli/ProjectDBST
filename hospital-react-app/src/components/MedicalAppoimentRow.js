import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function MedicalAppoimentRow({ idCita, nombrePaciente, idConsultorio, fecha }) {
    const navigate = useNavigate();


    // const cita = props.cita;
    // const [nombrePaciente, setNombrePaciente] = useState("");
    // const [idConsultorio, setIdConsultorio] = useState("");


    // useEffect(() => {

    //     const getNombrePaciente = () => {
    //         fetch(``, {
    //             method: "GET"
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 setNombrePaciente(data.Data[0].nombre);
    //             })
    //             .catch(error => {
    //                 console.log("Error al obtener al paciente.", error);
    //             })
    //     };

    //     const getIdConsultorio = () => {
    //         fetch(``, {
    //             method: "GET"
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 setIdConsultorio(data.Data[0].idConsultorio);
    //             })
    //             .catch(error => {
    //                 console.log("Error al obtener al medico", error);
    //             })
    //     }

    //     getNombrePaciente();
    //     getIdConsultorio();
    // }, []);

    const handleRowClick = () => {
        navigate(`/Cita?idCita=${idCita}`);
    };

    return (

        <tr className="hover:bg-gray-100 cursor-pointer" onClick={handleRowClick}>
            <td className="p-2  whitespace-nowrap">
                {nombrePaciente}
            </td>
            <td className="p-2  whitespace-nowrap">
                {idConsultorio}
            </td>

            <td className="p-2  whitespace-nowrap">
                {fecha}

            </td>

        </tr>

    )

}


export default MedicalAppoimentRow;