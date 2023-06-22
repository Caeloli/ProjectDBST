import React, { useState } from "react";
import LogRow from "./LogRow";
import RecetaRow from "./RecetaLow";

function RecetasList(props) {
    const recetas = props.recetas;
    const selectionRecetaList = props.selectionRecetaList;
    const [selectedCell, setSelectedCell] = useState(null);

    return (
        <div className="border-2 border-deep-sea-green">
            <h2 className="text-xl text-deep-sea-green font-semibold pl-3 py-2 sticky top-0 shadow" style={{ borderBottom: "solid 0.1rem #0B5755" }}>
                Recetas médicas
            </h2>
            <div className="overflow-y-auto max-h-full" style={{ maxHeight: "48rem" }}>
                {
                    recetas != null ? recetas.map((receta, index) => (
                        <RecetaRow receta={receta} key={index} selectionRow={selectionRecetaList} setSelectedCell={setSelectedCell} selectedCell={selectedCell}/>
                    ))
                    : <div>Sin recetas aún</div>
                }
            </div>
        </div>
    );
}

export default RecetasList;