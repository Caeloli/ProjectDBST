import { Fragment, React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function LogDisplay(props) {

    const navigate = useNavigate();
    const idLog = props.idLog;
    const [isEditable, setIsEditable] = useState(false);
    const [log, setLog] = useState({
        idRegistroBitacora: "",
        fecha: "",
        idPaciente: "",
        idMedico: "",
        padecimiento: "",
        alergia: "",
        idRegistroMedico: "",
        diagnostico: "",
        fechaAsignacion: ""
    });

    useEffect(() => {
        //LookLogByIdLogFull
        console.log(props)
        if (idLog != null) {
            fetch(`https://localhost:44342/api/Binnacle/getUserBinnaccleInfo?piIdBinnacle=${idLog}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setLog(data.Data[0]);
                    console.log(data.Data[0])
                })
                .catch(error => {
                    console.log("Error, no se logró obtener la lista de pacientes de la API");
                })
        }
    }, [idLog]);

    const handleInputChange = (value, inputName) => {
        setLog({
            ...log,
            [inputName]: value
        });
    }

    const handleSubmit = () => {
        fetch(`https://localhost:44342/api/Binnacle/UpdateBinnacle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Log editado correctamente", data.Data);
                navigate('/GestionBitacora')
            })
            .catch(error => {
                console.log("Error al editar la cita", error);
            });
    };

    const handleDelete = () => {
        fetch(`https://localhost:44342/api/Log/DeleteLog?piId=${log.idRegistroBitacora}`, {
            method: "POST",
        })
            .then(response => {
                if (response.ok) {
                    console.log("Log borrada correctamente");
                } else {
                    console.error("No se pudo borrar la Log");
                }
            })
            .catch(error => {
                console.error("Error al borrar la Log:", error);
            });
    }

    return (
        <Fragment>
            <h3 className="text-lg pl-3 text-deep-sea-green font-semibold">Visualización Datos</h3>
            <form className="p-3">

                <h2 className="text-base  text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Bitácora</h2>
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold pl-3 text-base text-deep-sea-green" for="IdBitacora">Id Bitácora</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="IdBitacora" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled value={log.idRegistroBitacora}
                            onChange={(e) => handleInputChange(e.target.value, "idRegBitacora")}
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold pl-3 text-base text-deep-sea-green" for="Fecha">Fecha</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Fecha" type="date" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} 
                        value={log.fecha.split('T')[0]}
                            onChange={(e) => handleInputChange(e.target.value, "fecha")}
                        />
                    </div>
                </div>

                {/* <h2 className="text-base mt-3 text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Padecimientos</h2> */}
                {/* <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold pl-3 text-base text-deep-sea-green" for="Padecimiento">Padecimientos</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Padecimiento" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} value={log.padecimiento}
                            onChange={(e) => handleInputChange(e.target.value, "padecimiento")}
                        />
                    </div>
                </div> */}

                {/* <h2 className="text-base mt-3 text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Alergias</h2>
                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold pl-3 text-base text-deep-sea-green" for="Alergia">Alergias</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Alergia" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} value={log.alergia}
                            onChange={(e) => handleInputChange(e.target.value, "alergia")}
                        />
                    </div>
                </div> */}

                <h2 className="text-base mt-3 text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Registro Medico</h2>
                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold text-base pl-3 text-deep-sea-green" for="RegistroMedico">IdRegistroMédico</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="RegistroMedico" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled value={log.idRegistroMedico}
                            onChange={(e) => handleInputChange(e.target.value, "idRegMedico")}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Diagnostico">Diagnóstico</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Diagnostico" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} value={log.diagnostico}
                            onChange={(e) => handleInputChange(e.target.value, "diagnostico")}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Fecha">Fecha de Asignación</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Fecha" type="date" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} value={log.fechaAsignacion.split('T')[0]}
                            onChange={(e) => handleInputChange(e.target.value, "fechaAsignacion")}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Doctor">Doctor</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Doctor" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} value={log.idMedico}
                            onChange={(e) => handleInputChange(e.target.value, "idMedico")}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Paciente">Paciente</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Paciente" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} value={log.idPaciente}
                            onChange={(e) => handleInputChange(e.target.value, "idPaciente")}
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-3">
                    <button onClick={(event) => {
                        event.preventDefault();
                        if (isEditable) {
                            handleSubmit();
                        } else {
                            setIsEditable(true)
                        }
                    }}
                        className="button-primary w-1/4"
                    >
                        {isEditable === false ? "Editar" : "Actualizar"}
                    </button>
                    {/* <button onClick={(event) => {
                        event.preventDefault();
                        if (isEditable) {
                            setIsEditable(false);
                        } else {
                            handleDelete();
                            navigate('/GestionBitacora')
                        }
                    }}
                        className="text-center button-primary w-1/4">{isEditable === false ? "Eliminar" : "Cancelar"}</button> */}
                        
                        {
                            isEditable ?

                            <button onClick={(event) => {
                            event.preventDefault();
                            setIsEditable(false);
                            }}
                            className="text-center button-primary w-1/4">Cancelar</button> 
                            : <div></div>
                        }                        
                </div>
            </form>
        </Fragment>
    );
}

export default LogDisplay;