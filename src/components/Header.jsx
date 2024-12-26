import React from "react";
import "./Header.css"; // Import the CSS file for styling
import { FaUser } from "react-icons/fa";

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>MyApp</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <li>
              <button>
                <FaUser />
              </button>
            </li>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
