import { faIdCard, faNotesMedical, faSyringe, faEnvelope, faArchive, faPhone, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css"

import React, { Fragment } from "react";

class Home extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <Fragment>
                <div className="bg-deep-sea-green flex flex-col items-center h-[1031px]">
                    <div className="flex w-4/5 justify-evenly px-12 h-3/5">
                        <div className="flex flex-col justify-around py-10">
                            <h3 className="bg-blue-hosta text-center w-1/2 text-xl"> Bienvenido a Infinita HealthCare </h3>
                            <h1 className="text-blue-hosta text-7xl w-3/4"> Líderes en <span className="text-white">Calidad</span> del Servicio Médico </h1>
                            <p className="text-sm text-white">Ofrecemos las mejores experiencias médicas para nuestros clientes lorem ipsum modsad para Idas sadsadd</p>
                            <div className="flex justify-around w-1/2">
                                {/* <a className="button-primary">Agendar una Cita</a> */}
                                {/* <a className="button-primary">Registrarse</a> */}
                            </div>
                        </div>
                        <div className="w-96 max-h-max">
                            <img src={require('../assets/imgs/surgeon.png')} className="object-contain w-full h-full"></img>
                        </div>
                    </div>
                    <div className="w-full h-2/6 relative">
                        <div className="bg-deep-sea-green w-full h-1/2">

                        </div>
                        <div className="bg-aqua-squeeze w-full h-1/2">

                        </div>
                        <div className="w-full h-full top-0 left-0 absolute flex justify-center">
                            <div className="bg-aqua-squeeze w-3/4 rounded-xl flex justify-around items-center">
                                <InfoCardHome icon={<FontAwesomeIcon icon={faSyringe} />} title="Vacunación" desc="Las mejores vacunas al alcance de todos" />
                                <InfoCardHome icon={<FontAwesomeIcon icon={faNotesMedical} />} title="Recetas" desc="Recetas diseñadas individualmente" />
                                <InfoCardHome icon={<FontAwesomeIcon icon={faIdCard} />} title="Usuario" desc="Registro rápido y sencillo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-screen w-full flex flex-col bg-aqua-squeeze">
                    <div className="flex flex-col items-center mt-10 justify-center mb-32">
                        <h2 className="font-semibold text-2xl text-deep-sea-green">Nuestros Médicos</h2>
                        <p className="text-deep-sea-green">Aquí están Nuestros Líderes Médicos</p>
                    </div>
                    <div className="flex justify-around flex-wrap items-center mt-8">
                        <MedicCardHome medicName="Dr. Freud Simpson" desc="DR Freud es un completo doctor titulado por la Universidad Nacional Autónoma de México en el área de especialidad de Ginecología" />
                        <MedicCardHome medicName="Dr. Freud Simpson" desc="DR Freud es un completo doctor titulado por la Universidad Nacional Autónoma de México en el área de especialidad de Ginecología" />
                        <MedicCardHome medicName="Dr. Freud Simpson" desc="DR Freud es un completo doctor titulado por la Universidad Nacional Autónoma de México en el área de especialidad de Ginecología" />
                    </div>
                </div>
                <div className="h-screen w-full flex flex-col bg-deep-sea-green">
                    <div className="flex flex-col items-center mt-10 justify-center mb-48">
                        <h2 className="font-semibold text-2xl text-blue-hosta">Características</h2>
                        <p className="text-blue-hosta">Aquí están Nuestros Líderes Médicos</p>
                    </div>
                    <div className="flex justify-around flex-wrap items-center mt-8">
                        <CharacteristicsCardHome />
                        <CharacteristicsCardHome />
                        <CharacteristicsCardHome />
                    </div>
                </div>
                <div className="h-screen w-full flex flex-col bg-aqua-squeeze">
                    <div className="flex flex-col items-center mt-10 justify-center mb-4">
                        <h2 className="font-semibold text-2xl text-deep-sea-green">Testimonios</h2>
                        <p className="text-deep-sea-green">La opinión de nuestros pacientes</p>
                    </div>
                    <div className="flex justify-around flex-wrap items-center mt-8">
                        {
                            Array.from({length: 8}, (value, index) => (
                                <WitnessCardHome />
                            ))
                        }
                    </div>
                </div>
            </Fragment>
        )
    }

}

class InfoCardHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex items-center w-1/4 h-3/4">
                <div className="bg-deep-sea-green rounded-md px-9 py-14 flex justify-center items-center text-white text-4xl shadow-xl">
                    {this.props.icon}
                </div>
                <div className="pl-3">
                    <h4 className="font-bold text-lg">{this.props.title}</h4>
                    <p>{this.props.desc}</p>
                </div>
            </div>
        );
    }
}


class MedicCardHome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="bg-deep-sea-green w-[400px] p-4 flex flex-col items-center rounded-3xl mb-6">
                <div className="bg-blue-hosta rounded-xl relative mb-4 w-72 h-48">
                    <div className="w-full h-full">
                        <img src={require('../assets/imgs/surgeon.png')} className="object-contain w-full h-full"></img>
                    </div>
                    <div className="flex w-full justify-center">
                        <div className="border border-blue-hosta bg-deep-sea-green rounded-3xl absolute -bottom-3 w-3/4 ">
                            <h3 className="text-center text-xl font-semibold text-blue-hosta shadow">Ginecología</h3>
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <h4 className="uppercase text-blue-hosta text-lg font-semibold mb-4">{this.props.medicName}</h4>
                    <p className="text-blue-hosta">{this.props.desc}</p>
                </div>
                <div className="flex justify-between w-full items-center">
                    <div className="flex justify-between w-1/2 pr-10 text-deep-sea-green">
                        <FontAwesomeIcon className="border-2 bg-aqua-squeeze rounded-full text-xl p-2 hover:cursor-pointer hover:bg-deep-sea-green hover:text-blue-hosta hover:border-blue-hosta transition-all ease-in-out" icon={faEnvelope} />
                        <FontAwesomeIcon className="border-2 bg-aqua-squeeze rounded-full text-xl p-2 hover:cursor-pointer hover:bg-deep-sea-green hover:text-blue-hosta hover:border-blue-hosta transition-all ease-in-out" icon={faArchive} />
                        <FontAwesomeIcon className="border-2 bg-aqua-squeeze rounded-full text-xl p-2 hover:cursor-pointer hover:bg-deep-sea-green hover:text-blue-hosta hover:border-blue-hosta transition-all ease-in-out" icon={faPhone} />
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <a className="button-primary text-center">Agendar</a>
                    </div>
                </div>


            </div>
        );
    }
}

class CharacteristicsCardHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bg-aqua-squeeze shadow w-[36rem] h-[32rem] w- p-4 flex flex-col items-center rounded-3xl mb-6 relative">
                <div className="bg-aqua-squeeze shadow-xl rounded-3xl w-[28rem] h-[21rem] absolute -top-36 flex justify-center items-center">

                    <FontAwesomeIcon className="text-aqua-squeeze bg-deep-sea-green rounded-full w-24 h-24 p-10 shadow-xl" icon={faUsers} />

                </div>
                <div className="h-1/2">

                </div>
                <div className="static">
                    <h4 className="text-deep-sea-green text-xl font-bold text-center mb-4">Nuestro Personal</h4>
                    <p className="text-deep-sea-green text-lg text-center">Nuestro personal está dividido en tres diferentes profesionales: Administradores, Médicos y Operadores de Limpieza. Cada uno de estos tiene una función esencial en nuestro hospital</p>
                </div>
            </div>
        );
    }
}

class WitnessCardHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bg-deep-sea-green rounded-2xl flex justify-around items-center w-[51rem] h-[12rem] mb-4">
                <div className=" rounded-full flex justify-center items-center">
                    <FontAwesomeIcon className="bg-blue-hosta h-[3rem] w-[3rem] rounded-full p-12 shadow-2xl" icon={faUser} />
                </div>
                <div className="h-full">
                    <div className="border-b border-blue-hosta h-1/4 flex items-center">
                        <h3 className="text-blue-hosta font-bold text-xl">Josefina Vázquez Mota</h3>
                    </div>
                    <div>
                        <p className="text-blue-hosta text-lg">Los mejores doctores que he visto en mi vida. Son muy buenos.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;