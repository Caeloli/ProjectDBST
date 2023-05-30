import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function MedicineRow(props) {
    const medicina = props.medicina;
    const tablaCompleta = props.tipo;

    if (!tablaCompleta) {
        return (
            <tr>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {medicina.nombreFarmaceutico}
                    </div>
                </td>

                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {medicina.nombre}
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                        {medicina.precio}
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                        {medicina.dosisRecomendada}
                    </div>
                </td>

                <td className="p-2 ">
                    <div className="text-left font-medium text-green-500">
                        <a href="#">
                            <FontAwesomeIcon className='text-2xl' icon={faGear} style={{ color: "#545454", }} />
                        </a>
                    </div>
                </td>

                <td className="p-2 ">
                    <div className="text-left font-medium text-green-500">
                        <a href="#">
                            <FontAwesomeIcon className='text-2xl' icon={faCircleXmark} style={{ color: "#ff0000", }} />
                        </a>
                    </div>
                </td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        <a href="#">
                            {medicina.nombreFarmaceutico}
                        </a>
                    </div>
                </td>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        <a href="#">
                            {medicina.nombre}
                        </a>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                        {medicina.precio}
                    </div>
                </td>

            </tr>
        );
    }


}

export default MedicineRow;