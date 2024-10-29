import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        return <Navigate to={'/login'} />
    }

    if (location.pathname === '/') {
        return <Navigate to={'/home'} />
    }
    
    return <Outlet />
} 

export default PrivateRoute;