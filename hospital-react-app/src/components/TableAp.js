import React from "react";

class TableAp extends React.Component {
    constructor(props) {
        super(props);
    }


    setHeaderTable(titles) {

        if (!titles) {
            return null;
        }

        return titles.map((element, index) => (
            <th key={index} className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">{element}</div>
            </th>
        ));
    }


    setBodyTable(data) {
        if (!data || !Array.isArray(data)) {
            return null;
        }
        console.log("Análisis tabla");
        return data.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-2 whitespace-nowrap">
                    {cell}
                    </td>
                ))}
            </tr>
        ));;
    }

    render() {
        const { headerTitle, headerTable, tableInfo } = this.props;
        console.log(this.props);
        return (
            <div className="w-auto max-w-full max-h-full h-full mx-auto bg-white shadow-lg rounded-3xl border  border-blue-hosta">
                <header className="px-5 py-4 ">
                    <h2 className="font-semibold text-gray-800">{headerTitle}</h2>
                </header>

                <div className="overflow-y-auto max-h-full">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                {this.setHeaderTable(headerTable)}
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                            {this.setBodyTable(tableInfo)}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default TableAp;