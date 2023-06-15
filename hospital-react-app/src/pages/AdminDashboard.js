import React from 'react';
import NavDashboard from "../components/NavDashboard";
import AdminNavDashboard from '../components/admindash/AdminNavDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Calendar from "../components/Calendar";
import MedicationList from "../components/MedicationList";
import Table from "../components/Table";
class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const headerTitle = "Citas"
        const headerTable = ["Nombre", "Consultorio", "Hora"]
        const tableInfo = [
            ["info", "info", "info"],
            ["info", "info", "info"],
            ["info", "info", "info"]
        ]

        return (
            <div className="flex w-screen h-screen">
                <AdminNavDashboard />
                <div className="w-full p-2 flex justify-center items-center bg-aqua-squeeze">
                    <div className="w-11/12 flex flex-col h-full ">
                        <div className="title flex justify-between my-9">
                            <div className="w-1/2 background-green-blue-gradient flex flex-col justify-between p-4 rounded-2xl text-white">
                                <h2 className="font-bold text-2xl">Buenos Días, <span>Dr. Nunez</span></h2>
                                <p>Hay <span className="font-bold">120 pacientes</span> esperando por usted</p>
                            </div>
                            <div>
                                <FontAwesomeIcon className="border p-3 rounded-full " icon={faGear} />
                            </div>
                        </div>
                        <div className="panels grid grid-cols-3 gap-9 flex-1">
                            <div className="appointments col-span-1">
                                <Table headerTitle={headerTitle} headerTable={headerTable} tableInfo={tableInfo} />
                            </div>
                            <div className="appointments-request col-span-1 ">
                                <Calendar />
                            </div>
                            <div className="doctor-review col-span-1">
                                <div className="bg-white shadow-md h-full border border-blue-hosta rounded-3xl">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex flex-col items-center justify-center py-4">
                                            <div className="w-32 h-32 p-1 border shadow-md border-blue-hosta radial-bg-blue-hosta-gradient rounded-3xl flex items-center justify-center" >
                                                <img src={require('../assets/imgs/surgeon.png')} className=" object-contain h-full w-full"></img>
                                            </div>
                                            <h3 className="text-deep-sea-green font-semibold text-xl">Dra. Jackson Santos</h3>
                                            <p className="font-light">Dermatólogo - Sesion del Hospital</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 border-t border-t-gray-400 w-3/4 pt-4 my-0 mx-auto">
                                            <div className="flex flex-col text-xl">
                                                <span className="text-deep-sea-green font-bold">2.453</span>
                                                <p>Citas</p>
                                            </div>
                                            <div className="flex flex-col text-xl">
                                                <span className="text-deep-sea-green font-bold">2.453</span>
                                                <p>Pacientes</p>
                                            </div>
                                            <div className="flex flex-col text-xl">
                                                <span className="text-deep-sea-green font-bold">2.453</span>
                                                <p>Pacientes</p>
                                            </div>
                                            <div className="flex flex-col text-xl">
                                                <span className="text-deep-sea-green font-bold">2.453</span>
                                                <p>Consultas</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="patients-list col-span-2">
                                <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white shadow-lg rounded-3xl border  border-blue-hosta">
                                    <header className="px-5 py-4 ">
                                        <h2 className="font-semibold text-gray-800">Pacientes</h2>
                                    </header>

                                    <div className="overflow-y-auto max-h-full">
                                        <table className="table-fixed w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Name</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Age</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Last Diagnosis</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-center">#Register</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                                                <tr>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov" /></div>
                                                            <div className="font-medium text-gray-800">Alex Shatov</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">alexshatov@gmail.com</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">$2,890.66</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-lg text-center">??</div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg" width="40" height="40" alt="Philip Harbach" /></div>
                                                            <div className="font-medium text-gray-800">Philip Harbach</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">philip.h@gmail.com</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">$2,767.04</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-lg text-center">??</div>
                                                    </td>
                                                </tr>


                                                <tr>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg" width="40" height="40" alt="Mirko Fisuk" /></div>
                                                            <div className="font-medium text-gray-800">Mirko Fisuk</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">mirkofisuk@gmail.com</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">$2,996.00</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-lg text-center">??</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg" width="40" height="40" alt="Olga Semklo" /></div>
                                                            <div className="font-medium text-gray-800">Olga Semklo</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">olga.s@cool.design</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">$1,220.66</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-lg text-center">??</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg" width="40" height="40" alt="Burak Long" /></div>
                                                            <div className="font-medium text-gray-800">Burak Long</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left">longburak@gmail.com</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-left font-medium text-green-500">$1,890.66</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-lg text-center">??</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>
                            <div className="medicinal-supplies col-span-1 ">
                                <div className="border-2  shadow-md rounded-3xl max-h-full h-full border-blue-hosta bg-white">
                                    {/* <h3>Medical Supplies</h3> */}
                                    <MedicationList isDashboard={true} ></MedicationList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default AdminDashboard;