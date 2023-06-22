import React from "react";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { useSelector } from "react-redux";
import RecetasList from "./RecetasList";
import RecetaDisplay from "./RecetaDisplay";

function RecetaBook(props) {

    const [patients, setPatients] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [dataRecetaList, setSelectionRecetaList] = useState(null);
    const userState = useSelector((store) => store.user)

    useEffect(() => {
        fetch(`https://localhost:44342/api/Patient/GetPatientsByDoctor?piId=${userState.idMedico}`, {
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
            console.log(value)
            fetch(`https://localhost:44342/api/Receipt/GetUserReceipts?piId=${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setRecetas(data.Data)
                })
                .catch(error => {
                    console.log("Error, no se logró obtener la lista de pacientes de la API");
                })
        }
    }

    const handleSelectionFromRecetaList = (data) => {
        setSelectionRecetaList(data);
        console.log("Received data in parent: " + data);
    }

    const patientsOptionSelect =  patients?.map(patient => ({
        value: parseInt(patient.idPaciente),
        label: `${patient.nombre} ${patient.paterno} ${patient.materno}`
    }));

    console.log("Log-list: " + dataRecetaList);

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
                <RecetasList recetas={recetas} selectionRecetaList={handleSelectionFromRecetaList}/>
            </div>
            <div className="col-span-2 border-2 border-deep-sea-green shadow">
                <RecetaDisplay idReceta={dataRecetaList}/>
            </div>
        </div>
    );


}
export default RecetaBook;