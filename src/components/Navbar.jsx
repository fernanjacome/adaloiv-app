import React from "react";
import { FaSignOutAlt, FaNotesMedical, FaUserInjured } from "react-icons/fa";
import "./Navbar.css";

import logo from "../assets/images/logo.png";
import { MdMedicalServices } from "react-icons/md";

const Navbar = ({ setActiveTab, toggleCollapse }) => {
  return (
    <nav className="navbar">
      <div className="navbar-header">
        <img src={logo} className="logo-navbar" alt="logo" />
      </div>
      <ul>
        <li>
          <button onClick={() => setActiveTab("consultaMedica")}>
            <FaNotesMedical /> <span>Consulta Atención Medica</span>
          </button>
        </li>

        <li>
          <button onClick={() => setActiveTab("registroAtencionMedica")}>
            <MdMedicalServices /> <span>Registro Atención Medica</span>
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab("consultaPaciente")}>
            <FaUserInjured /> <span>Consulta de paciente</span>
          </button>
        </li>

        <li>
          <button onClick={() => setActiveTab("logout")}>
            <FaSignOutAlt /> <span>Salir</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
