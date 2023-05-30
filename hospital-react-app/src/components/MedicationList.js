import React, {useEffect} from "react";
import MedicineRow from './MedicineRow';


function MedicationList(props) {

    const { isDashboard, medicinas } = props;
    

    // const [medicinas, setMedicinas] = useState([]);

    // useEffect(() => {
    //     const fetchMedicamentos = async() => {
    //         try {
    //             const response = await fetch("URL");
    //             const data = await response.json();
    //             setMedicinas(data);
    //         } catch (error) {
    //             console.log("Error fetching medicamentos: ", error);
    //         }
    //     }
    // }, []);

    // const handleDelete = (id) => {
    //     fetch(`URL/${id}`, {
    //       method: "DELETE"
    //     })
    //       .then(response => {
    //         if (response.ok) {
    //           console.log("Medicamento borrado correctamente");
    //         } else {
    //           console.error("No se pudo borrar el medicamento");
    //         }
    //       })
    //       .catch(error => {
    //         console.error("Error al borrar medicamento:", error);
    //       });
    //   };

    if (isDashboard) {
        return (
            <div className="patients-list col-span-2">
                <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white shadow-lg rounded-3xl border border-blue-hosta">
                    <header className="px-5 py-4">
                        <h2 className="font-semibold text-gray-800 mb-4">Medical Supplies</h2>
                    </header>

                    <div className=" overflow-y-auto max-h-[350px]">
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-3/6">

                                        <div className="font-semibold  text-left">Pharmaceutical name</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-2/6">
                                        <div className="font-semibold text-left">Commercial Name</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap w-1/6">
                                        <div className="font-semibold text-left">Price</div>
                                    </th>


                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                {medicinas.map(medicina => (
                                    <MedicineRow medicina={medicina} key={medicina.id} tipo={isDashboard}></MedicineRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        );
    } else {
        return (
            <div className="patients-list col-span-2">
                <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white shadow-lg rounded-3xl border border-blue-hosta">
                    <header className="px-5 py-4">
                        <h2 className="font-semibold text-gray-800 mb-4">Medical Supplies</h2>
                    </header>

                    <div className=" overflow-y-auto">
                        <table className="table-fixed w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap w-2/12">

                                        <div className="font-semibold  text-left ">Pharmaceutical name</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Commercial Name</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Price</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-2/12">
                                        <div className="font-semibold text-left">Recommended dose</div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-1/12">
                                        <div className="font-semibold text-left">
                                        </div>
                                    </th>

                                    <th className="p-2 whitespace-nowrap w-1/12">
                                        <div className="font-semibold text-left">

                                        </div>
                                    </th>


                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                {medicinas.map(medicina => (
                                    <MedicineRow medicina={medicina} key={medicina.id} tipo={isDashboard}></MedicineRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        );
    }

}

export default MedicationList;