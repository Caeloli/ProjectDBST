import React, { useEffect, useState } from "react";
import MedicalAppoimentRow from "./MedicalAppoimentRow";

function MedicalAppoimentList() {
    const [listaCitas, setListaCitas] = useState([]);

    // Ejemplo para probar como se ver
    // const listaCitasTest = [
    //     {
    //         idCita: "1",
    //         nombrePaciente: "Paciente1",
    //         consultorio: "1",
    //         fecha: "18/06/2023 19:58:00"
    //     },
    //     {
    //         idCita: "2",
    //         nombrePaciente: "Paciente2",
    //         consultorio: "2",
    //         fecha: "18/06/2023 19:58:00"
    //     },
    //     {
    //         idCita: "3",
    //         nombrePaciente: "Paciente3",
    //         consultorio: "3",
    //         fecha: "18/06/2023 19:58:00"
    //     }
    // ]


    useEffect(() => {

        const getListaCitas = async () => {
            try {
                const response = await fetch(`URL_GETLISTAS`, {
                    method: "GET"
                });
                const data = await response.json();
                setListaCitas(data.Data);
            } catch (error) {
                console.log("Error al obtener la lista de citas", error);
            }
        }

        getListaCitas();
    }, []);


    const obtenerNombrePaciente = async (idPaciente) => {
        try {
            const response = await fetch(`URL_API_GETPACIENTE`, {
                method: "GET"
            });
            const data = await response.json();
            return data.nombre;
        } catch (error) {
            console.error("Error al obtener el nombre del paciente", error);
            return "";
        }
    };

    const obtenerConsultorio = async (idMedico) => {
        try {
            const response = await fetch(`URL_API_GETMEDICO`, {
                method: "GET"
            });
            const data = await response.json();
            return data.idConsultorio;
        } catch (error) {
            console.error("Error al obtener el consultorio", error);
        }
    }

    return (
        <>
            <div className="patients-list col-span-2">
                <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white  rounded-3xl ">
                    <header className="px-5 py-2">
                        <h2 className="font-semibold text-gray-800 mb-4">Citas Medicas</h2>
                    </header>
                </div>

                <div className=" overflow-y-auto max-h-max">
                    <table className="table-fixed w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap w-3/6">
                                    <div className="font-semibold  text-left">NOMBRE</div>
                                </th>
                                <th className="p-2 whitespace-nowrap w-1/6">
                                    <div className="font-semibold  text-left">CONSULTORIO</div>
                                </th>
                                <th className="p-2 whitespace-nowrap w-2/6">
                                    <div className="font-semibold  text-left">FECHA/HORA</div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                            {listaCitas.map(cita => (
                                // const nombrePaciente = await obtenerNombrePaciente(cita.idPaciente);
                                // const idConsultorio = await obtenerConsultorio(cita.idMedico);

                                // <MedicalAppoimentRow idCita={cita.idCita} nombrePaciente={nombrePaciente} idConsultorio={idConsultorio} fecha={cita.fecha}></MedicalAppoimentRow>
                                <MedicalAppoimentRow idCita={cita.idCita} nombrePaciente={cita.nombrePaciente} idConsultorio={cita.consultorio} fecha={cita.fecha}></MedicalAppoimentRow>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MedicalAppoimentList;