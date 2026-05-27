import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { authMember } = useGlobals();
    const location = useLocation();

    if (!authMember) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
