import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Roles } from "../models/roles";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

interface Props{
    rol: Roles;
}
function RoleGuard({rol}: Props){
    const userState = useSelector((store: AppStore) => store.user);
    return userState.tipo === rol ? <Outlet /> : <Navigate replace to='/Login' />;
    
}

export default RoleGuard;