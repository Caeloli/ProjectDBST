import React, { useState } from "react";
import HamburgerMenuDesktop from "../components/HamburgerMenuDesktop";
import imagen from '../assets/imgs/nuevoMedicamento.png'

function NewMedicine() {

  const [medicamento, setMedicamento] = useState({
    nombreComun: "",
    nombreFarmaceutica: "",
    precio: "",
    dosificacion: "",
    precauciones: "",
    fabricante: ""
  });

  const handleInputChange = (e) => {
    setMedicamento({
      ...medicamento,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("URL", {
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
      })
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
            <label htmlFor="nombreComun" className="block font-semibold">
              Nombre Común
            </label>
            <input
              type="text"
              id="nombreComun"
              name="nombreComun"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.nombreComun}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nombreFarmaceutica" className="block font-semibold">
              Nombre Farmacéutica
            </label>
            <input
              type="text"
              id="nombreFarmaceutica"
              name="nombreFarmaceutica"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.nombreFarmaceutica}
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
            <label htmlFor="dosificacion" className="block font-semibold">
              Dosificación Recomendada
            </label>
            <input
              type="text"
              id="dosificacion"
              name="dosificacion"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.dosificacion}
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
            <label htmlFor="fabricante" className="block font-semibold">
              Fabricante
            </label>
            <select
              id="fabricante"
              name="fabricante"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              value={medicamento.fabricante}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un fabricante</option>
              <option value="Fabricante 1">Fabricante 1</option>
              <option value="Fabricante 2">Fabricante 2</option>
              <option value="Fabricante 3">Fabricante 3</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewMedicine;