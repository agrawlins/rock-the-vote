import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const { token, children, redirectTo } = props
    return token ? children : <Navigate to={redirectTo}/>
}

export default ProtectedRoute