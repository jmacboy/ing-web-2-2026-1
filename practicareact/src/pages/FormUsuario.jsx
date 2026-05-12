import axios from "axios";
import { useState } from "react";
import Menu from "../components/Menu";
import { useNavigate } from "react-router";

const FormUsuario = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [edad, setEdad] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    // console.log('FormUsuario renderizado');
    const onFormUsuarioSubmitted = (e) => {
        e.preventDefault();
        console.log('Usuario Enviado:', {
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento,
            email,
            password
        });
        axios.post("http://localhost:3000/auth/register", {
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento,
            email,
            password
        })
            .then((response) => {
                console.log('Usuario creado:', response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error al crear el usuario:', error);
            });
    }
    return (<div>
        <Menu />
        <h1>Formulario de Usuario</h1>
        <form onSubmit={onFormUsuarioSubmitted}>
            <div>
                <label htmlFor="email">Email:</label>
                <input value={email} type="email" id="email" name="email" required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input value={password} type="password" id="password" name="password" required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input value={nombre} type="text" id="nombre" name="nombre" required
                    onChange={(e) => {
                        setNombre(e.target.value);
                    }}
                />
                El nombre es: {nombre}
            </div>
            <div>
                <label htmlFor="apellido">Apellido:</label>
                <input value={apellido} type="text" id="apellido" name="apellido" required
                    onChange={(e) => {
                        setApellido(e.target.value);
                    }}
                />
            </div>
            <div>
                <label htmlFor="edad">Edad:</label>
                <input value={edad} type="number" id="edad" name="edad" required
                    onChange={(e) => {
                        setEdad(e.target.value);
                    }}
                />
            </div>
            <div>
                <label htmlFor="ciudad">Ciudad:</label>
                <input value={ciudad} type="text" id="ciudad" name="ciudad" required
                    onChange={(e) => {
                        setCiudad(e.target.value);
                    }}
                />
            </div>
            <div>
                <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                <input value={fechaNacimiento} type="date" id="fechaNacimiento" name="fechaNacimiento" required
                    onChange={(e) => {
                        setFechaNacimiento(e.target.value);
                    }}
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>);
}

export default FormUsuario;