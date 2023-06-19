import React from "react";
import { useEffect, useState } from "react";
import Select from 'react-select';
import LogList from "./LogList";
import LogDisplay from "./LogDisplay";

function LogBook(props) {

    const [patients, setPatients] = useState([]);
    const [logs, setLogs] = useState([]);
    const [dataLogList, setSelectionLogList] = useState(null);

    useEffect(() => {
        fetch("https://localhost:44342/api/Patient/GetAllPatients", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setPatients(data.Data);
            })
            .catch(error => {
                console.log("Error, no se logró obtener la lista de pacientes de la API");
            })
    }, []);

    const handleInputChange = (value, inputName) => {
        if (value != null) {
            //GET BY bitacoraID
            fetch(`https://localhost:44342/api/Binnacle/getUserBinnacclea?piId=${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setLogs(data.Data)
                })
                .catch(error => {
                    console.log("Error, no se logró obtener la lista de pacientes de la API");
                })
        }
    }

    const handleSelectionFromLogList = (data) => {
        setSelectionLogList(data);
        console.log("Received data in parent: " + data);
    }

    const patientsOptionSelect = patients.map(patient => ({
        value: parseInt(patient.idPaciente),
        label: `${patient.nombre} ${patient.paterno} ${patient.materno}`
    }));

    console.log("Log-list: " + dataLogList);

    return (
        <div className="max-w-full max-h-full grid grid-cols-3 gap-9 p-5">
            <div className="col-span-1">
                <div className="mb-4">
                    <Select
                        className="shadow border-2 border-deep-sea-green"
                        placeholder="Su Paciente..."
                        options={patientsOptionSelect}
                        onChange={(selectedOption) => handleInputChange(selectedOption.value, "idPaciente")}
                    />
                </div>
                <LogList logs={logs} selectionLogList={handleSelectionFromLogList}/>
            </div>
            <div className="col-span-2 border-2 border-deep-sea-green shadow">
                <LogDisplay idLog={dataLogList}/>
            </div>
        </div>
    );


}
export default LogBook;