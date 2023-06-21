import React, { useEffect, useState } from 'react';
import NavDashboard from "../components/NavDashboard";
import AdminNavDashboard from '../components/admindash/AdminNavDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Calendar from "../components/Calendar";
import MedicationList from "../components/MedicationList";
import Table from "../components/Table";
import { useSelector } from 'react-redux';
import ReceiptRow from '../components/ReceiptRow';
import PatientDashboard from './PatientDashboard';
import PatientNavDashboard from '../components/patientdash/PatientNavDashboard';
function Receipt(){
    const userState = useSelector((store) => store.user);
    const [receipts, setReceipts] = useState([])

    useEffect(() => {
        fetch(`https://localhost:44342/api/Receipt/GetReceiptsByUser?piId=${userState.idPaciente}`, {
            method: "GET"
          })
            .then(response => response.json())
            .then(data => {
              setReceipts(data.Data)
            })
            .catch(error => {
              console.log("Error al obtener datos de citas", error);
            })
      
    }, [])

    return(
        <div>
            <PatientNavDashboard />
            
            {
                receipts != null ?
                    receipts.map(receipt => (
                        <ReceiptRow receipt={receipt} key={receipt.idRegistroMedico}></ReceiptRow>
                ))
                : <p>No tienes recetas</p> 
            } 
        
        </div>
    )

}

export default Receipt