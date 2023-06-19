import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ProviderRegister(props) {

    const navigate = useNavigate();
    const isEdit = props.isEdit;
    const [direccionId, setDireccionId] = useState(0)
    const [provider, setProvider] = useState({
        nombre: "",
        infoRegistro: "",
        infoLicencia: "",
        telefono: "",
        sitioWeb: "",
        email: "",
        noInterior: "",
        noExterior: "",
        estado: "",
        municipio: "",
        colonia: "",
        calle: "",
        cp: ""
    })

    useEffect(() => {
        if (isEdit) {
            fetch(`https://localhost:44342/api/Provider/GetProviderById?piId=${parseInt(props.id)}`, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.Data[0])
                    setDireccionId(data.Data[0].idDireccion)
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
            let providerUpdate = {}
            providerUpdate = provider
            providerUpdate['Id'] = parseInt(props.id)
            providerUpdate['IdDireccion'] = parseInt(direccionId)
            console.log(provider);
            fetch(`https://localhost:44342/api/Provider/UpdateProvider`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(providerUpdate)
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
                                    <label className="font-semibold text-lg text-deep-sea-green" for="nombre">Nombre</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su nombre..."
                                        value={provider.nombre}
                                        onChange={(e) => handleInputChange(e.target.value, "nombre")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="infoRegistro">Registro</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="infoRegistro"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Registro..."
                                        value={provider.infoRegistro}
                                        onChange={(e) => handleInputChange(e.target.value, "infoRegistro")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="infoLicencia">Licencia</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="infoLicencia"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Licencia..."
                                        value={provider.infoLicencia}
                                        onChange={(e) => handleInputChange(e.target.value, "infoLicencia")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="telefono">Teléfono</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="telefono"
                                        type="tel"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Teléfono..."
                                        value={provider.telefono}
                                        onChange={(e) => handleInputChange(e.target.value, "telefono")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="sitioWeb">Sitio</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="sitioWeb"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Sitio..."
                                        value={provider.sitioWeb}
                                        onChange={(e) => handleInputChange(e.target.value, "sitioWeb")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="email">E-Mail</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="email"
                                        type="email"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su E-Mail..."
                                        value={provider.email}
                                        onChange={(e) => handleInputChange(e.target.value, "email")}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="col-span-1 flex flex-col justify-between h-full ml-2">
                            <h3 className="text-deep-sea-green text-2xl font-bold border-b-deep-sea-green" style={{ borderBottom: 'solid 0.3rem #0B5755' }}>Dirección</h3>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="estado">Estado</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        type="text"
                                        name="estado"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Estado..."
                                        value={provider.estado}
                                        onChange={(e) => handleInputChange(e.target.value, "estado")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="colonia">Colonia</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="colonia"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Colonia..."
                                        value={provider.colonia}
                                        onChange={(e) => handleInputChange(e.target.value, "colonia")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="municipio">Municipio</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="municipio"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Municipio..."
                                        value={provider.municipio}
                                        onChange={(e) => handleInputChange(e.target.value, "municipio")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="calle">Calle</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="calle"
                                        type="text"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Calle..."
                                        value={provider.calle}
                                        onChange={(e) => handleInputChange(e.target.value, "calle")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="cp">CP</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="cp"
                                        type="number"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su Código Postal..."
                                        value={provider.cp}
                                        onChange={(e) => handleInputChange(e.target.value, "cp")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="noExterior">No. Exterior</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="noExterior"
                                        type="number"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su No. Exterior..."
                                        value={provider.noExterior}
                                        onChange={(e) => handleInputChange(e.target.value, "noExterior")}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center w-1/4">
                                    <label className="font-semibold text-lg text-deep-sea-green" for="noInterior">No. Interior</label>
                                </div>
                                <div className="md:w-2/4 w-3/4">
                                    <input
                                        name="noInterior"
                                        type="number"
                                        className="w-full shadow border-2 border-deep-sea-green"
                                        placeholder="Su No. Interior..."
                                        value={provider.noInterior}
                                        onChange={(e) => handleInputChange(e.target.value, "noInterior")}
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