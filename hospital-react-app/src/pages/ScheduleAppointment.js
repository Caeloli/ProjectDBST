import React, { useState, useEffect } from "react";
import PatientMenuDesktop from "../components/patientdash/PatientMenuDesktop";
import imagen from '../assets/imgs/Cita.png'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AppointmentForm() {
    const location = useLocation();
    const [doctors, setDoctors] = useState([]);
    const [hours, setHours] = useState([]);
    const [hour, setHour] = useState("");
    const [currentDoctor, setCurrentDoctor] =  useState({})
    const userState = useSelector((store) => store.user);
    const [isEdit, setIsEdit] = useState(false);
    const [appointment, setAppointment] = useState({
        Descripcion: "",
        Fecha: "",
        IdMedico: "",
        IdPaciente: ""
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const isEdit = searchParams.get("edit") === "true";
        const AppointmentId = searchParams.get("id");

        setIsEdit(isEdit);
        console.log(AppointmentId)
        if(isEdit && AppointmentId) {
            fetch(`https://localhost:44342/api/Appointment/GetAppointmentById?piId=${AppointmentId}`, {
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

        fetch("https://localhost:44342/api/Doctor/GetAllDoctors", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setDoctors(data.Data);
            })
            .catch(error => {
                console.log("Error al obtener la lista de doctores", error);
            });


    },[]);
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

    const getDoctorAvailableHours = () =>{
        console.log(currentDoctor)
        // console.log(appointment)
    fetch(`https://localhost:44342/api/Appointment/GetAvailableHours?psDate=${appointment.Fecha}&psRFC=${currentDoctor.RFC}&piIdMedico=${currentDoctor.idMedico}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            setHours(data.Data)
            console.log(data.Data);
        })
        .catch(error => {
            console.log("Error, no se logró obtener la lista de horas");
        })
}

const handleInputChange = (value, inputName) => {
    console.log(inputName)
    setAppointment({
        ...appointment,
        [inputName]: value
    })
    if(inputName === 'Fecha'){
        getDoctorAvailableHours()
    }
    if(inputName === 'IdMedico'){
        setHours([])
    }
    if(inputName === 'Hora'){
        setHour(value)
        console.log(value)
    }
    setCurrentDoctor(doctors.find(medic => medic.idMedico == appointment.IdMedico))

    console.log(doctors.find(medic => medic.idMedico == appointment.IdMedico))
    console.log(doctors)
}

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        validateAppointment()
        // appointment.AppointmentId = parseInt(appointment.AppointmentId);
        // //conexión con la base de datos y guardar la cita

        // if (isEdit) {
        //     const searchParams = new URLSearchParams(location.search);
        //     let CitaUpdate = {}
        //     CitaUpdate = appointment
        //     CitaUpdate['IdCita'] = parseInt(searchParams.get("IdCita"))
        //     console.log(CitaUpdate)
        //     fetch(`https://localhost:44342/api/Appointment/UpdateAppointment`, {
        //         method: "POST",
        //         headers: {
        //         "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(appointment)
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //     console.log("Cita editada correctamente", data.Data);
        //     navigate('/Appointment')
        //     })
        //     .catch(error => {
        //     console.log("Error al editar la cita", error);
        //     });
        // }else {
        //     fetch("https://localhost:44342/api/Appointment/AddAppointment", {
        //         method: "POST",
        //         headers: {
        //         "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(appointment)
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //     console.log("Cita agendada correctamente", data);
        //     navigate('/Appointment')
        //     })
        //     .catch(error => {
        //     console.log("Error al agendar la cita", error);
        //     });
        // }

        //console.log("Cita guardada correctamente", appointment);
    };

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };
    const validateAppointment = () => {
        fetch(`https://localhost:44342/api/Appointment/ValidateAppointment?piId=${userState.idPaciente}&fecha=${appointment.Fecha}&isEdit=${1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.StatusCode === 200){
                    const fecha = appointment.Fecha + " " + hour
                    appointment.Fecha = fecha
                    appointment.IdPaciente = userState.idPaciente
                    console.log(fecha)
                    if (isEdit) {
                        const searchParams = new URLSearchParams(location.search);
                        appointment.IdCita = searchParams.get("id");
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
                                navigate('/PatientDashboard')
                            })
                            .catch(error => {
                                console.log("Error al editar la cita", error);
                            });
                    } else {
                        fetch("https://localhost:44342/api/Appointment/AddAppointment", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(appointment)
                      })
                      .then(response => response.json())
                      .then(data => {
                          console.log("Cita guardada correctamente", data.Data);
                          navigate('/PatientDashboard')
                      })
                      .catch(error => {
                          console.log("Error al guardar la cita", error);
                      });
                    }
                }else{
                    alert(data.Message)
                }
            })
            .catch(error => {
                console.log("Error, no se logró validar la cita");
            })
    }

    return (
        <div className="flex w-screen h-screen">
            <PatientMenuDesktop />
            <div className="flex justify-center items-center w-full h-full ">
                <form
                    className="w-1/2 max-w-md bg-white p-8 shadow-md rounded-lg border-2 border-green-200"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-2xl font-bold mb-4">Agendar Cita</h2>

                    <div className="mb-4">
                        <label htmlFor="IdMedico" className="block font-semibold">
                            Doctor:
                        </label>
                        <select
                            id="IdMedico"
                            name="IdMedico"
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                            value={appointment.IdMedico}
                            onChange={(e) => handleInputChange(e.target.value, "IdMedico")}
                            required
                        >
                            <option value="">Seleccione un doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.idMedico} value={doctor.idMedico}>
                                    {doctor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Descripcion" className="block font-semibold">
                            Descripción:
                        </label>
                        <textarea
                            id="Descripcion"
                            name="Descripcion"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 h-40 resize-none"
                            value={appointment.Descripcion}
                            onChange={(e) => handleInputChange(e.target.value, "Descripcion")}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        {/* <label htmlFor="datetime" className="block font-semibold">
                            Fecha y Hora:
                        </label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            name="datetime"
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                            value={appointment.Fecha}
                            min={getTomorrowDate()}
                            onChange={handleInputChange}
                            required
                        /> */}
                               { !isEdit ?
                                    <input
                                        name="Fecha"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        type="date"
                                        min={getCurrentDate()}
                                        max={getMaxDate()}
                                        onChange={(e) => handleInputChange(e.target.value, "Fecha")}
                                        // value = {appointment.Fecha.split("T")[0]}
                                        required
                                    />
                                :
                                <input
                                name="Fecha"
                                className="w-full shadow border-2 border-deep-sea-green"
                                type="date"
                                min={getCurrentDate()}
                                max={getMaxDate()}
                                value = {appointment.Fecha.split('T')[0]}
                                onChange={(e) => handleInputChange(e.target.value, "Fecha")}
                                required
                            />}
                    </div>
                    <div className="mb-4">
                    {
                                !isEdit ?
                                    <select name="Hora" class="w-full shadow border-2 border-deep-sea-green" 
                                        onChange={(e) => handleInputChange(e.target.value, "Hora")}
                                        required
                                        // value = {appointment.Fecha.split("T")[1].split(":").slice(0, 2).join(":")}
                                        >
                                        <option value="">Horas disponibles</option>
                                        {hours != null ? hours.map((option, index) => (
                                            <option key={index} value={option.Hora}>{option.Hora}</option>)) : <option disabled>Sin horas</option>
                                        }
                                    </select>
                                :
                                <select name="Hora" class="w-full shadow border-2 border-deep-sea-green" 
                                        value = {appointment.Fecha.split("T")[1]}
                                        onChange={(e) => handleInputChange(e.target.value, "Hora")}
                                        required
                                        >
                                        <option value="">Horas disponibles</option>
                                        <option value={appointment.Fecha.split("T")[1]}>{appointment.Fecha.split("T")[1]}</option>
                                        {hours != null ? hours.map((option, index) => (
                                            <option key={index} value={option.Hora}>{option.Hora}</option>)) : <option disabled>Sin horas</option>
                                        }
                                    </select>
                            }
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {isEdit ? "Editar" : "Agendar"}
                        </button>
                        <a href="/Appointment" className="button-primary w-1/4">Cancelar</a>
                    </div>
                </form>

                <div className="w-1/2 border-2 border-green-500 shadow-m rounded-lg h-[520px] flex justify-center items-center bg-deep-sea-green">
                    <img
                        src={imagen}
                        alt="Imagen"
                        className="w-[350px] h-[550px]  object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

export default AppointmentForm;
