import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
const LoginA = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: username,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        // Almacenar los tokens en el almacenamiento local del navegador
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        console.log("Login successful", response.data);
        alert("Login successful");
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setShowErrorModal(true);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <div className="App">
      <div className="container-login">
        <form className="form-app" autoComplete="off" onSubmit={handleLogin}>
          <div className="form-title">
            <h2>Login</h2>

            <p>¡Bienvenido de vuelta! Por favor ingresa tus credenciales.</p>
          </div>
          <hr
            style={{
              width: "100%",
              margin: "0 0 1rem 0",
              borderColor: "#e8e8e8",
            }}
          ></hr>
          <div className="form-user">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="new-user"
            />
          </div>
          <div className="form-user">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="form-options">
            <div className="remember">
              <input type="checkbox" />
              <label>Recordarme</label>
            </div>
            <div className="">
              <a href="#">Olvide la contraseña</a>
            </div>
          </div>

          <div className="form-buttons">
            <button className="form-button" type="submit">
              Login
            </button>
            <button className="form-button register" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
        <div></div>
      </div>

      {showErrorModal && (
        <Card message={errorMessage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default LoginA;
