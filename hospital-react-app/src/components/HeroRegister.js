import React from "react";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class HeroRegister extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleClick } = this.props;
        return (
            <div className="hero-register w-full h-screen bg-deep-sea-green text-white flex flex-col justify-around items-center pb-64">
                <div>
                    <h1 className="font-bold text-9xl mb-8">Registro</h1>
                    <p className="font-thin text-lg">Por favor, haz clic en la flecha para continuar con su registro </p>
                </div>
                <div>
                    <button className="h-32 w-32 bg-white rounded-full " onClick={event => handleClick(event, 100)}>
                        <FontAwesomeIcon className=" text-7xl text-deep-sea-green transition-all duration-500 ease-in-out hover:translate-y-5 hover:scale-110 " icon={faArrowDown} />
                    </button>
                </div>
            </div>
        );
    }
}

export default HeroRegister;