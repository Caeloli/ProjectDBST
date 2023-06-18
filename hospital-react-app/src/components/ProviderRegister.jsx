import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ProviderRegister(props) {

    const navigate = useNavigate();
    const isEdit = props.isEdit;
    const [provider, setProvider] = useState({
        idFabricante: "",
        Nombre: "",
        Registro: "",
        Licencia: "",
        Telefono: "",
        Sitio: "",
        Email: "",
        idDireccion: ""
    })

    useEffect(() => {
        if (isEdit) {
            fetch(`api/Provider/GetProviderByProvider?piId=${parseInt(props.id)}`, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.Data[0])
                    setProvider(data.Data[0])
                })
                .catch(error => {
                    console.log("Error al obtener datos del fabricante", error);
                })
        }
    }, [isEdit, props.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            provider.idFabricante = parseInt(props.id)
            console.log(provider);
            fetch(`https://localhost:44342/api/Provider/UpdateProvider`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(provider)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Fabricante editado correctamente", data.Data);
                    navigate('/GestionFabricantes')
                })
                .catch(error => {
                    console.log("Error al editar la cita", error);
                });
        } else {
            fetch("https://localhost:44342/api/Provider/AddProvider", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(provider)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Fabricante guardado correctamente", data.Data);
                    navigate('/GestionFabricantes')
                })
                .catch(error => {
                    console.log("Error al guardar la cita", error);
                });
        }
    }

    const handleInputChange = (value, inputName) => {
        setProvider({
            ...provider,
            [inputName]: value
        });
    }

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

            <div className="appointment-form w-3/4 mx-auto mt-10 h-3/4">
                <form className="h-full flex flex-col justify-between" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 h-full mb-8 gap-2">
                        <div className="col-span-1 flex flex-col justify-between h-full mr-2">
                            <h3 className="text-deep-sea-green text-2xl font-bold border-b-deep-sea-green" style={{ borderBottom: 'solid 0.3rem #0B5755' }}>Datos Generales</h3>
                            {isEdit && (
                                <div className="flex justify-between">
                                    <div className="flex items-center w-1/4">
                                        <label className="font-semibold text-lg text-deep-sea-green" for="IdPaciente">Número de Fabricante</label>
                                    </div>
                                    <div className="md:w-2/4 w-3/4">
                                        <input
                                            name="idFabricante"
                                            type="text"
                                            className="shadow border-2 border-deep-sea-green w-full"
                                            disabled
                                            value={props.id} />
                                    </div>
                                </div>
                            )
                            }


                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Nombre">Nombre</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        type="text"
                                        name="Nombre"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su nombre..."
                                        onChange={(e) => handleInputChange(e.target.value, "Nombre")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Registro">Registro</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Registro"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Registro..."
                                        onChange={(e) => handleInputChange(e.target.value, "Registro")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Licencia">Licencia</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Licencia"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Licencia..."
                                        onChange={(e) => handleInputChange(e.target.value, "Licencia")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Telefono">Teléfono</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Telefono"
                                        type="tel"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Teléfono..."
                                        onChange={(e) => handleInputChange(e.target.value, "Telefono")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Sitio">Sitio</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Sitio"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Sitio..."
                                        onChange={(e) => handleInputChange(e.target.value, "Sitio")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Email">E-Mail</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Email"
                                        type="email"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su E-Mail..."
                                        onChange={(e) => handleInputChange(e.target.value, "Email")}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="col-span-1 flex flex-col justify-between h-full ml-2">
                            <h3 className="text-deep-sea-green text-2xl font-bold border-b-deep-sea-green" style={{ borderBottom: 'solid 0.3rem #0B5755' }}>Dirección</h3>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Nombre">Estado</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        type="text"
                                        name="Estado"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Estado..."
                                        //onChange={(e) => handleInputChange(e.target.value, "Estado")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Colonia">Colonia</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Colonia"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Colonia..."
                                        //onChange={(e) => handleInputChange(e.target.value, "Colonia")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Municipio">Municipio</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Licencia"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Municipio..."
                                        //onChange={(e) => handleInputChange(e.target.value, "Municipio")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Telefono">Calle</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Calle"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Calle..."
                                        //onChange={(e) => handleInputChange(e.target.value, "Telefono")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="CP">CP</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="CP"
                                        type="number"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Código Postal..."
                                        //onChange={(e) => handleInputChange(e.target.value, "CP")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Exterior">No. Exterior</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Exterior"
                                        type="number"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su No. Exterior..."
                                        //onChange={(e) => handleInputChange(e.target.value, "Exterior")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="Exterior">No. Interior</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="Interior"
                                        type="number"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su No. Interior..."
                                        //onChange={(e) => handleInputChange(e.target.value, "Exterior")}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="text-right mb-5 w-full flex justify-evenly">
                        <button type="submit" className="button-primary w-1/4">{props.isEdit ? 'Editar' : 'Agregar'}</button>
                        <a href="/GestionFabricantes" className="text-center button-primary w-1/4">Cancelar</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ProviderRegister;