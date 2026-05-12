import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Table from "../components/Table";
import Th from "../components/Th";
import Tr from "../components/Tr";

const PersonaList = () => {
    const [personas, setPersonas] = useState([]);

    console.log('PersonaList renderizado');

    //hooks
    useEffect(() => {
        const fetchPersonas = () => {
            axios.get("http://localhost:3000/personas")
                .then((response) => {
                    console.log(response.data);
                    setPersonas(response.data);
                });
        }
        fetchPersonas();
    }, []);

    return (
        <div>
            <Menu />

            <Table>
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                        <Th>Id</Th>
                        <Th>Nombre</Th>
                        <Th>Apellido</Th>
                        <Th>Edad</Th>
                        <Th>Ciudad</Th>
                        <Th>Fecha de nacimiento</Th>
                        <Th>UsuarioId</Th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <Tr key={persona.id}>
                            <td className="px-4 py-2">{persona.id}</td>
                            <td className="px-4 py-2">{persona.nombre}</td>
                            <td className="px-4 py-2">{persona.apellido}</td>
                            <td className="px-4 py-2">{persona.edad}</td>
                            <td className="px-4 py-2">{persona.ciudad}</td>
                            <td className="px-4 py-2">{persona.fechaNacimiento}</td>
                            <td className="px-4 py-2">{persona.usuarioId}</td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}



export default PersonaList;