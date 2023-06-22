import React, { useEffect, useState } from "react";


function ModalAddExtraMed({ setOpenModal, recetaId }) {
    const [medicamentos, setMedicamentos] = useState([]);
    const [selectedMedicamento, setSelectedMedicamento] = useState('');
    const [dosificacion, setDosificacion] = useState('');
    const [tiempoTratamiento, setTiempoTratamiento] = useState('');
    useEffect(() => {
        const fetchMedicamentos = async () => {
            fetch("https://localhost:44342/api/Medicine/GetAllMedicine", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setMedicamentos(data.Data);
                console.log(data.Data)
            })
            .catch(error => {
                console.log("Error no se pudo obtener la lista de medicinas", error);
            })
        
        };

        fetchMedicamentos();
    
      
    }, [])

    const handleAddMedicamento = () => {
        // Lógica para completar la consulta
        console.log('Consulta completada');

        const medicine = {
            idMedicamento: selectedMedicamento,
            idRegistroMedico: recetaId,
            tiempoTratamiento: tiempoTratamiento,
            dosificacion: dosificacion
        } 
        
        console.log(medicine)
        // Se manda una peticion POST a la API para guardar la consulta en la base de datos
        fetch(`https://localhost:44342/api/Receipt/AddExtraMedicine`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medicine)
        })
            .then(response => response.json())
            .then(data => {
                if(data.StatusCode == 500){
                    alert(data.Message)
                }else{
                    console.log("consulta guardado correctamente");
                    setOpenModal(false)
                }
            })
            .catch(error => {
                console.log("error al guardar la consulta");
            })
    };

    const handleMedicamentoChange = (event) => {
        setSelectedMedicamento(event.target.value);
    };

    const handleDosificacionChange = (event) => {
        setDosificacion(event.target.value);
    };

    const handleTiempoTratamientoChange = (event) => {
        setTiempoTratamiento(event.target.value);
    };
    return (
        <>
            <div
                data-te-modal-init
                className="fixed left-0 top-0 z-[1055] 
                hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none
                flex items-center justify-center
                "
                id="staticBackdrop"
 >
  <div
    data-te-modal-dialog-ref
    class="pointer-events-none relative translate-y-[-50px] 
    opacity-0 transition-all duration-300 ease-in-out 
     w-1/2"
    >
    <div
      class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
      <div
        class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <h5
          class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalLabel">
          Añadir medicamento extra a la consulta
        </h5>
        <button
          type="button"
          class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-modal-dismiss
            onClick={() => setOpenModal(false)}
          aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

        <div data-te-modal-body-ref class="p-4 w-full">
        <div className="w-full pr-4">
                        <form className="w-full/">
                            <div className="mb-4">
                                <label htmlFor="medicamento" className="font-bold">
                                    Medicamento:
                                </label>
                                <select
                                    id="medicamento"
                                    value={selectedMedicamento}
                                    onChange={handleMedicamentoChange}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                >
                                    <option value="">Seleccionar Medicamento</option>
                                    {medicamentos.map((medicamento) => (
                                        <option key={medicamento.idMedicamento} value={medicamento.idMedicamento}>
                                            {medicamento.nombreComun}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dosificacion" className="font-bold">
                                    Dosis:
                                </label>
                                <input
                                    type="text"
                                    id="dosificacion"
                                    value={dosificacion}
                                    onChange={handleDosificacionChange}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="tiempoTratamiento" className="font-bold">
                                    Días para tomar:
                                </label>
                                <input
                                    type="text"
                                    id="tiempoTratamiento"
                                    value={tiempoTratamiento}
                                    onChange={handleTiempoTratamientoChange}
                                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddMedicamento}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Agregar Medicamento
                            </button>
                        </form>
                    </div>
        </div>

      <div
        class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <button
          type="button"
          class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          data-te-modal-dismiss
          data-te-ripple-init
            onClick={() => setOpenModal(false)}
          data-te-ripple-color="light">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</div>
        </>
    );
}    
export default ModalAddExtraMed