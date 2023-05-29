import React from "react";
import HeroRegister from "../components/HeroRegister";
import RegisterCard from "../components/RegisterCard";

class Register extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <HeroRegister />
                <RegisterCard />
            </div>
        )
        // Hero Register
        // Register 1° Parte
        // Register 2° Parte
    }

}

export default Register;