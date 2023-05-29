
import React from "react";
import "../../src/style.css";

class LoginCard extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <h2 className="font-bold text-center text-xl">Login</h2>
                </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Usuario
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nombre de Usuario" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Contraseña
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            LOGIN
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            ¿Olvidó su contraseña?
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Infinita HealthCare. Todos los derechos reservados.
                </p>
            </div>
        );
    }
}

export default LoginCard;