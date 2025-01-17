import React from "react";
import "./Header.css";
import { useUserContext } from "../context/UserContext";
const Header = ({ isProfesional }) => {
  const { userData } = useUserContext();
  return (
    <header className="header">
      <nav className="header-nav">
        <ul>
          <li>
            <li>
              {userData && isProfesional ? (
                <div className="info-profesional">
                  <p className="user-data-p">
                    <strong>Profesional: </strong>
                    {userData.Prof_FullNombre}{" "}
                  </p>
                  <p className="user-data-p">
                    <strong>Cedula:</strong> {userData.Prof_Id}
                  </p>
                  <p className="user-data-p">
                    <strong>Especialidad:</strong> {userData.Especialización}
                  </p>
                </div>
              ) : (
                <div className="info-profesional">
                  <p className="user-data-p">
                    <strong>Paciente:</strong> {userData?.Data.Pcte_nom}
                  </p>

                  <p className="user-data-p">
                    <strong>Cedula:</strong> {userData?.Data.Pcte_id}
                  </p>
                </div>
              )}
            </li>
          </li>
        </ul>
      </nav>
      <div className="header-left">
        <h1>Sistema MSP Distrito 12D01</h1>
      </div>
    </header>
  );
};

export default Header;
