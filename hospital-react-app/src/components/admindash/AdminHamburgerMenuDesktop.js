import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical, faHouse, faFlask, faVirus, faPlus, faUser, faUserDoctor, faUserFriends, faSignOut, faFileMedical, faCalendarDays, faIndustry, faBroom } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../redux/states/user'


const AdminHamburgerMenuDesktop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut = () => {
        localStorage.removeItem('user')
        dispatch(resetUser());
        navigate('/home')
    }

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
                        href="/AdminDashboard"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faHouse} />
                        <p>Inicio</p>
                    </a>
                    <a
                        href="/Medicamentos"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faFlask} />
                        <p>Farmacología</p>
                    </a>
                    <a
                        href="/GestionPacientes"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faUser} />
                        <p>Pacientes</p>
                    </a>
                    <a
                        href="/GestionMedicos"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faUserDoctor} />
                        <p>Medicos</p>
                    </a>
                    <a
                        href="/GestionAdmin"
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faUserFriends} />
                        <p>Administradores</p>
                    </a>
                    <a
                        href='/GestionBitacora'
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faFileMedical} />
                        <p>Bitácora</p>
                    </a>
                    <a
                        href='/GestionCitasAdmin'
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faCalendarDays} />
                        <p>Citas</p>
                    </a>
                    <a
                        href='/GestionFabricantes'
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faIndustry} />
                        <p>Fabricantes</p>

                    </a>
                    <a
                        href='/GestionConsultorio'
                        className="flex justify-start items-center py-4 pl-4 transition duration-300 ease-in-out hover:bg-aqua-squeeze hover:text-deep-sea-green"
                    >
                        <FontAwesomeIcon className='pr-6' icon={faBroom} />
                        <p>Consultorios</p>

                    </a>
                </div>
                <div className='h-1/6 flex justify-evenly flex-col'>
                    <a className="" href='#' onClick={handleLogOut}>
                        <FontAwesomeIcon className='bg-blue-hosta p-7 text-xl rounded-full' icon={faSignOut} />
                    </a>
                </div>
            </div>
        </div>

    );
};

export default AdminHamburgerMenuDesktop;

