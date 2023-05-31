import React, { useEffect , useState} from "react";
import MedicineRow from './MedicineRow';


function MedicationList({ isDashboard }) {
    const [listaMedicinas, setListaMedicinas] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44342/api/Medicine/GetAllMedicine", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setListaMedicinas(data.Data);
                console.log(data.Data)
            })
            .catch(error => {
                console.log("Error no se pudo obtener la lista de medicinas", error);
            })
    }, []);

    if (isDashboard === true) {
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
                                {listaMedicinas.map(medicina => (
                                    <MedicineRow medicina={medicina} key={medicina.idMedicamento} tipo={isDashboard}></MedicineRow>
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
                                {listaMedicinas.map(medicina => (
                                    <MedicineRow medicina={medicina} key={medicina.idMedicamento} tipo={isDashboard}></MedicineRow>
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