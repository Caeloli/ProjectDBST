import React from "react";
import { useEffect, useState } from "react";

function LogRow(props) {
    const log = props.log;
    // console.log(log)
    const selectionRow = props.selectionRow;
    const setSelectedCell = props.setSelectedCell;
    const selectedCell = props.selectedCell;

    const sendDataToParent = (value) => {
        console.log(value)
        selectionRow(value)
        setSelectedCell(value);
    }

    return (
        <div className={`
        grid
        grid-cols-3
        p-2
        table-element 
        hover:bg-deep-sea-green 
        hover:cursor-pointer 
        hover:text-aqua-squeeze 
        hover:border-r-aqua-squeeze
        transition-all 
        ease-in-out
        ${selectedCell === log.idRegistroBitacora ? 'text-aqua-squeeze  bg-deep-sea-green ' : 'bg-white text-deep-sea-green'}`
        }
         
        style={{ borderBottom: "solid 0.1rem #0B5755" }}
        onClick={ () => {
            sendDataToParent(log.idRegistroBitacora);

        } }
        >
            <h3 className="col-span-1 font-semibold text-lg pl-3">{log.idRegistroBitacora}<span className="text-base pl-2">|</span></h3>
            <p className="pl-3 col-span-2">{log.fecha}</p>
        </div>
    );

}

export default LogRow;