import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavDashboard from "../components/admindash/AdminNavDashboard";
import ConsultingRoomRegister from "../components/ConsultingRoomRegister";
function NewConsultingRoom(props){

    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [roomId, setRoomId] = useState('');

    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const isEdit = searchParams.get("edit") === "true";
        const getRoomId = searchParams.get("id");
        setRoomId(getRoomId);
        setIsEditing(isEdit);
    }, searchParams)

    return (
        <div className="flex w-screen h-screen">
            <AdminNavDashboard />
            <ConsultingRoomRegister isEdit={searchParams.get("edit") === "true"} id={searchParams.get("id")} />
        </div>
    );
}

export default NewConsultingRoom;