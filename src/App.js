import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPro from "./pages/Login/LoginPro";
import LoginPaciente from "./pages/Login/LoginPaciente";
import PanelProfesional from "./pages/PanelProfesional";
import PanelPaciente from "./pages/PanelPaciente";
import { UserProvider } from "./context/UserContext";

const App = () => {
  const [showLoginA, setShowLoginA] = useState(true);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPro />} />
          <Route path="/login-profesional" element={<LoginPro />} />
          <Route path="/login-paciente" element={<LoginPaciente />} />
          <Route path="/panel-profesional" element={<PanelProfesional />} />
          <Route path="/panel-paciente" element={<PanelPaciente />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
