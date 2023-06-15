import React, { useState, useEffect } from "react"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function PatientRegister(props){
    const navigate = useNavigate()
    const [direccionId, setDireccionId] = useState(0)
    const [paciente, setPaciente] = useState({
        nombre: "",
        paterno:"",
        materno: "",
        fechaNacimiento: "",
        email: "",
        password: "",
        telefono: "",
        estado: "",
        colonia: "",
        municipio: "",
        calle: "",
        noExterior: "",
        noInterior: "",
        cp: "",
      });

      useEffect(() => {
        console.log(props.isEdit, props.id)
        if(props.isEdit && props.id) {
          fetch(`https://localhost:44342/api/Patient/GetPatientById?piId=${parseInt(props.id)}`, {
            method: "GET"
          })
            .then(response => response.json())
            .then(data => {
              console.log(data.Data[0])
              setDireccionId(data.Data[0].idDireccion)
              setPaciente(data.Data[0])
            })
            .catch(error => {
              console.log("Error al obtener datos del paciente", error);
            })
        }
    
      }, []);

      const handleInputChange = (e) => {
        setPaciente({
          ...paciente,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        paciente.noInterior = parseInt(paciente.noInterior);
        paciente.noExterior = parseFloat(paciente.noExterior);
        if (props.isEdit) {
          let pacienteUpdate = {}
          pacienteUpdate = paciente
          pacienteUpdate['Id'] = parseInt(props.id)
          pacienteUpdate['IdDireccion'] = parseInt(direccionId)
          console.log(pacienteUpdate)
          fetch(`https://localhost:44342/api/Patient/UpdatePatient`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(paciente)
          })
            .then(response => response.json())
            .then(data => {
              console.log("Paciente editado correctamente", data.Data);
              navigate('/GestionPacientes')
            })
            .catch(error => {
              console.log("Error al editar el paciente", error);
            });
        } else {
          fetch("https://localhost:44342/api/Patient/AddPatient", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(paciente)
          })
            .then(response => response.json())
            .then(data => {
              console.log("Paciente guardado correctamente", data);
              navigate('/GestionPacientes')
            })
            .catch(error => {
              console.log("Error al guardar el Paciente", error);
            });
        }
      };

    return(
         <div className="register-card w-screen h-screen flex flex-col justify-around mt-6">
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
                <form className="text-gray-700 flex flex-col items-center flex-1" onSubmit={handleSubmit}>
                    <h2 className="text-3xl text-center font-semibold mb-10 pb-5 border-b-gray-500 border-b w-full">{!props.isEdit ? 'Registro de Nuevo Paciente' : 'Editar Paciente'}</h2>
                    <div className="w-3/5 flex-1 flex flex-col justify-between">
                        <div className="name-input flex justify-between w-full">
                            <div className="flex items-center w-1/4">
                                <label for="Nombre">Nombre</label>
                            </div>
                            <div className="flex justify-between md:w-2/4 w-3/4">
                                <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                id="nombre" name="nombre" placeholder="Nombre"
                                value= {paciente.nombre}
                                onChange={handleInputChange}
                                required
                                ></input>
                                <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                id="paterno" name="paterno" placeholder="Apellido Paterno"
                                value= {paciente.paterno}
                                onChange={handleInputChange}
                                required
                                ></input>
                                <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                id="materno" name="materno" placeholder="Apellido Materno"
                                value= {paciente.materno}
                                onChange={handleInputChange}
                                required
                                
                                ></input>
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
                        <div className="dob-input flex justify-between">
                            <div className="flex items-center w-1/4">
                                <label for="fechaNacimiento">Fecha de Nacimiento</label>
                            </div>
                            <div className="md:w-2/4 w-3/4">
                                <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                type="date" id="fechaNacimiento" name="fechaNacimiento" placeholder="Fecha de Nacimiento"
                                value= {paciente.fechaNacimiento.substring(0,10)}
                                onChange={handleInputChange}
                                min="1950-01-01" max="2023-01-01"
                                required
                                ></input>
                            </div>
                        </div>
                        <div className="email-input flex justify-between">
                            <div className="flex items-center w-1/4">
                                <label for="email">Email</label>
                            </div>
                            <div className="md:w-2/4 w-3/4">
                                <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                id="email" name="email" placeholder="Correo Electrónico"
                                value= {paciente.email}
                                onChange={handleInputChange}
                                required
                                ></input>
                            </div>
                        </div>
                        <div className="password-input flex justify-between">
                            <div className="flex items-center w-1/4">
                                <label for="password">Contraseña</label>
                            </div>
                            <div className="flex flex-col md:w-2/4 w-3/4">
                                <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                id="password" name="password" type="password" placeholder="Contraseña"
                                value= {paciente.password}
                                onChange={handleInputChange}
                                required
                                ></input>
                            </div>
                        </div>
                        <div className="address-input flex justify-between">
                            <div className="flex items-center w-1/4">
                                <label for="estado">Dirección</label>
                            </div>
                            <div className="flex flex-col md:w-2/4 w-3/4">
                                <div className="flex">
                                    <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" id="Estado" 
                                    name="estado" placeholder="estado"
                                    value= {paciente.estado}
                                    onChange={handleInputChange}
                                    required
                                    ></input>
                                    <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                    id="municipio" name="municipio" placeholder="Municipio"
                                    value= {paciente.municipio}
                                    onChange={handleInputChange}
                                    required
                                    ></input>
                                </div>
                                <div className="flex">
                                    <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                    id="colonia" name="colonia" placeholder="Colonia"
                                    value= {paciente.colonia}
                                    onChange={handleInputChange}
                                    required
                                    ></input>
                                    <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                    id="calle" name="calle" placeholder="Calle"
                                    value= {paciente.calle}
                                    onChange={handleInputChange}
                                    required
                                    ></input>
                                </div>
                                <div className="flex">
                                    <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                    id="noInterior" name="noInterior" placeholder="No. Interior" type="number"
                                    value= {paciente.noInterior}
                                    onChange={handleInputChange}
                                    required
                                    ></input>
                                    <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                    id="noExterior" name="noExterior" placeholder="No. Exterior" type="number"
                                    value= {paciente.noExterior}
                                    onChange={handleInputChange}
                                    required
                                    ></input>
                                </div>
                                <div className="flex">
                                    <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                    id="cp" name="cp" placeholder="Código Postal"
                                    value= {paciente.cp}
                                    onChange={handleInputChange}
                                    required
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="phone-input flex justify-between">
                            <div className="flex items-center w-1/4">
                                <label for="telefono">Teléfono</label>
                            </div>
                            <div className="flex flex-col md:w-2/4 w-3/4">
                                <input className="border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-aqua-squeeze border-deep-sea-green placeholder-deep-sea-green" 
                                id="telefono" name="telefono" placeholder="Teléfono" type="number"
                                value= {paciente.telefono}
                                onChange={handleInputChange}
                                required
                                ></input>
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
                        <div className="block text-right mb-5">
                            <button type="submit" className="button-primary w-1/4">{props.isEdit ? 'Editar': 'Agregar'}</button>
                            <a href="/GestionPacientes" className="button-primary w-1/4">Cancelar</a>
                        </div>
                      
                    </div>
                </form>
            </div>
    )
}

export default PatientRegister