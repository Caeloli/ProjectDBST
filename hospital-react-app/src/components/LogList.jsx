import React, { useState } from "react";
import LogRow from "./LogRow";

function LogList(props) {
    const logs = props.logs;
    const selectionLogList = props.selectionLogList;
    const [selectedCell, setSelectedCell] = useState(null);

    return (
        <div className="border-2 border-deep-sea-green">
            <h2 className="text-xl text-deep-sea-green font-semibold pl-3 py-2 sticky top-0 shadow" style={{ borderBottom: "solid 0.1rem #0B5755" }}>
                Registros Bitácora
            </h2>
            <div className="overflow-y-auto max-h-full" style={{ maxHeight: "48rem" }}>
                {
                    logs != null ? logs.map((log, index) => (
                        <LogRow log={log} key={index} selectionRow={selectionLogList} setSelectedCell={setSelectedCell} selectedCell={selectedCell}/>
                    ))
                    : <div>Sin bitacora aún</div>
                }
            </div>
        </div>
    );
}

export default LogList;