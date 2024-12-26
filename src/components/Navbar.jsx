import React from "react";
import {
  FaTachometerAlt,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./Navbar.css"; // Import the CSS file for styling
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
  TbMedicalCrossFilled,
} from "react-icons/tb";

const Navbar = ({ setActiveTab, isCollapsed, toggleCollapse }) => {
  return (
    <nav className={`navbar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="navbar-header">
        {isCollapsed ? (
          <TbMedicalCrossFilled style={{ fontSize: "2rem" }} />
        ) : (
          <h2>Gestion</h2>
        )}
      </div>
      <ul>
        <li>
          <button onClick={() => setActiveTab("dashboard")}>
            <FaTachometerAlt /> <span>{!isCollapsed && "Dashboard"}</span>
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab("settings")}>
            <FaCog /> <span>{!isCollapsed && "Settings"}</span>
          </button>
        </li>

        <li>
          <button onClick={() => setActiveTab("logout")}>
            <FaSignOutAlt /> <span>{!isCollapsed && "Logout"}</span>
          </button>
        </li>
      </ul>
      <div className="container-button-collapse">
        <button className="collapse-button" onClick={toggleCollapse}>
          {isCollapsed ? (
            <TbLayoutSidebarRightCollapseFilled />
          ) : (
            <TbLayoutSidebarLeftCollapseFilled />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
