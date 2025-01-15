import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register/Register";
import LoginPro from "./pages/Login/LoginPro";
import LoginPaciente from "./pages/Login/LoginPaciente";
import Panel from "./pages/Panel";
import Prueba from "./pages/Login/Prueba";

const App = () => {
  const [showLoginA, setShowLoginA] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            showLoginA ? (
              <LoginPro setShowLoginA={setShowLoginA} />
            ) : (
              <LoginPaciente setShowLoginA={setShowLoginA} />
            )
          }
        />
        <Route path="/prueba" element={<Prueba />} />
        <Route
          path="/login"
          element={
            showLoginA ? (
              <LoginPro setShowLoginA={setShowLoginA} />
            ) : (
              <LoginPaciente setShowLoginA={setShowLoginA} />
            )
          }
        />
        <Route
          path="/LoginB"
          element={<LoginPaciente setShowLoginA={setShowLoginA} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </Router>
  );
};

export default App;
