import React, { useEffect , useState} from "react";
import MedicineRow from './MedicineRow';
import PatientRow from "./PatientRow";


function PatientsList({ isDashboard }) {
    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaEspecialidades, setListaEspecialidades] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44342/api/Patient/GetAllPatients", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setListaPacientes(data.Data);
                console.log(data.Data)
            })
            .catch(error => {
                console.log("Error no se pudo obtener la lista de pacientes", error);
            })

            fetch("https://localhost:44342/api/Speciality/GetAllSpecialities", {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    setListaEspecialidades(data.Data);
                    console.log(data.Data)
                })
                .catch(error => {
                    console.log("Error no se pudo obtener la lista de especialidades", error);
                })
    }, []);

    if (isDashboard === true) {
        return (
            <div className="patients-list col-span-2">
                <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white shadow-lg rounded-3xl border border-blue-hosta">
                    <header className="px-5 py-4">
                        <h2 className="font-semibold text-gray-800 mb-4">Pacientes</h2>
                    </header>

                    <div className=" overflow-y-auto max-h-[350px]">
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                <th className="p-2 whitespace-nowrap w-2/12">

                                <div className="font-semibold  text-left ">Nombre</div>
                                </th>

                                <th className="p-2 whitespace-nowrap w-2/12">
                                <div className="font-semibold text-left">Paterno</div>
                                </th>

                                <th className="p-2 whitespace-nowrap w-2/12">
                                <div className="font-semibold text-left">Materno</div>
                                </th>

                                <th className="p-2 whitespace-nowrap w-2/12">
                                <div className="font-semibold text-left">Fecha de nacimiento</div>
                                </th>


                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                {listaPacientes.map(paciente => (
                                    <PatientRow paciente={paciente} key={paciente.idPaciente} tipo={isDashboard}></PatientRow>
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
                        <h2 className="font-semibold text-gray-800 mb-4">Pacientes</h2>
                    </header>

                    <div className=" overflow-y-auto">
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-2/12">

                                        <div className="font-semibold  text-left ">Nombre</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Paterno</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Materno</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Fecha de nacimiento</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-1/12">
                                        <div className="font-semibold text-left">
                                        </div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-1/12">
                                        <div className="font-semibold text-left">

                                        </div>
                                    </th>


                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                {listaPacientes.map(paciente => (
                                    <PatientRow paciente={paciente} key={paciente.idPaciente} tipo={isDashboard}></PatientRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

    }

}

export default PatientsList;