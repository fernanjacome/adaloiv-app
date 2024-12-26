import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "./Panel.css"; // Import the CSS file for styling
import Settings from "./Sections/Settings";
import Dashboard from "./Sections/Dashboard";
import Profile from "./Sections/Profile";
import Logout from "./Sections/Logout";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const Panel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      case "logout":
        return <Logout onConfirm={handleLogoutConfirm} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="panel-container">
      {loading && <Spinner />}
      <Navbar
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />
      <div className="content-container">
        <Header />
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Panel;
