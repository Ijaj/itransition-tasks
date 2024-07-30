import { Navigate } from "react-router-dom";

import constants from "../../constants";

export default function ProtectedRoute({ children }) {
    const token = sessionStorage.getItem(constants.k_token);

    if (!token) {
        sessionStorage.removeItem(constants.k_id);
        return <Navigate to="/login" replace />;
    }
    return children;
};