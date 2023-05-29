import React from "react";

function CarFunction(props) {

    const shoot = (a) => {
        alert(a);
    }

    return (
        <div>
            <h2> Soy un carro color {props.color} en una función</h2>
            <button onClick={() => shoot("Goal")}>Presiona el botón</button>
        </div>
    );
}

class CarClass extends React.Component {

    constructor() {
        super();
        this.state = { color: "red" };
    }

    shoot(a) {
        alert(a);
    }

    render() {
        return (
            <div>
                <h2> Soy un carro {this.props.color} en una clase</h2>
                <button onClick={() => this.shoot("Goal red")}>Presiona el botón</button>
            </div>
        );
    }
}

export {
    CarFunction,
    CarClass
};