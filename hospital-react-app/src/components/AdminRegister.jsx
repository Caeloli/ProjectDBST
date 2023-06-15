import React from "react"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminRegister(){


    return(
        <div className="register-card h-screen flex flex-col justify-around">
        <div className="w-4/5 flex justify-between mx-auto mt-5">
            <div className="logo flex flex-col items-center">
                <div className="bg-deep-sea-green w-32 h-32 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon className="text-white text-8xl" icon={faPlus} />
                </div>
                <h3 className="text-xl font-bold text-deep-sea-green">Infinita HealthCare</h3>
            </div>
            <div className="info-hospital text-right">
                <h3 className="text-xl font-bold">Hospital Infinita Care</h3>
                <p className="text-base">135 Camino del Esfuerzo, Campestre Aragón, <br></br>Gustavo A. Madero, Ciudad de México</p>
                <p className="text-sm">exame@example.com</p>
                <p className="text-xs">www.example.com</p>
                <p className="text-xs">(+52) 55231234543</p>
            </div>
        </div>
        <form className="text-gray-700 flex flex-col items-center flex-1" method="POST" action="https://localhost:44342/Help/Api/POST-api-Patient-AddPatient">
            <h2 className="text-3xl text-center font-semibold mb-10 pb-5 border-b-gray-500 border-b w-full">Registro de Nuevo Administrador</h2>
            <div className="w-3/5 flex-1 flex flex-col justify-between">
                <div className="dob-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="RFC">RFC</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" type="text" id="RFC" name="RFC" placeholder="RFC" required></input>
                    </div>
                </div>
                <div className="name-input flex justify-between w-full">
                    <div className="flex items-center w-1/4">
                        <label for="Nombre">Nombres</label>
                    </div>
                    <div className="flex justify-between md:w-2/4 w-3/4">
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Nombre" name="Nombre" placeholder="Nombre"></input>
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="SegundoNombre" name="SegundoNombre" placeholder="Segundo nombre"></input>
                    </div>
                </div>
                <div className="name-input flex justify-between w-full">
                    <div className="flex items-center w-1/4">
                        <label for="Paterno">Apellidos</label>
                    </div>
                    <div className="flex justify-between md:w-2/4 w-3/4">
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Paterno" name="Paterno" placeholder="Apellido Paterno"></input>
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Materno" name="Materno" placeholder="Apellido Materno"></input>
                    </div>
                </div>
                <div className="dob-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="Salario">Salario</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" type="number" id="Salario" name="Salario" placeholder="Salario" required></input>
                    </div>
                </div>
                {/*}
                <div className="sex-input flex justify-between w-full">
                    <div className="flex items-center w-1/4">
                        <label for="sex">Sexo</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                    <select className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="sex" name="sex">
                    <option value="h">Masculino</option>
                    <option value="m">Femenino</option>
                    </select>
                    </div>
                    </div>
                */}
                <div className="phone-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="phone">Teléfono</label>
                    </div>
                    <div className="flex flex-col md:w-2/4 w-3/4">
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="phone" name="phone" placeholder="Teléfono" type="number"></input>
                    </div>
                </div>
                <div className="dob-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="FechaNacimiento">Fecha de Nacimiento</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" type="date" id="FechaNacimiento" name="FechaNacimiento" placeholder="Fecha de Nacimiento"></input>
                    </div>
                </div>
                <div className="email-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="Email">Email</label>
                    </div>
                    <div className="md:w-2/4 w-3/4">
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Email" name="Email" placeholder="Correo Electrónico"></input>
                    </div>
                </div>
                <div className="address-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="Calle">Dirección</label>
                    </div>
                    <div className="flex flex-col md:w-2/4 w-3/4">
                        <div className="flex">
                            <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Estado" name="Estado" placeholder="Estado"></input>
                            <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Municipio" name="Municipio" placeholder="Municipio"></input>
                        </div>
                        <div className="flex">
                            <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Colonia" name="Colonia" placeholder="Colonia"></input>
                            <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Calle" name="Calle" placeholder="Calle"></input>
                        </div>
                        <div className="flex">
                            <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="NoInterior" name="NoInterior" placeholder="No. Interior"></input>
                            <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="NoExterior" name="NoExterior" placeholder="No. Exterior"></input>
                        </div>
                        <div className="flex">
                            <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Cp" name="Cp" placeholder="Código Postal"></input>
                        </div>
                    </div>
                </div>
                {/*}
                <div className="conditions-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="conditions">Padecimientos</label>
                    </div>
                    <div className="flex flex-col md:w-2/4 w-3/4">
                        <textarea className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="conditions" name="conditions" placeholder="Descripción de padecimientos"></textarea>
                    </div>
                </div>
                <div className="allergies-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="allergies">Alergias</label>
                    </div>
                    <div className="flex flex-col md:w-2/4 w-3/4">
                        <textarea className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="allergies" name="allergies" placeholder="Alergias comunes"></textarea>
                        </div>
                        </div>
                */}
                 
                <div className="password-input flex justify-between">
                    <div className="flex items-center w-1/4">
                        <label for="Titulacion">Estudios</label>
                    </div>
                    <div className="flex flex-col md:w-2/4 w-3/4">
                        <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Titulacion" name="Titulacion" type="text" placeholder="Grado de estudios"></input>
                    </div>
                </div>
                <div className="block text-right mb-5">
                    <button type="submit" className="button-primary w-1/4">Registrarse</button>
                </div>
            </div>
        </form>
    </div>
    )
}

export default AdminRegister