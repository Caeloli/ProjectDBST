import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical, faHouse, faFlask, faVirus, faPlus, faUser, faPrescriptionBottleMedical, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PatientMenuDesktop = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (


        <div
            className={`w-44 h-screen shadow-xl bg-deep-sea-green`}
        >
            <div className="pb-20 text-white text-center flex flex-col justify-between h-full">
                <div className='h-1/6 flex justify-center flex-col '>
                    <FontAwesomeIcon className='text-6xl' icon={faPlus} />
                    <p className='block'>
                    InfinitaHealthCare
                    </p>
                </div>
                <div className='h-4/6 flex  flex-col text-base text-center'>
                    <a
                        href="/PatientDashboard"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-3' icon={faHouse} />
                        <p>Inicio</p>
                    </a>
                    <a
                        href="/AppointmentForm"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-3' icon={faNotesMedical} />
                        <p>Generar Cita</p>
                    </a>
                    <a
                        href="#"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-3' icon={faPrescriptionBottleMedical} />
                        <p>Receta</p>
                    </a>
                    <a
                        href="#"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-3' icon={faClipboard} />
                        <p>Historial</p>
                    </a>
                </div>
                <div className='h-1/6 flex justify-evenly flex-col'>
                    <a className="" href='#'>
                        <FontAwesomeIcon className='bg-blue-hosta p-7 text-xl rounded-full' icon={faUser} />
                    </a>
                </div>
            </div>
        </div>

    );
};

export default PatientMenuDesktop;
