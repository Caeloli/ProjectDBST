import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical, faHouse, faFlask, faVirus, faPlus, faUser, faPrescriptionBottleMedical, faClipboard, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PatientMenuCellphone = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="text-gray-800 focus:outline-none focus:text-gray-500"
        onClick={toggleMenu}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-start z-50 bg-black bg-opacity-50">
          <div className="bg-deep-sea-green w-64 h-screen">
            <button
              className="text-white absolute top-0 right-0 m-4 focus:outline-none"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="pb-20 text-white text-center flex flex-col justify-between h-full">
              <div className="h-1/6 flex justify-center flex-col">
                <FontAwesomeIcon className="text-6xl" icon={faPlus} />
                <p className="block">InfinitaHealthCare</p>
              </div>
              <div className="h-4/6 flex flex-col text-base text-center">
                <Link
                  to="/Paciente"
                  className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon className="pr-3" icon={faHouse} />
                  <p>Inicio</p>
                </Link>
                <Link
                  to="/Cita"
                  className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon className="pr-3" icon={faNotesMedical} />
                  <p>Generar Cita</p>
                </Link>
                <Link
                  to="#"
                  className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon className="pr-3" icon={faPrescriptionBottleMedical} />
                  <p>Receta</p>
                </Link>
                <Link
                  to="#"
                  className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                  onClick={toggleMenu}
                >
                  <FontAwesomeIcon className="pr-3" icon={faClipboard} />
                  <p>Historial</p>
                </Link>
              </div>
              <div className="h-1/6 flex justify-evenly flex-col">
                <a className="" href="#">
                  <FontAwesomeIcon className="bg-blue-hosta p-7 text-xl rounded-full" icon={faUser} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientMenuCellphone;
