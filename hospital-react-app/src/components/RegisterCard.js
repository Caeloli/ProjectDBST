import React, { useState } from "react";
import DoctorRegister from "./DoctorRegister";
import PatientRegister from "./PatientRegister";
import AdminRegister from "./AdminRegister";

function RegisterCard(){
    // constructor(props) {
    //     super(props);
    // }

    const [selectedOption, setSelectedOption] = useState('')

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };

        return (
       

            <div>
                <div className="flex justify-center mb-28 mt-6">
                            <div className="flex items-center w-1/4">
                                <label for="Usuario">Tipo de usuario</label>
                            </div>
                            <div className="flex flex-col md:w-2/4 w-3/4 h-auto">
                                <select value={selectedOption} onChange={handleChange} class="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green">
                                    <option value="">Seleccionar opción</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Medico">Medico</option>
                                    <option value="Paciente">Paciente</option>
                                </select>
                            </div>
                         </div>

                { selectedOption === 'Administrador' && (
                    <AdminRegister />
                )}

                { selectedOption === 'Paciente' && (
                    <PatientRegister />
                )}  

                { selectedOption === 'Medico' && (
                    <DoctorRegister />
                )}  
                
            </div>

           
        );
}

export default RegisterCard;