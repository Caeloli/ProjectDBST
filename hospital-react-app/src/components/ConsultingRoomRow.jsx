import { React, useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCircleXmark, faBroom } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
//props: provider, tipo
function ConsultingRoomRow(props) {
    const room = props.room;
    const isDashboard = props.tipo;
    const [showCard, setShowCard] = useState(false);
    const [isClean, setIsClean] = useState();

    const handleCleanClick = (id) => {
        setIsClean(!isClean);
        fetch(`https://localhost:44342/api/Rooms/UpdateRoomCleanStatus?piId=${id}`, {
            method: "POST",
        })
            .then(response => response.json())
            .then(data => {
                if (data.StatusCode === 200) {
                    alert(data.Message)
                } else {
                    alert(data.Message)
                }
            })
            .catch(error => {
                console.error("Error al actualizar el estado de limpieza del consultorio:", error);
            });
    };


    const handleDelete = (id) => {
        fetch(`https://localhost:44342/api/Rooms/DeleteRoom?piId=${id}`, {
            method: "POST",
        })
            .then(response => response.json())
            .then(data => {
                if (data.StatusCode === 200) {
                    alert(data.Message)
                } else {
                    alert(data.Message)
                }
            })
            .catch(error => {
                console.error("Error al borrar el consultorio:", error);
            });
    };

    useEffect(() => {
        room.estadoLimpieza ? setIsClean(true) : setIsClean(false);
    }, [room.estadoLimpieza]);

    if (isDashboard) {
        return (
            <tr>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {room.idConsultorio}
                    </div>
                </td>
                <td className="p-2  whitespace-nowrap">
                    <div className="text-left">
                        {`${room.nombreDoctor} ${room.paternoDoctor} ${room.maternoDoctor}`}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                        {isClean ? "Limpio" : "Sucio"}
                    </div>
                </td>
            </tr>
        );
    } else {
        return (
            <Fragment>
                <tr className="hover:bg-gray-100">
                    <td className="p-2  whitespace-nowrap">
                        <div className="text-left">
                            {room.idConsultorio}
                        </div>
                    </td>
                    <td className="p-2  whitespace-nowrap">
                        <div className="text-left">
                            {`${room.nombreDoctor} ${room.paternoDoctor} ${room.maternoDoctor}`}
                        </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                            {isClean ? "Limpio" : "Sucio"}
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium" onClick={() => handleCleanClick(room.idConsultorio)}>
                            <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faBroom} style={{ color: "#101D6B", }} />
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium">
                            <Link to={`/NewConsultingRoom?edit=true&id=${room.idConsultorio}`}>
                                <FontAwesomeIcon className='text-2xl hover:scale-110 translation' icon={faGear} style={{ color: "#545454", }} />
                            </Link>
                        </div>
                    </td>

                    <td className="p-2 ">
                        <div className="text-left font-medium text-green-500 hover:scale-110 translation">
                            <a href="/GestionConsultorio" onClick={() => handleDelete(room.idConsultorio)}>
                                <FontAwesomeIcon className='text-2xl' icon={faCircleXmark} style={{ color: "#ff0000", }} />
                            </a>
                        </div>
                    </td>
                </tr>
            </Fragment>
        );
    }
}

export default ConsultingRoomRow;