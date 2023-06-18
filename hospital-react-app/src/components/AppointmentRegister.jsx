import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
//props: isEdit, id
function AppointmentRegister(props) {
    const navigate = useNavigate();
    const isEdit = props.isEdit
    const [appointment, setAppointment] = useState({
        IdCita: "",
        IdPaciente: "",
        IdMedico: "",
        Fecha: "",
        Descripcion: ""
    });

    const [patients, setPatients] = useState([]);
    const [medics, setMedics] = useState([]);

    useEffect(() => {
        if (isEdit) {
            fetch(`api/Appointment/GetAppointmentByAppointment?piId=${parseInt(props.id)}`, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.Data[0])
                    setAppointment(data.Data[0])
                })
                .catch(error => {
                    console.log("Error al obtener datos de la cita", error);
                })
        }

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

        fetch("https://api.jsonserver.io/api/Doctor/GetAllDoctors", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-Jsio-Token': '8ecc882dae5b1f14d3e86662a9dddb60'
            }
        })
            .then(response => response.json())
            .then(data => {
                setMedics(data.Data);
                console.log("Medico" + data.Data);
            })
            .catch(error => {
                console.log("Error, no se logró obtener la lista de pacientes de la API");
            })

    }, [isEdit, props.id]);

    const patientsOptionSelect = patients.map(patient => ({
        value: parseInt(patient[0].idPaciente),
        label: `${patient[0].nombre} ${patient[0].paterno} ${patient[0].materno}`
    }));

    const medicsOptionSelect = medics.map(medic => ({
        value: parseInt(medic[0].idMedico),
        label: `Dr. ${medic[0].nombre} ${medic[0].paterno} ${medic[0].materno}`
    }));

    const handleInputChange = (value, inputName) => {
        setAppointment({
            ...appointment,
            [inputName]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            appointment.IdCita = parseInt(props.id);
            fetch(`https://localhost:44342/api/Appointment/UpdateAppointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(appointment)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Cita editada correctamente", data.Data);
                    navigate('/GestionCitasAdmin')
                })
                .catch(error => {
                    console.log("Error al editar la cita", error);
                });
        } else {
            fetch("https://localhost:44342/api/Provider/AddProvider", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(appointment)
          })
          .then(response => response.json())
          .then(data => {
              console.log("Cita guardada correctamente", data.Data);
              navigate('/GestionCitasAdmin')
          })
          .catch(error => {
              console.log("Error al guardar la cita", error);
          });
        }
    }

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const year = maxDate.getFullYear();
        const month = (maxDate.getMonth() + 1).toString().padStart(2, '0');
        const day = maxDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };




    return (
        <div className="appointment-register w-full p-4 h-screen">
            <div className="flex justify-between items-center mx-auto mt-5 bg-deep-sea-green shadow rounded-lg h-32 px-5">
                <div className="logo flex flex-col items-center">
                    <div className="bg-aqua-squeeze rounded-full flex justify-center items-center">
                        <FontAwesomeIcon className="p-7 text-4xl text-deep-sea-green" icon={faPlus} />
                    </div>
                    <h3 className="text-xl font-bold text-aqua-squeeze">Infinita HealthCare</h3>
                </div>
                <div className="title flex">
                    <h2 className="font-bold text-4xl text-aqua-squeeze">
                        {isEdit ? "Modificación Registro" : "Creación Registro"}
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


            <div className="appointment-form w-1/2 mx-auto mt-10 h-3/4">
                <form className="h-3/4 flex flex-col justify-between" onSubmit={handleSubmit}>
                    {isEdit && (
                        <div className="flex justify-between">
                            <div className="flex items-center w-1/4">
                                <label className="font-semibold text-lg text-deep-sea-green" for="IdPaciente">Número de Cita</label>
                            </div>
                            <div className="md:w-2/4 w-3/4">
                                <input name="IdCita" type="text" className="shadow border-2 border-deep-sea-green w-full" disabled value={props.id} />
                            </div>
                        </div>
                    )
                    }


                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-lg text-deep-sea-green" for="IdPaciente">Paciente</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <Select
                                className="shadow border-2 border-deep-sea-green"
                                name="IdPaciente"
                                placeholder="Su Paciente..."
                                options={patientsOptionSelect}
                                onChange={(selectedOption) => handleInputChange(selectedOption.value, "IdPaciente")}
                                isClearable
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-lg text-deep-sea-green" for="IdMedico">Médico</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <Select
                                className="shadow border-2 border-deep-sea-green"
                                name="IdMedico"
                                placeholder="Su Médico..."
                                options={medicsOptionSelect}
                                onChange={(selectedOption) => handleInputChange(selectedOption.value, "IdMedico")}
                                isClearable
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-lg text-deep-sea-green" for="Fecha">Fecha</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input
                                name="Fecha"
                                className="w-full shadow border-2 border-deep-sea-green"
                                type="date"
                                min={getCurrentDate()}
                                max={getMaxDate()}
                                onChange={(e) => handleInputChange(e.target.value, "Fecha")}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-lg text-deep-sea-green" for="Hora">Hora</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <input
                                name="Hora"
                                className="w-full shadow border-2 border-deep-sea-green"
                                type="time"
                                step="1800"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-lg text-deep-sea-green" for="Descripcion">Descripción</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            <textarea
                                name="Descripcion"
                                className="w-full shadow border-2 border-deep-sea-green"
                                placeholder="Descripción de la cita..."
                                onChange={(e) => handleInputChange(e.target.value, "Descripcion")}
                            >

                            </textarea>
                        </div>
                    </div>
                    <div className="text-right mb-5 w-full flex justify-evenly">
                        <button type="submit" className="button-primary w-1/4">{props.isEdit ? 'Editar' : 'Agregar'}</button>
                        <a href="/GestionCitasAdmin" className="text-center button-primary w-1/4">Cancelar</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AppointmentRegister;