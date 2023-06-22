import { Fragment, React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from './Modal';
import ModalAddExtraMed from './ModalAddExtraMed';

function RecetaDisplay(props) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const idReceta = props.idReceta;
    const [isEditable, setIsEditable] = useState(false);
    const [receta, setReceta] = useState([
        {
            idRegistroMedico: "",
            diagnostico: "",
            fechaAsignacion: "",
            nombreComun: "",
            tiempoTratamiento: "",
            dosificacion: "",
            nombre: "",
            paterno: "",
            materno: "",
            nombreMedico: "",
            paternoMedico: "",
            maternoMedico: ""
        }
    ]);
    

    useEffect(() => {
        //LookLogByIdLogFull
        console.log(props)
        if (idReceta != null) {
            fetch(`https://localhost:44342/api/Receipt/GetRecetaInfo?piId=${idReceta}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setReceta(data.Data);
                    console.log(data.Data[0])
                })
                .catch(error => {
                    console.log("Error, no se logró obtener la lista de pacientes de la API");
                })
        }
    }, [idReceta, showModal]);

    const handleInputChange = (value, inputName) => {
        setReceta({
            ...receta,
            [inputName]: value
        });
    }

    // const handleDelete = () => {
    //     fetch(`https://localhost:44342/api/Log/DeleteLog?piId=${log.idRegistroBitacora}`, {
    //         method: "POST",
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 console.log("Log borrada correctamente");
    //             } else {
    //                 console.error("No se pudo borrar la Log");
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error al borrar la Log:", error);
    //         });
    // }

    return (
        <Fragment>
            <h3 className="text-lg pl-3 text-deep-sea-green font-semibold">Visualización Datos</h3>
            <form className="p-3">

                <h2 className="text-base  text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Bitácora</h2>
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold pl-3 text-base text-deep-sea-green" for="IdBitacora">Id Receta</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="IdBitacora" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled value={receta[0].idRegistroMedico}
                            onChange={(e) => handleInputChange(e.target.value, "idRegistroMedico")}
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold pl-3 text-base text-deep-sea-green" for="Fecha">Fecha de asignación</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Fecha" type="date" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} 
                        value={receta[0].fechaAsignacion.split('T')[0]}
                            onChange={(e) => handleInputChange(e.target.value, "fecha")}
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Diagnostico">Diagnóstico</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Diagnostico" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled={isEditable === false} value={receta[0].diagnostico}
                            onChange={(e) => handleInputChange(e.target.value, "diagnostico")}
                        />
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Doctor">Nombre doctor</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Doctor" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled 
                        value={receta[0].nombreMedico + " " + receta[0].paternoMedico + " " + receta[0].maternoMedico}
                            
                        />
                    </div>

                </div>

                <div className='flex justify-between'>
                    <div className="flex items-center w-1/4">
                        <label className="font-semibold text-base pl-3 text-deep-sea-green" for="Paciente">Paciente nombre</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input name="Paciente" type="text" className="shadow border-2 border-deep-sea-green w-full"  
                        value={receta[0].nombre + " " + receta[0].paterno + " " + receta[0].materno} disabled
                
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

                <h2 className="text-base mt-3 text-deep-sea-green font-semibold mb-3" style={{ borderBottom: "solid 0.1rem #0B5755" }}>Medicamentos</h2>
                <table class="table-fixed w-full border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            <th className="border border-slate-300">Medicamento</th>
                            <th className="border border-slate-300">Tiempo de tratamiento</th>
                            <th className="border border-slate-300">Dosificación</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        receta != null ?
                        receta.map(e => (
                            <tr>
                                <td className="border border-slate-300">{e.nombreComun}</td>
                                <td className="border border-slate-300">{e.tiempoTratamiento    }</td>
                                <td className="border border-slate-300">{e.dosificacion}</td>
                            </tr>
                        ))
                        
                        : <div>SIN MEDICAMENTOS</div>
                    }
                    </tbody>
                </table>
   

                <div className="flex justify-center mt-3">
                    <button 
                        className="button-primary w-1/4"
                        onClick={(e) => {
                            e.preventDefault()
                            setShowModal(true);
                        }} 
                    >
                       Añadir medicamento extra
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
            
            {showModal && <ModalAddExtraMed setOpenModal={setShowModal} recetaId={receta[0].idRegistroMedico}/>}
        </Fragment>
    );
}

export default RecetaDisplay;