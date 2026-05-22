import axios from "axios";
import { getToken } from "../utils/TokenUtilities";

export const authService = {
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:3000/auth/login", {
                email: email,
                password: password
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error('Error al iniciar sesión:', error);
                    reject(error);
                });
        });
    },
    me: () => {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:3000/auth/me", {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.error('Error al obtener información del usuario:', error);
                reject(error);
            });
        });
    }
}