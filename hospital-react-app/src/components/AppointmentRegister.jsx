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

    const [appointmentUpdate, setAppointmentUpdate] = useState({})

    const [patients, setPatients] = useState([]);
    const [medics, setMedics] = useState([]);
    const [hours, setHours] = useState([]);
    const [hour, setHour] = useState("");
    const [currentDoctor, setCurrentDoctor] =  useState({})
    const [contador, setContador] = useState(0)
    const [fechaValue, setFechaValue] = useState("")
    const [timeValue, setTimeValue] = useState("")

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
                console.log("Pacientes", patients)
            })
            .catch(error => {
                console.log("Error, no se logró obtener la lista de pacientes de la API");
            })

        fetch("https://localhost:44342/api/Doctor/GetAllDoctors", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setMedics(data.Data);
                console.log("medicos: ", medics);
            })
            .catch(error => {
                console.log("Error, no se logró obtener la lista de pacientes de la API");
            })
        if (isEdit) {
                fetch(`https://localhost:44342/api/Appointment/GetAppointmentById?piId=${parseInt(props.idPaciente)}`, {
                    method: "GET"
                })
                .then(response => response.json())
                .then(data => {
                        setAppointmentUpdate(data.Data[0])
                        setAppointment(data.Data[0])
                        console.log(data.Data[0])
                        // setCurrentDoctor(medics.find(medic => medic.idMedico === appointment.IdMedico))
                        fetch(`https://localhost:44342/api/Appointment/GetAvailableHours?psDate=${data.Data[0].Fecha.split("T")[0]}&psRFC=${data.Data[0].RFC}&piIdMedico=${data.Data[0].IdMedico}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                setHours(data.Data)
                                console.log(data);

                            })
                            .catch(error => {
                                console.log("Error, no se logró obtener la lista de horas");
                            })
                    })
                    .catch(error => {
                        console.log("Error al obtener datos de la cita", error);
                    })
        }

        

    }, [isEdit, props.id, props.idPaciente]);

    const getDoctorAvailableHours = () =>{
            setCurrentDoctor(medics.find(medic => medic.idMedico === appointment.IdMedico))
            console.log(medics)
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

    const patientsOptionSelect = patients.map(patient => ({
        value: parseInt(patient.idPaciente),
        label: `${patient.nombre} ${patient.paterno} ${patient.materno}`
    }));

    const medicsOptionSelect = medics.map(medic => ({
        value: parseInt(medic.idMedico),
        label: `Dr. ${medic.nombre} ${medic.paterno} ${medic.materno}`
    }));

    const handleInputChange = (value, inputName) => {
        console.log(inputName)
        if(inputName === 'Fecha'){
            getDoctorAvailableHours()
        }
        if(inputName === 'IdMedico'){
            setHours([])
        }
        setAppointment({
            ...appointment,
            [inputName]: value
        })
        if(inputName === 'Hora'){
            setHour(value)
            console.log(value)
        }
    }

    const validateAppointment = () => {
        const currentPatient = patients.find(patient => patient.idPaciente === appointment.IdPaciente)
        fetch(`https://localhost:44342/api/Appointment/ValidateAppointment?piId=${currentPatient.idPaciente}&fecha=${appointment.Fecha}&isEdit=${1}`, {
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
                    console.log(fecha)
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
                          navigate('/GestionCitasAdmin')
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

    const handleSubmit = (e) => {
        e.preventDefault();
        validateAppointment()
        
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
                            {
                                !isEdit ?

                                    <Select
                                        className="shadow border-2 border-deep-sea-green"
                                        name="IdPaciente"
                                        placeholder="Su Paciente..."
                                        options={patientsOptionSelect}
                                        onChange={(selectedOption) => handleInputChange(selectedOption.value, "IdPaciente")}
                                        isClearable
                                        // value={{value: appointment.IdPaciente, label: patients.find(patient => patient.idPaciente === appointment.IdPaciente) }}
        
                                        required
                                    />
                                    :

                                <Select
                                className="shadow border-2 border-deep-sea-green"
                                name="IdPaciente"
                                placeholder="Su Paciente..."
                                options={patientsOptionSelect}
                                value={{value: appointment.IdPaciente, label: appointmentUpdate.pNombre + ' ' + appointmentUpdate.pPaterno + " " + appointmentUpdate.pMaterno  }}
                                onChange={(selectedOption) => handleInputChange(selectedOption.value, "IdPaciente")}
                                isClearable
                                required
                            />
                            }
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-lg text-deep-sea-green" for="IdMedico">Médico</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            {
                                !isEdit ?
                                <Select
                                    className="shadow border-2 border-deep-sea-green"
                                    name="IdMedico"
                                    placeholder="Su Médico..."
                                    options={medicsOptionSelect}
                                    onChange={(selectedOption) => handleInputChange(selectedOption.value, "IdMedico")}
                                    isClearable
                                    // value={{value: appointment.IdMedico, label: medics.find(medic => medic.idMedico === appointment.IdMedico).nombre }}
                                    required
                                />
                                :
                                <Select
                                    className="shadow border-2 border-deep-sea-green"
                                    name="IdMedico"
                                    placeholder="Su Médico..."
                                    options={medicsOptionSelect}
                                    value={{value: appointment.IdMedico, label: appointmentUpdate.mNombre + " " + appointmentUpdate.pPaterno + " " + appointmentUpdate.mMaterno }}
                                    onChange={(selectedOption) => handleInputChange(selectedOption.value, "IdMedico")}
                                    isClearable
                                    required
                                />
                            }
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-lg text-deep-sea-green" for="Fecha">Fecha</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            {
                                !isEdit ?
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
                            />
                            }
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center w-1/4">
                            <label className="font-semibold text-lg text-deep-sea-green" for="Hora">Hora</label>
                        </div>
                        <div className="md:w-2/4 w-3/4">
                            {/* <input
                                name="Hora"
                                className="w-full shadow border-2 border-deep-sea-green"
                                type="time"
                                step="1800"
                            /> */}
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
                                value={appointment.Descripcion}
                                required
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