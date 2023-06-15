import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const AuthGuard = () => {
    const userState = useSelector((store: AppStore) => store.user)
    return userState.nombre ? <Outlet/> : <Navigate replace to='/Login' />;
}



export default AuthGuard;