import React from "react";
import LogRow from "./LogRow";

function LogList(props) {
    const logs = props.logs;

    return (
        <div className="border-2 border-deep-sea-green">
            <h2 className="text-xl text-deep-sea-green font-semibold pl-3 py-2 sticky top-0 shadow" style={{ borderBottom: "solid 0.1rem #0B5755" }}>
                Registros Bitácora
            </h2>
            <div className="overflow-y-auto max-h-full" style={{ maxHeight: "48rem" }}>
                {
                    logs.map((log, index) => (
                        <LogRow log={log} key={index} />
                    ))
                }
            </div>
        </div>
    );
}

export default LogList;