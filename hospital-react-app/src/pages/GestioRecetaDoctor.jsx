import React from "react";
import NavDashboard from "../components/NavDashboard";
import RecetaBook from "../components/RecetaBook";

function GestionRecetaDoctor() {

    return (
        <div className="flex w-screen h-screen">
            <NavDashboard />

            <div className="w-full">
                <div className="flex mt-6 justify-between p-4 items-center">
                    <header className="flex items-center">
                        <h2 className="font-bold text-xl text-gray-800 mb-1">
                            Recetas Médicas 
                        </h2>
                    </header>
                </div>
                <div className="bg-white" style={{height: "56rem"}}>
                    {/* <h3>Medical Supplies</h3> */}
                    <RecetaBook isDashboard={false} />
                </div>
            </div>
        </div>
    );
}

export default GestionRecetaDoctor;