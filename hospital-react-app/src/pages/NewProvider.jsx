import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProviderRegister from "../components/ProviderRegister";
import AdminNavDashboard from "../components/admindash/AdminNavDashboard";
function NewProvider(props){

    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [providerId, setProviderId] = useState('');

    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const isEdit = searchParams.get("edit") === "true";
        const getProviderId = searchParams.get("id");
        setProviderId(getProviderId);
        setIsEditing(isEdit);
    }, searchParams)

    return (
        <div className="flex w-screen h-screen">
            <AdminNavDashboard />
            <ProviderRegister isEdit={searchParams.get("edit") === "true"} id={searchParams.get("id")} />
        </div>
    );
}

export default NewProvider;