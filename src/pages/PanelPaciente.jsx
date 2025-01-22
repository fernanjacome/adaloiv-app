import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "./PanelPaciente.css";
import ConsultaMedica from "./Sections/ConsultaMedica";
import Logout from "./Sections/Logout";
import Spinner from "../components/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import InicioPaciente from "./Sections/InicioPaciente";
import ConsultaMedicaPaciente from "./Sections/ConsultaMedicaPaciente";

const PanelPaciente = () => {
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
      case "inicioPaciente":
        return <InicioPaciente userData={userData} />;
      case "consultaMedica":
        return <ConsultaMedicaPaciente userData={userData} />;
      case "logout":
        return <Logout onConfirm={handleLogoutConfirm} />;
      default:
        return <InicioPaciente />;
    }
  };

  return (
    <div className="panel-container">
      {loading && <Spinner />}

      <Navbar
        setActiveTab={setActiveTab}
        isProfesional={false}
        isPaciente={true}
      />
      <div className="content-container">
        <Header userData={userData} />
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default PanelPaciente;
