import React, { useState, useEffect } from "react";
import AdminNavDashboard from "../components/admindash/AdminNavDashboard";
import PatientsList from "../components/PatientsList";
import LogBook from "../components/LogBook";

function GestionBitacora() {

    return (
        <div className="flex w-screen h-screen">
            <AdminNavDashboard />

            <div className="w-full">
                <div className="flex mt-6 justify-between p-4 items-center">
                    <header className="flex items-center">
                        <h2 className="font-bold text-xl text-gray-800 mb-1">
                            Bitácora
                        </h2>
                    </header>
                </div>
                <div className="bg-white" style={{height: "56rem"}}>
                    {/* <h3>Medical Supplies</h3> */}
                    <LogBook isDashboard={false} />
                </div>
            </div>
        </div>
    );
}

export default GestionBitacora;