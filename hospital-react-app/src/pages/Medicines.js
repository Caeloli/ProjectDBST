import React, { useState } from "react";
import NavDashboard from "../components/NavDashboard";
import MedicationList from "../components/MedicationList";

function Medicines() {

    const[medicinas, setMedicinas] = useState([
        { id: 1, nombre: 'Advil', nombreFarmaceutico: 'Ibuprofeno', precio: 60, dosisRecomendada: '5mg', fabricante: 'Haleon' },
        { id: 1, nombre: 'Advil', nombreFarmaceutico: 'Ibuprofeno', precio: 60, dosisRecomendada: '5mg', fabricante: 'Haleon' },
        { id: 1, nombre: 'Advil', nombreFarmaceutico: 'Ibuprofeno', precio: 60, dosisRecomendada: '5mg', fabricante: 'Haleon' },
    ]);


    return (
        <div className="flex w-screen h-screen">
            <NavDashboard />

            <div className="relative">
                <a href="/NewMedicine">
                    <button className="bg-green-500 hover:bg-green-700 hover:scale-110 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 mr-10 mt-6 transition-all transition-300 duration-300">
                        <i className="fas fa-circle-plus"></i>
                        Añadir
                    </button>
                </a>

                <div className="border-2  shadow-md rounded-3xl max-h-full h-full border-blue-hosta bg-white">
                    {/* <h3>Medical Supplies</h3> */}
                    <MedicationList isDashboard={false} medicinas={medicinas}> </MedicationList>
                </div>
            </div>
        </div>
    );
}

export default Medicines;