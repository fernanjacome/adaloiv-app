import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginA from "./pages/LoginA";
import LoginB from "./pages/LoginB";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginA />} />
        <Route path="/login" element={<LoginA />} />
        <Route path="/LoginB" element={<LoginB />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
