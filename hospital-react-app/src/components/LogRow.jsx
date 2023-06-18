import React from "react";
import { useEffect, useState } from "react";

function LogRow(props) {
    const log = props.log;

    console.log("En log");
    console.log(log);

    return (
        <div className="
        grid
        grid-cols-3
        p-2
        table-element 
        text-deep-sea-green
        hover:bg-deep-sea-green 
        hover:cursor-pointer 
        hover:text-aqua-squeeze 
        hover:border-r-aqua-squeeze
        transition-all 
        ease-in-out
        "  style={{ borderBottom: "solid 0.1rem #0B5755" }}>
            <h3 className="col-span-1 font-semibold text-lg pl-3">Núm <span className="text-base pl-2">|</span></h3>
            <p className="pl-3 col-span-2">Fecha</p>
        </div>
    );

}

export default LogRow;