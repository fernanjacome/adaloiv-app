import React from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { FaIdCard, FaUser } from "react-icons/fa";
import { IoMedical } from "react-icons/io5";

const Header = ({ isProfesional }) => {
  const location = useLocation();
  const { userData } = location.state || {};
  return (
    <header className="header">
      <nav className="header-nav">
        {userData && isProfesional ? (
          <div className="info-profesional">
            <p className="user-data-p">
              <FaUserDoctor />
              <strong>Profesional: </strong>
              {userData.Prof_FullNombre}{" "}
            </p>
            <p className="user-data-p">
              <FaIdCard />
              <strong>Cedula:</strong> {userData.Prof_Id}
            </p>
            <p className="user-data-p">
              <IoMedical />
              <strong>Especialidad:</strong> {userData.Especialización}
            </p>
          </div>
        ) : (
          <div className="info-profesional">
            <p className="user-data-p">
              <FaUser />
              <strong>Paciente: </strong> {userData?.Data.Pcte_nom}
            </p>

            <p className="user-data-p">
              <FaIdCard />
              <strong>Cedula: </strong> {userData?.Data.Pcte_id}
            </p>
          </div>
        )}
      </nav>
      <div className="header-left">
        <h1>Sistema MSP Distrito 12D01</h1>
      </div>
    </header>
  );
};

export default Header;
