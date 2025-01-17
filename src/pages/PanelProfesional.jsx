import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "./PanelProfesional.css";
import ConsultaMedica from "./Sections/ConsultaMedica";
import ConsultaPaciente from "./Sections/ConsultaPaciente";
import Logout from "./Sections/Logout";
import Spinner from "../components/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import RegistroAtencionMedica from "./Sections/RegistroAtencionMedica";
import RegistroPaciente from "./Sections/RegistroPaciente";

const PanelProfesional = () => {
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
      navigate("/login-profesional");
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "consultaMedica":
        return <ConsultaMedica />;
      case "registroAtencionMedica":
        return <RegistroAtencionMedica />;
      case "consultaPaciente":
        return <ConsultaPaciente />;
      case "registroPaciente":
        return <RegistroPaciente />;
      case "logout":
        return <Logout onConfirm={handleLogoutConfirm} />;
      default:
        return <ConsultaMedica />;
    }
  };

  return (
    <div className="panel-container">
      {loading && <Spinner />}

      <Navbar isProfesional={true} setActiveTab={setActiveTab} />
      <div className="content-container">
        <Header userData={userData} isProfesional={true} />
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default PanelProfesional;
