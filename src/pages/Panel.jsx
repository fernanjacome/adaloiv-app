import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "./Panel.css";
import ConsultaMedica from "./Sections/ConsultaMedica";
import Profile from "./Sections/ConsultaPaciente";
import Logout from "./Sections/Logout";
import Spinner from "../components/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import RegistroAtencionMedica from "./Sections/RegistroAtencionMedica";

const Panel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { userData } = location.state || {};

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
      case "consultaMedica":
        return <ConsultaMedica />;
      case "registroAtencionMedica":
        return <RegistroAtencionMedica />;
      case "consultaPaciente":
        return <Profile />;
      case "logout":
        return <Logout onConfirm={handleLogoutConfirm} />;
      default:
        return <ConsultaMedica />;
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
        <Header userData={userData} />
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Panel;
