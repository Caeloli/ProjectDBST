import React, { useState, useEffect} from 'react';
import PatientNavDashboard from '../components/patientdash/PatientNavDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Table from "../components/Table";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';


const Appointment = () => {
  const [pendingAppointment, setPendingAppointment] = useState(null);

  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pacienteId = searchParams.get("Id");
  const [patientInfo, setPatientInfo] = useState([]);
  const userState = useSelector((store) => store.user);

  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [pendingAppointmentId, setPendingAppointmentId] = useState(null);


  useEffect(() => {

    // Datos Paciente con PacienteId, cambiar RUTA si es necesario
    fetch(`https://localhost:44342/api/Patient/GetPatientById?piId=${userState.idPaciente}`, {
      method: "GET",
        })
          .then(response => response.json())
          .then(data => {
          setPatientInfo(data.Data[0]);
        })
          .catch(error => {
          console.log("Error al obtener los datos del paciente", error);
      });

      // OObtener las citas del paciente con el pacienteId
    fetch(`https://localhost:44342/api/Appointment/GetAppointmentsByPatient?piId=${userState.idPaciente}`, {
      method: "GET"
      })
        .then(response => response.json())
        .then(data => {
        setAppointments(data.Data);

        const currentDate = new Date(); // Obtiene la fecha y hora actual
        //const pendingCita = data.find(appointment => appointment.Fecha > currentDate);
        const pendingCita = data.Data.find(appointment => new Date(appointment.Fecha) > currentDate);
        // Busca una cita en la lista de citas del paciente donde la fecha sea posterior a la fecha actual
        //para tomarla como una cita que no ha sido realizada
        setPendingAppointment(pendingCita);

        // Si se encontró una cita pendiente
        if (pendingCita) {
          // Obtener los datos del médico asociado a la cita pendiente
          fetch(`https://localhost:44342/api/Doctor/GetDoctorById?piId=${pendingCita.IdMedico}`, {
            method: "GET"
          })
            .then(response => response.json())
            .then(data => {
              console.log(data.Data)
              setDoctor(data.Data[0]);
            })
            .catch(error => {
              console.log("Error al obtener los datos del médico", error);
            });
    
            setPendingAppointmentId(pendingCita.IdCita); // Obtener el ID de la cita pendiente
        }


      })
        .catch(error => {
        console.log("Error al obtener la cita del paciente", error);
    });

    
  }, []);

  const handleCancel = (appointmentId) => {
    console.log(appointmentId);
    console.log(new Date().toLocaleString());
    fetch(`https://localhost:44342/api/Appointment/DeleteAppointment?piId=${appointmentId}&piIdPaciente=${userState.idPaciente}`, {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            if(data.StatusCode === 200){
                alert(data.Message)
            }else{
                alert(data.Message)
            }
        })
            .catch(error => {
                console.error("Error al borrar la cita:", error);
            });
  };

  const headerTitle = "Tienes una cita pendiente";
  const headerTable = ["Folio","Paciente", "Doctor","Fecha - Hora", "Consultorio", "Editar Cita", "Cancelar Cita"];
  let tableInfo = [];

if (pendingAppointment) {
  const citaDateTime = new Date(pendingAppointment.Fecha); // Obtener la fecha y hora de la cita pendiente
  const citaFecha = citaDateTime.toLocaleDateString(); // Obtener solo la fecha
  const citaHora = citaDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Obtener solo la hora
      tableInfo = [
        [ pendingAppointment.IdCita,
          patientInfo?.nombre + " " + patientInfo?.paterno + " " + patientInfo?.materno,
          doctor?.nombre + " " + doctor?.paterno + " " + doctor?.materno,
          `${citaFecha} - ${citaHora}`,
          doctor?.idConsultorio,
          <Link to={`/AppointmentForm?edit=true&id=${pendingAppointmentId}`}>
            <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faPenToSquare} style={{ color: "#545454", }} />
          </Link>,
          <a href="/Appointment" onClick={() => handleCancel(pendingAppointmentId)}>
            <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faTrash} style={{ color: "#ff0000", }} />
          </a>
        ]
      ];
    }

  return (
    <div className="flex w-screen h-screen">
      <PatientNavDashboard />
      <div className="w-full p-2 flex justify-center items-center bg-aqua-squeeze">
        {pendingAppointment ? (
          <div className="w-11/12 flex flex-col h-full ">
          <div className="title flex justify-between my-9">
                        <div className="w-1/2 background-green-blue-gradient flex flex-col justify-between p-4 rounded-2xl text-white">
                            <h2 className="font-bold text-2xl">Cita Actual</h2>
                        </div>
            </div>
            <div className="panels grid grid-cols-1 gap-9 h-64">
                <div className="appointments col-span-1">
                <Table headerTitle={headerTitle} headerTable={headerTable} tableInfo={tableInfo} />
                </div>
            </div>
          </div>  
        ) : (
            <div className="w-11/12 flex flex-col h-full">
            <div className="title flex justify-between my-9">
                        <div className="w-1/2 background-green-blue-gradient flex flex-col justify-between p-4 rounded-2xl text-white">
                            <h2 className="font-bold text-2xl">Agenda una nueva cita</h2>
                        </div>
            </div>
            <div className="relative">
                <a href="/AppointmentForm">
                    <button  className="bg-green-500 hover:bg-green-700 hover:scale-110 text-white font-bold py-2 px-4 rounded absolute top-0 mr-10 mt-6 transition-all transition-300 duration-300">
                        <i className="fas fa-circle-plus"></i>
                        Agendar cita
                    </button>
                </a>
            </div>
          </div> 
        )}
      </div>
    </div>
  );
};


export default Appointment;
