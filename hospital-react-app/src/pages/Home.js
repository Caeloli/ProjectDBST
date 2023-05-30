import { faIdCard, faNotesMedical, faSyringe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

class Home extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="">
                <div className="bg-deep-sea-green flex flex-col items-center h-[1031px]">
                    <div className="flex w-4/5 justify-evenly px-12 h-3/5">
                        <div className="flex flex-col justify-around py-10">
                            <h3 className="bg-blue-hosta text-center w-1/2 text-xl"> Bienvenido a Infinita HealthCare </h3>
                            <h1 className="text-blue-hosta text-7xl w-3/4"> Líderes en <span className="text-white">Calidad</span> del Servicio Médico </h1>
                            <p className="text-sm text-white">Ofrecemos las mejores experiencias médicas para nuestros clientes lorem ipsum modsad para Idas sadsadd</p>
                            <div className="flex justify-around w-1/2">
                                <a className="button-primary">Agendar una Cita</a>
                                <a className="button-primary">Registrarse</a>
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
                <div className="h-screen w-full flex flex-col">
                    <div className="flex flex-col items-center mt-10 justify-center">
                        <h2 className="font-semibold text-xl text-deep-sea-green">Nuestros Médicos</h2>
                        <p className="text-deep-sea-green">Aquí están Nuestros Líderes Médicos</p>
                    </div>
                    <div className="flex justify-around">
                        <MedicCardHome medicName="Dr. Freud Simpson" desc="DR Freud es un completo doctor titulado por la Universidad Nacional Autónoma de México en el área de especialidad de Ginecología" />
                    </div>
                </div>
            </div>
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
            <div className="bg-deep-sea-green w-3/12 p-4 flex flex-col items-center rounded-3xl">
                <div className="bg-blue-hosta w-9/12 h-1/3">
                    <img src={require('../assets/imgs/surgeon.png')} className="object-contain w-full h-full"></img>
                </div>
                <div>

                </div>
                <div>
                    <div>
                        <h4 className="text-base uppercase">{this.props.medicName}</h4>
                        <p className="">{this.props.desc}</p>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}
export default Home;