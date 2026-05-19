import { useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import Menu from "../components/Menu";
import axios from "axios";
import { useNavigate } from "react-router";
import { saveToken } from "../utils/TokenUtilities";

const FormLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onFormLoginSubmitted = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/login", {
            email,
            password
        })
            .then((response) => {
                console.log('Login exitoso:', response.data);
                saveToken(response.data.token);
                navigate('/personas');
            })
            .catch((error) => {
                console.error('Error al iniciar sesión:', error);
                alert('Error al iniciar sesión');
            });
    }
    return (
        <>
            <Menu />
            <Container>

                <h1 className="text-xl">Iniciar sesión</h1>
                <form onSubmit={onFormLoginSubmitted} className="w-xs">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <Input value={email} type="email" id="email" name="email" required
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <Input value={password} type="password" id="password" name="password" required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>

                    <Button variant="primary" type="submit">Iniciar sesión</Button>
                </form>
            </Container>
        </>
    );
}

export default FormLogin;