import React, { useState, useEffect } from "react";
import PatientMenuDesktop from "../components/patientdash/PatientMenuDesktop";
import imagen from '../assets/imgs/Cita.png'
import { useLocation, useNavigate } from "react-router-dom";

function AppointmentForm() {
    const location = useLocation();
    const [doctors, setDoctors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [appointment, setAppointment] = useState({
        Descripcion: "",
        Fecha: "",
        IdMedico: "",
        IdPaciente: ""
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const isEdit = searchParams.get("edit") === "true";
        const AppointmentId = searchParams.get("IdCita");

        setIsEditing(isEdit);
        if(isEdit && AppointmentId) {
            fetch(`https://localhost:44342/api/Appointment/GetAppointmentByPatient?piId=${AppointmentId}`, {
            method: "GET"
            })
            .then(response => response.json())
            .then(data => {
            console.log(data.Data[0])
            setAppointment(data.Data[0])
            })
            .catch(error => {
            console.log("Error al obtener datos del medicamento", error);
            })
        }

        fetch("https://localhost:44342/api/Doctor/GetAllDoctors", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setDoctors(data);
            })
            .catch(error => {
                console.log("Error al obtener la lista de doctores", error);
            });


    },[]);

    const handleInputChange = (e) => {
        if (e.target.name === "datetime") {
            setAppointment({
                ...appointment,
                Fecha: e.target.value,
            });
        } else {
            setAppointment({
                ...appointment,
                [e.target.name]: e.target.value,
            });
        }
    };

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        appointment.AppointmentId = parseInt(appointment.AppointmentId);
        //conexión con la base de datos y guardar la cita

        if (isEditing) {
            const searchParams = new URLSearchParams(location.search);
            let CitaUpdate = {}
            CitaUpdate = appointment
            CitaUpdate['IdCita'] = parseInt(searchParams.get("IdCita"))
            console.log(CitaUpdate)
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
        }else {
            fetch("https://localhost:44342/api/Appointment/AddAppointment", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(appointment)
            })
            .then(response => response.json())
            .then(data => {
            console.log("Cita agendada correctamente", data);
            navigate('/PatientDashboard')
            })
            .catch(error => {
            console.log("Error al agendar la cita", error);
            });
        }

        //console.log("Cita guardada correctamente", appointment);
    };

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

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
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccione un doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.IdMedico} value={doctor.IdMedico}>
                                    {doctor.name}
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
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="datetime" className="block font-semibold">
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
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {isEditing ? "Editar" : "Agendar"}
                        </button>
                        <a href="/PatientDashboard" className="button-primary w-1/4">Cancelar</a>
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
