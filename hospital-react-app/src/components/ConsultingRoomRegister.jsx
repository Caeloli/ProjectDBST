import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

function ConsultingRoomRegister(props) {

    const navigate = useNavigate();
    const isEdit = props.isEdit;
    const [room, setRoom] = useState({
        idConsultorio: "",
        estadoLimpieza: ""
    })
    const [optionsDoctors, setOptionsDoctors] = useState([]);

    useEffect(() => {
        // fetch("https://api.jsonserver.io/api/Doctor/GetAllDoctors", {
        //     method: "GET",
        //     mode: 'cors',
        //     headers: {
        //         'X-Jsio-Token': '8ecc882dae5b1f14d3e86662a9dddb60 '
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("Fetch a GetAllDoctors");
        //         console.log(data.Data);
        //         const options = (data.Data).map(medic => ({
        //             value: medic[0].idMedico,
        //             label: `${medic[0].nombre} ${medic[0].paterno} ${medic[0].materno}`
        //         }));
        //         setOptionsDoctors(options);
        //     })
        //     .catch(error => {
        //         // Manejo de errores en caso de que la solicitud falle
        //     });
        if (isEdit) {
            fetch(`https://localhost:44342/api/Office/GetOfficeById?piId=${parseInt(props.id)}`, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.Data[0])
                    setRoom(data.Data[0])
                })
                .catch(error => {
                    console.log("Error al obtener datos del consultorio", error);
                })
        }
    }, [isEdit, props.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            let roomUpdate = {}
            roomUpdate = room
            roomUpdate['idConsultorio'] = parseInt(props.id)
            console.log(room);
            fetch(`https://localhost:44342/api/Office/UpdateOffice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(roomUpdate)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Consultorio editado correctamente", data.Data);
                    navigate('/GestionConsultorio')
                })
                .catch(error => {
                    console.log("Error al editar el consultorio", error);
                });
        } else {
            fetch(`https://localhost:44342/api/Office/AddOffice?piLimpieza=${room.estadoLimpieza}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Consultorio agregado correctamente", data.Data);
                    navigate('/GestionConsultorio')
                })
                .catch(error => {
                    console.log("Error al agregar el consultorio", error);
                });
        }
    }

    const handleInputChange = (value, inputName) => {
        setRoom({
            ...room,
            [inputName]: value
        });
    }

    const roomCleanStatus = [
        { value: true, label: "Limpio" },
        { value: false, label: "Sucio" }
    ]

    return (
        <div className="consulting-register w-full p-4 h-screen">
            <div className="flex justify-between items-center mx-auto mt-5 bg-deep-sea-green shadow rounded-lg h-32 px-5">
                <div className="logo flex flex-col items-center">
                    <div className="bg-aqua-squeeze rounded-full flex justify-center items-center">
                        <FontAwesomeIcon className="p-7 text-4xl text-deep-sea-green" icon={faPlus} />
                    </div>
                    <h3 className="text-xl font-bold text-aqua-squeeze">Infinita HealthCare</h3>
                </div>
                <div className="title flex">
                    <h2 className="font-bold text-4xl text-aqua-squeeze">
                        {isEdit ? "Modificación Consultorio" : "Registro Consultorio"}
                    </h2>
                </div>
                <div className="info-hospital text-right text-aqua-squeeze">
                    <h3 className="text-lg font-bold">Hospital Infinita Care</h3>
                    <p className="text-sm">135 Camino del Esfuerzo, Campestre Aragón, <br></br>Gustavo A. Madero, Ciudad de México</p>
                    <p className="text-xs">exame@example.com</p>
                    <p className="text-xs">www.example.com</p>
                    <p className="text-xs">(+52) 55231234543</p>
                </div>
            </div>

            <div className="consultingRoom-form w-3/4 mx-auto mt-10 h-3/4">
                <form className="h-full flex flex-col justify-between" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 h-full mb-8 gap-2">
                        <div className="col-span-2 h-full mr-2">
                            <h3 className="text-deep-sea-green text-2xl mb-3font-bold border-b-deep-sea-green" style={{ borderBottom: 'solid 0.3rem #0B5755' }}>Datos Generales</h3>
                            <div className="flex flex-col justify-evenly h-full">
                                {isEdit && (
                                    <div className="flex justify-between">
                                        <div className="flex items-center w-1/4">
                                            <label className="font-semibold text-lg text-deep-sea-green" for="IdPaciente">Número de Consultorio</label>
                                        </div>
                                        <div className="md:w-2/4 w-3/4">
                                            <input
                                                name="idConsultorio"
                                                type="text"
                                                className="shadow border-2 border-deep-sea-green w-full py-2"
                                                disabled
                                                value={props.id} />
                                        </div>
                                    </div>
                                )
                                }
                                {/* <div className="flex justify-between">
                                    <div className="flex items-center w-1/4">
                                        <label className="font-semibold text-lg text-deep-sea-green" for="nombre">Médico</label>
                                    </div>
                                    <div className="md:w-2/4 w-3/4">
                                        <Select
                                            className="shadow border-2 border-deep-sea-green"
                                            placeholder="Médico Seleccionado..."
                                            options={optionsDoctors}
                                            onChange={(selectedOption) => handleInputChange(selectedOption.value, "idMedico")}
                                            required
                                        />
                                    </div>
                                </div> */}

                                <div className="flex justify-between">
                                    <div className="flex items-center w-1/4">
                                        <label className="font-semibold text-lg text-deep-sea-green" for="infoRegistro">Estado de Limpieza</label>
                                    </div>
                                    <div className="md:w-2/4 w-3/4">
                                        <Select
                                            className="shadow border-2 border-deep-sea-green"
                                            placeholder="Estado de limpieza"
                                            defaultValue={{ value: true, label: "Limpio" }}
                                            options={[
                                                { value: true, label: "Limpio" },
                                                { value: false, label: "Sucio" }
                                            ]}
                                            onChange={(selectedOption) => handleInputChange(selectedOption.value, "estadoLimpieza")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right mb-5 w-full flex justify-evenly">
                        <button type="submit" className="button-primary w-1/4">{props.isEdit ? 'Editar' : 'Agregar'}</button>
                        <a href="/GestionFabricantes" className="text-center button-primary w-1/4">Cancelar</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ConsultingRoomRegister;