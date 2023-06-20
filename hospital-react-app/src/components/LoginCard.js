import "../../src/style.css";
import {useLocation, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { createUser, resetUser } from '../redux/states/user'
function LoginCard(){
    
    
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        LoginCred: "",
        Password: ""
    });

    useEffect(() => {
        localStorage.removeItem('user');
        dispatch(resetUser());
    })

    const handleInputChange = (e) => {
        setLogin({
          ...login,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(login)
        fetch(`https://localhost:44342/api/Login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.StatusCode);
            if(data.StatusCode === 500){
                alert(data.Message)
            }
            // localStorage.setItem("token", data.Data.idUsuario)
            
            dispatch(createUser(data.Data))
            if(data.Data.tipo == 'Paciente'){
                navigate('/PatientDashboard')
            }else if(data.Data.tipo == 'Medico'){
                navigate('/Dashboard')
            } else{
                navigate('/AdminDashboard')
            }
        })
        .catch(error => {
            console.log("Error al iniciar sesión", error);
        });
        
      };

        return (
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <h2 className="font-bold text-center text-xl">Login</h2>
                </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            RFC para médico / correo para paciente
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="LoginCred" type="text" placeholder="RFC para médico / correo para paciente"
                        name="LoginCred"
                        value= {login.LoginCred}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" type="password" placeholder="******************" 
                        name="Password"
                        value= {login.Password}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit">
                            LOGIN
                        </button>
                        <a href="/RecoverPassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            ¿Olvidó su contraseña?
                        </a>
                        
                    </div>
                        {/* <a href="/home" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Inicio
                        </a> */}
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Infinita HealthCare. Todos los derechos reservados.
                </p>
            </div>
        );
}

export default LoginCard;