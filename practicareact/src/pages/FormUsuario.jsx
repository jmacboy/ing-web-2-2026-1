import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { useNavigate, useParams } from "react-router";
import Input from "../components/Input";
import Button from "../components/Button";
import Container from "../components/Container";
import moment from "moment";

const FormUsuario = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [edad, setEdad] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')

    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchUserById = (id) => {
            axios.get(`http://localhost:3000/personas/${id}`)
                .then((response) => {
                    const persona = response.data;
                    setEmail(persona.usuario.email);
                    setNombre(persona.nombre);
                    setApellido(persona.apellido);
                    setEdad(persona.edad);
                    setCiudad(persona.ciudad);
                    setFechaNacimiento(
                        moment.utc(persona.fechaNacimiento).format('YYYY-MM-DD')
                    );
                });
        };
        fetchUserById(id);
    }, [id]);

    const registerUser = () => {
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
                alert('Error al crear el usuario');
            });
    }
    const updateUser = () => {
        axios.put(`http://localhost:3000/auth/update/${id}`, {
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento,
            email
        })
            .then((response) => {
                console.log('Usuario actualizado:', response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Error al actualizar el usuario:', error);
                alert('Error al actualizar el usuario');
            });
    }
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
        if (id) {
            updateUser();
        } else {
            registerUser();
        }

    }
    return (
        <>
            <Menu />
            <Container>

                <h1 className="text-xl">Formulario de Usuario</h1>
                <form onSubmit={onFormUsuarioSubmitted}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <Input value={email} type="email" id="email" name="email" required
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    {!id && (
                        <div>
                            <label htmlFor="password">Password:</label>
                            <Input value={password} type="password" id="password" name="password" required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <Input value={nombre} type="text" id="nombre" name="nombre" required
                            onChange={(e) => {
                                setNombre(e.target.value);
                            }}
                        />
                        El nombre es: {nombre}
                    </div>
                    <div>
                        <label htmlFor="apellido">Apellido:</label>
                        <Input value={apellido} type="text" id="apellido" name="apellido" required
                            onChange={(e) => {
                                setApellido(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="edad">Edad:</label>
                        <Input value={edad} type="number" id="edad" name="edad" required
                            onChange={(e) => {
                                setEdad(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="ciudad">Ciudad:</label>
                        <Input value={ciudad} type="text" id="ciudad" name="ciudad" required
                            onChange={(e) => {
                                setCiudad(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                        <Input value={fechaNacimiento} type="date" id="fechaNacimiento" name="fechaNacimiento" required
                            onChange={(e) => {
                                setFechaNacimiento(e.target.value);
                            }}
                        />
                    </div>
                    <Button variant="primary" type="submit">Enviar</Button>
                </form>
            </Container>
        </>
    );
}

export default FormUsuario;