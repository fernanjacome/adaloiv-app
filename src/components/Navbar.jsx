import React from "react";
import {
  FaSignOutAlt,
  FaNotesMedical,
  FaUserInjured,
  FaUserPlus,
  FaUserEdit,
} from "react-icons/fa";
import "./Navbar.css";

import logo from "../assets/images/logo.png";
import flags from "../assets/images/flags.webp";
import { MdMedicalServices } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";

const Navbar = ({ setActiveTab, isProfesional, isPaciente }) => {
  return (
    <nav className="navbar">
      <div className="navbar-header">
        <img src={logo} className="logo-navbar" alt="logo" />
      </div>
      <ul>
        <li>
          {isPaciente && (
            <button onClick={() => setActiveTab("inicioPaciente")}>
              <RiFileUserFill /> <span>Información del Paciente</span>
            </button>
          )}
        </li>
        <li>
          <button onClick={() => setActiveTab("consultaMedica")}>
            <FaNotesMedical /> <span>Consulta Atención Medica</span>
          </button>
        </li>

        <li>
          {isProfesional && (
            <button onClick={() => setActiveTab("registroAtencionMedica")}>
              <MdMedicalServices /> <span>Registro Atención Medica</span>
            </button>
          )}
        </li>

        <li>
          {isProfesional && (
            <button onClick={() => setActiveTab("consultaPaciente")}>
              <FaUserInjured /> <span>Consulta de paciente</span>
            </button>
          )}
        </li>
        <li>
          {isProfesional && (
            <button onClick={() => setActiveTab("registroPaciente")}>
              <FaUserPlus /> <span>Registro de paciente</span>
            </button>
          )}
        </li>
        <li>
          {isProfesional && (
            <button onClick={() => setActiveTab("editarPaciente")}>
              <FaUserEdit /> <span>Editar paciente</span>
            </button>
          )}
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
