import React, { useEffect, useState } from "react";
import NavDashboard from "../components/NavDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom";
import { useSelector } from "react-redux";


function Cita() {
    const navigate = useNavigate();
    const location = useLocation();
    const userState = useSelector((store) => store.user);
    /*
    pacienteInfo {
        nombre,
        paterno,
        materno,
        fechaNacimiento
    }

    medicamentos [
        {
            id,
            name
        }
    ]
    
    */

    const [diagnostico, setDiagnostico] = useState('');
    const [medicamentos, setMedicamentos] = useState([]);
    const [selectedMedicamento, setSelectedMedicamento] = useState('');
    const [dosificacion, setDosificacion] = useState('');
    const [tiempoTratamiento, setTiempoTratamiento] = useState('');
    const [infoPaciente, setInfoPaciente] = useState({});
    const [medicamentosConsulta, setMedicamentosConsulta] = useState([]);

    const searchParams = new URLSearchParams(location.search);
    useEffect(() => {
        // Realizar la petición GET para obtener la lista de medicamentos desde la base de datos
        // y guardarla en el estado "medicamentos"

        const idPaciente = searchParams.get("idPaciente");
        
        const fetchMedicamentos = async () => {
            fetch("https://localhost:44342/api/Medicine/GetAllMedicine", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setMedicamentos(data.Data);
                console.log(data.Data)
            })
            .catch(error => {
                console.log("Error no se pudo obtener la lista de medicinas", error);
            })
        
        };

        // Realizar una peticion GET para obtener la informacion del paciente de la cita desde la base de datos
        // y guardarla en elestado "infoPaciente"
        const fetchInfoPaciente = async (idPaciente) => {
            fetch(`https://localhost:44342/api/Patient/GetPatientById?piId=${parseInt(idPaciente)}`, {
            method: "GET"
          })
            .then(response => response.json())
            .then(data => {
              setInfoPaciente(data.Data[0])
            })
        }

        fetchMedicamentos();
        fetchInfoPaciente(idPaciente);
    }, []);

    const handleCompleteConsultation = () => {
        // Lógica para completar la consulta
        console.log('Consulta completada');

        const consulta = {
            diagnostico: diagnostico,
            medicamentos: medicamentosConsulta,
            idMedico: searchParams.get("idMedico"),
            idPaciente: searchParams.get("idPaciente"),
            Fecha: new Date()
            
        }
        
        console.log(consulta)
        // Se manda una peticion POST a la API para guardar la consulta en la base de datos
        fetch(`https://localhost:44342/api/Binnacle/AddBinnacle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consulta)
        })
            .then(response => response.json())
            .then(data => {
                console.log("consulta guardado correctamente");
                navigate("/Dashboard");
            })
            .catch(error => {
                console.log("error al guardar la consulta");
            })
    };

    const handleDiagnosticoChange = (event) => {
        setDiagnostico(event.target.value);
    };

    const handleMedicamentoChange = (event) => {
        setSelectedMedicamento(event.target.value);
    };

    const handleDosificacionChange = (event) => {
        setDosificacion(event.target.value);
    };

    const handleTiempoTratamientoChange = (event) => {
        setTiempoTratamiento(event.target.value);
    };

    const handleAddMedicamento = () => {
        // Lógica para agregar un nuevo medicamento a la lista de medicamentos

        if (selectedMedicamento) {
            // Filtramos el medicamento seleccionado
            const medicamento = medicamentos.find(medicamento => medicamento.idMedicamento === parseInt(selectedMedicamento));

            if (!(medicamentosConsulta.find(m => m.idMedicamento === medicamento.idMedicamento))) {
                // Creamos el medicamento a agregar
                const newMedicamentoConsulta = {
                    id: medicamento.idMedicamento,
                    nombre: medicamento.nombreComun,
                    dosificacion,
                    tiempoTratamiento
                }

                // Agregamos a la lista el medicamento
                setMedicamentosConsulta([...medicamentosConsulta, newMedicamentoConsulta]);
            }



            // Limpiamos los campos
            setSelectedMedicamento('');
            setDosificacion('');
            setTiempoTratamiento('');
        }
    };



    const handleDeleteMedicamento = (idMedicamento) => {
        const filteredMedicamentosConsulta = medicamentosConsulta.filter((medicamento) => medicamento.id != idMedicamento);

        setMedicamentosConsulta(filteredMedicamentosConsulta);
    }

    return (
        <div className="flex w-screen h-screen">
            <NavDashboard></NavDashboard>

            <div className="container mx-auto p-4 ">
                <div className="flex rounded-3xl border-blue-hosta border p-2">
                    <div className="w-1/3 pr-4">
                        <h2 className="text-2xl font-bold mb-4">Paciente</h2>
                        <div className="mb-4">
                            <p>
                                <span className="font-bold">Nombre:</span> {infoPaciente.nombre}
                            </p>
                            <p>
                                <span className="font-bold">Apellido Paterno:</span>{' '}
                                {infoPaciente.paterno}
                            </p>
                            <p>
                                <span className="font-bold">Apellido Materno:</span>{' '}
                                {infoPaciente.materno}
                            </p>
                            <p>
                                <span className="font-bold">Fecha de Nacimiento:</span>{' '}
                                {infoPaciente.fechaNacimiento}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/3 pr-4">
                        <h2 className="text-2xl font-bold mb-4">Información de la Cita</h2>
                        <form className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="diagnostico" className="font-bold">
                                    Diagnóstico:
                                </label>
                                <textarea
                                    id="diagnostico"
                                    value={diagnostico}
                                    onChange={handleDiagnosticoChange}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="medicamento" className="font-bold">
                                    Medicamento:
                                </label>
                                <select
                                    id="medicamento"
                                    value={selectedMedicamento}
                                    onChange={handleMedicamentoChange}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                >
                                    <option value="">Seleccionar Medicamento</option>
                                    {medicamentos.map((medicamento) => (
                                        <option key={medicamento.idMedicamento} value={medicamento.idMedicamento}>
                                            {medicamento.nombreComun}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dosificacion" className="font-bold">
                                    Dosis:
                                </label>
                                <input
                                    type="text"
                                    id="dosificacion"
                                    value={dosificacion}
                                    onChange={handleDosificacionChange}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="tiempoTratamiento" className="font-bold">
                                    Días para tomar:
                                </label>
                                <input
                                    type="text"
                                    id="tiempoTratamiento"
                                    value={tiempoTratamiento}
                                    onChange={handleTiempoTratamientoChange}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddMedicamento}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Agregar Medicamento
                            </button>
                        </form>
                    </div>
                    <div className="w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Medicamentos</h2>
                        <ul>
                            <div className="divide-y">
                                {medicamentosConsulta.map((medicamento) => (
                                    <li key={medicamento.id} className=" mb-2">
                                        <div className=" flex justify-end line-clamp-none">
                                            <FontAwesomeIcon
                                                className='text-2xl hover:scale-110 cursor-pointer'
                                                icon={faCircleXmark}
                                                style={{ color: "#ff0000", }}
                                                onClick={() => handleDeleteMedicamento(medicamento.id)}
                                            />
                                        </div>
                                        <p>
                                            <span className="font-bold">Medicamento:</span>{' '}
                                            {medicamento.nombre}
                                        </p>
                                        <p>
                                            <span className="font-bold">Dosis:</span> {medicamento.dosificacion}
                                        </p>
                                        <p>
                                            <span className="font-bold">Días para tomar:</span>{' '}
                                            {medicamento.tiempoTratamiento}
                                        </p>
                                    </li>
                                ))}
                            </div>
                        </ul>
                        <div className="p-4">
                            <button
                                type="button"
                                onClick={handleCompleteConsultation}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            >
                                Completar Consulta
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Cita;