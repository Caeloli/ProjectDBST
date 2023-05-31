import React, { useState, useEffect } from "react";
import HamburgerMenuDesktop from "../components/HamburgerMenuDesktop";
import imagen from '../assets/imgs/nuevoMedicamento.png'
import {useLocation} from "react-router-dom";

function NewMedicine() {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [medicamento, setMedicamento] = useState({
    idFabricante: "",
    nombreComun:"",
    dosificacionRecomendada: "",
    formaFarmaceutica: "",
    precio: "",
    precauciones: ""
  });

  const [fabricantes,setFabricantes] = useState([])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isEdit = searchParams.get("edit") === "true";
    const medicamentoId = searchParams.get("id");

    setIsEditing(isEdit);

    if(isEdit && medicamentoId) {
      fetch(`https://localhost:44342/api/Medicine/GetMedicineById?piId=${medicamentoId}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.Data[0])
          setMedicamento(data.Data[0])
        })
        .catch(error => {
          console.log("Error al obtener datos del medicamento", error);
        })
    }

    fetchFabricantes();
  }, [location.search]);

  const fetchFabricantes = () => {
    fetch("https://localhost:44342/api/Provider/GetProviders", {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        setFabricantes(data.Data)
      })
      .catch(error => {
        console.log("Error al obtener la lista de fabricantes", error);
      });

      let optionItems = fabricantes.map((fabricante) =>
        <option key={fabricante.idFabricante} value={fabricante.idFabricante}>{fabricante.nombre}</option>
    );

  };

  const handleInputChange = (e) => {
    setMedicamento({
      ...medicamento,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    medicamento.idFabricante = parseInt(medicamento.idFabricante);
    medicamento.precio = parseFloat(medicamento.precio);
    if (isEditing) {
      const searchParams = new URLSearchParams(location.search);
      let medicamentoUpdate = {}
      medicamentoUpdate = medicamento
      medicamentoUpdate['id'] = parseInt(searchParams.get("id"))
      console.log(medicamentoUpdate)
      fetch(`https://localhost:44342/api/Medicine/UpdateMedicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(medicamento)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Medicamento editado correctamente", data.Data);
        })
        .catch(error => {
          console.log("Error al editar el medicamento", error);
        });
    } else {
      fetch("https://localhost:44342/api/Medicine/AddMedicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(medicamento)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Medicamento guardado correctamente", data);
        })
        .catch(error => {
          console.log("Error al guardar el medicamento", error);
        });
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <HamburgerMenuDesktop></HamburgerMenuDesktop>

      <div className="flex justify-center items-center w-full h-full ">
        <div className="w-1/2 border-2 border-green-500 shadow-m rounded-lg h-[670px] flex justify-center items-center bg-deep-sea-green">
          <img src={imagen} alt="Imagen" className="w-[200px] h-[500px]  object-contain " />
        </div>
        <form
          className="w-1/2 max-w-md bg-white p-8 shadow-md rounded-lg border-2 border-green-500"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Agregar Medicamento</h2>

          <div className="mb-4">
            <label htmlFor="NombreComun" className="block font-semibold">
              Nombre Común
            </label>
            <input
              type="text"
              id="nombreComun"
              name="nombreComun"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value= {medicamento.nombreComun}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="formaFarmaceutica" className="block font-semibold">
              Nombre Farmacéutica
            </label>
            <input
              type="text"
              id="formaFarmaceutica"
              name="formaFarmaceutica"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.formaFarmaceutica}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="precio" className="block font-semibold">
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.precio}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dosificacionRecomendada" className="block font-semibold">
              Dosificación Recomendada
            </label>
            <input
              type="text"
              id="dosificacionRecomendada"
              name="dosificacionRecomendada"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.dosificacionRecomendada}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="precauciones" className="block font-semibold">
              Precauciones
            </label>
            <textarea
              id="precauciones"
              name="precauciones"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.precauciones}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="idFabricante" className="block font-semibold">
              Fabricante
            </label>
            <select
              id="idFabricante"
              name="idFabricante"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.idFabricante}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un fabricante</option>
              {fabricantes.map(fabricante => {
                <option key={fabricante.idFabricante} value={fabricante.idFabricante}>ss</option>
              })}
              <option value="1">merk mexico</option>
              <option value="2">boehringer ingelheim</option>
              <option value="3">bayer</option>

            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "Editar" : "Agregar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewMedicine;