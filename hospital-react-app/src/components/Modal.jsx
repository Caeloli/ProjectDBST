import React, { useEffect, useState } from "react";


function Modal({ setOpenModal, binnacleId }) {
    const [ticket, setTicket] = useState([])
    useEffect(() => {
        fetch(`https://localhost:44342/api/Binnacle/getTicket?piId=${binnacleId}`, {
            method: "GET"
          })
            .then(response => response.json())
            .then(data => {
              setTicket(data.Data)
              console.log(data.Data)
            })
            .catch(error => {
              console.log("Error al obtener datos de citas", error);
            })
    
      
    }, [])
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
          Ticket
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
      <table class="table-fixed w-full border-collapse border border-slate-400">
  <thead>
    <tr>
      <th className="border border-slate-300">Medicamento ID</th>
      <th className="border border-slate-300">Nombre</th>
      <th className="border border-slate-300">Precio</th>
    </tr>
  </thead>
  <tbody>
        {
            ticket != null ?
            ticket.map(e => (
                <tr>
                    <td className="border border-slate-300">{e.idMedicamento}</td>
                    <td className="border border-slate-300">{e.nombreComun}</td>
                    <td className="border border-slate-300">${e.precio} MXN</td>
                </tr>
            ))
            
            : <div>SIN MEDICAMENTOS</div>
        }
        <tr>
            <td className="border border-slate-300">Consulta: $50 MXN</td>
        </tr>
        <tr>
            
            <td className="border border-slate-300">
                <div className="text-left font-medium text-green-500">
                                TOTAL ${ 
                                ticket != null ?
                                (ticket.map(item => item.precio).reduce((prev, curr) => prev + curr, 0)) + 50
                                    : 50
                            }
                </div>
            </td>
        </tr>
    
  
  </tbody>
</table>
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
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>
        </>
    );
}    
export default Modal