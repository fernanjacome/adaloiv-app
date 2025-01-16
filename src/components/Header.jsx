import React from "react";
import "./Header.css"; // Import the CSS file for styling
import { FaUser } from "react-icons/fa";

const Header = ({ userData }) => {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul>
          <li>
            <li>
              {userData && (
                <div className="info-profesional">
                  <p>
                    <strong>Profesional: </strong>
                    {userData.Prof_FullNombre}{" "}
                  </p>
                  <p>
                    <strong>Cedula:</strong> {userData.Prof_Id}
                  </p>
                  <p>
                    <strong>Especialidad:</strong> {userData.Especialización}
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
