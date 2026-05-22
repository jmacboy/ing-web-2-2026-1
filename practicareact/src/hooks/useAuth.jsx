import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router";
import { getToken, removeToken } from "../utils/TokenUtilities";

export const useAuth = () => {
    const token = getToken();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserInformation = () => {
            authService.me()
                .then((response) => {
                    console.log("Información del usuario:", response);
                    setUser(response);
                })
                .catch((error) => {
                    navigate('/');
                    console.error("Error al obtener información del usuario:", error);
                });
        }
        if (token) {
            getUserInformation();
        }
    }, [token]);

    const logout = () => {
        removeToken();
        navigate('/');
        setUser(null);
    }

    return { user, token, logout };
}