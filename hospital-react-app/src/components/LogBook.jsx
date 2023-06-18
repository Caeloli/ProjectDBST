import React from "react";
import { useEffect, useState } from "react";
import Select from 'react-select';
import LogList from "./LogList";

function LogBook(props) {

    const [patients, setPatients] = useState([]);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("https://api.jsonserver.io/api/Patient/GetAllPatients", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-Jsio-Token': '8ecc882dae5b1f14d3e86662a9dddb60'
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
            fetch("https://api.jsonserver.io/api/Patient/GetAllPatients", {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Jsio-Token': '8ecc882dae5b1f14d3e86662a9dddb60'
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


    const patientsOptionSelect = patients.map(patient => ({
        value: parseInt(patient[0].idPaciente),
        label: `${patient[0].nombre} ${patient[0].paterno} ${patient[0].materno}`
    }));

    return (
        <div className="max-w-full max-h-full grid grid-cols-3 gap-9 p-5">
            <div className="col-span-1">
                <div className="mb-4">
                    <Select
                        className="shadow border-2 border-deep-sea-green"
                        placeholder="Su Paciente..."
                        options={patientsOptionSelect}
                        onChange={(selectedOption) => handleInputChange(selectedOption.value, "IdPaciente")}
                    />
                </div>
                <LogList logs={logs} />
            </div>
            <div className="col-span-2 border-2 border-deep-sea-green shadow">
                <h3 className="text-lg pl-3 text-deep-sea-green font-semibold">Visualización Datos</h3>
                <form className="p-3">

                    <h2 className="text-base  text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Bitácora</h2>
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold pl-3 text-base text-deep-sea-green" for="IdBitacora">Id Bitácora</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="IdBitacora" type="text" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold pl-3 text-base text-deep-sea-green" for="Fecha">Fecha</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="Fecha" type="date" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>

                    <h2 className="text-base mt-3 text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Padecimientos</h2>
                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold pl-3 text-base text-deep-sea-green" for="Padecimiento">Padecimientos</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="Padecimiento" type="text" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>

                    <h2 className="text-base mt-3 text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Alergias</h2>
                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold pl-3 text-base text-deep-sea-green" for="Alergia">Alergias</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="Alergia" type="text" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>

                    <h2 className="text-base mt-3 text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Registro Medico</h2>
                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-base pl-3 text-deep-sea-green" for="RegistroMedico">IdRegistroMédico</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="RegistroMedico" type="text" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Diagnostico">Diagnóstico</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="Diagnostico" type="text" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Fecha">Fecha de Asignación</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="Fecha" type="date" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Doctor">Doctor</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="Doctor" type="text" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Paciente">Paciente</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input name="Paciente" type="text" className="shadow border-2 border-deep-sea-green w-full" value={props.id} />
                        </div>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button type="submit" className="button-primary w-1/4">Editar</button>
                        <a href="/GestionCitasAdmin" className="text-center button-primary w-1/4">Eliminar</a>
                    </div>
                </form>
            </div>
        </div>
    );


}
export default LogBook;