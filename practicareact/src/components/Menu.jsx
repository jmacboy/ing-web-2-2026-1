import { useState } from "react";
import { NavLink } from "react-router";



const Navbar = ({ brand, children, className = "", ...props }) => {
    return (
        <nav
            className={`
        bg-blue-600 border-b border-gray-200 shadow-sm
        ${className}
      `}
            {...props}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {brand && (
                        <a
                            href="/"
                            className="text-xl font-medium text-white hover:text-gray-300"
                        >
                            {brand}
                        </a>
                    )}

                    <ul className="flex items-center space-x-6">
                        {children}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ href = "#", children, className = "", ...props }) => {
    return (
        <li>
            <NavLink
                to={href}
                className={`
          text-white hover:text-gray-300
          ${className}
        `}
                {...props}
            >
                {children}
            </NavLink>
        </li>
    );
};

const Dropdown = ({ label, children, className = "" }) => {
    const [open, setOpen] = useState(false);

    return (
        <li className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                cursor-pointer
          inline-flex items-center gap-1
          text-white hover:text-gray-300
          focus:outline-none
        "
            >
                {label}
                <span className="text-xs">▼</span>
            </button>

            {open && (
                <ul
                    className="
            absolute right-0 mt-2 min-w-[12rem]
            bg-white border border-gray-200
            rounded-md shadow-lg
            py-1 z-50
          "
                >
                    {children}
                </ul>
            )}
        </li>
    );
};

const DropdownItem = ({
    href = "#",
    children,
    className = "",
    ...props
}) => {
    return (
        <li>
            <NavLink
                to={href}
                className={`
          block px-4 py-2 text-sm
          text-gray-700
          hover:bg-gray-100
          ${className}
        `}
                {...props}
            >
                {children}
            </NavLink>
        </li>
    );
};

const Menu = () => {
    return (
        <Navbar brand="Mi App">
            <NavItem href="/">Inicio</NavItem>

            <Dropdown label="Personas">
                <DropdownItem href="/">Lista de Personas</DropdownItem>
                <DropdownItem href="/personas/create">Formulario de Personas</DropdownItem>
            </Dropdown>
        </Navbar>
    );
}

export default Menu;