import { NavLink } from "react-router";

const Menu = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Personas</NavLink></li>
                <li><NavLink to="/form">Formulario</NavLink></li>
            </ul>
        </nav>
    );
}

export default Menu;