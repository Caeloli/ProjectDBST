import React from "react";
import "../style.css";
import LoginCard from "../components/LoginCard";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import RecoverCard from "../components/RecoverCard";
class RecoverPassword extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (

            <div className="flex w-full h-screen bg-deep-sea-green">
                <div className="w-1/2 bg-deep-sea-green flex flex-col items-center justify-center">
                    <div className="flex justify-center mb-9">
                        <Carousel className="w-1/4" autoPlay={true} infiniteLoop={true} showArrows={false} showThumbs={false} transitionTime={'10s'} showStatus={false} showIndicators={false}>
                            <div className="">
                                <img src={require('../assets/imgs/surgeon.png')} alt="woman-surgeon" className="object-cover w-fit"></img>
                            </div>
                            <div className="">
                                <img src={require('../assets/imgs/surgeon.png')} alt="woman-surgeon" className="object-cover w-fit"></img>
                            </div>
                            <div className="">
                                <img src={require('../assets/imgs/surgeon.png')} alt="woman-surgeon" className="object-cover w-fit"></img>
                            </div>
                            <div className="">
                                <img src={require('../assets/imgs/surgeon.png')} alt="woman-surgeon" className="object-cover w-fit"></img>
                            </div>
                        </Carousel>
                    </div>
                    <div className="h-1/4">
                        <h1 className="text-white text-center font-bold text-4xl">Infinita HealthCare</h1>
                        <h1 className="text-white text-center font-medium text-2xl  ">LoremIpsum</h1>
                        <p className="text-white text-center ">Las mejores consultas al alcance de tu mano</p>
                    </div>

                </div>
                <div className="w-1/2 bg-gray-100 flex justify-center items-center" style={{ borderRadius: '10rem 0rem 0rem 10rem ' }}>
                    <RecoverCard />
                </div>
            </div>
        );
    }

}

export default RecoverPassword;