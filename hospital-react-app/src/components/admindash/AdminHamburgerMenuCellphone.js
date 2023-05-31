import React, { useState } from 'react';

const AdminHamburgerMenuCellphone = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
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

            <div
                className={`absolute w-96 top-0 left-0 h-screen bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 ${isOpen ? 'transform -translate-x-full' : 'translate-x-0'
                    }`}
            >
                <div className="px-4 py-2">
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={toggleMenu}
                    >
                        ------
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Inicio
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Servicios
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Contacto
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminHamburgerMenuCellphone;

