import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@Components/Card";
import Spinner from "../../components/Spinner";

const LoginB = ({ setShowLoginA }) => {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/identification/",
        {
          identification_number: cedula,
          password: password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Almacenar los tokens en el almacenamiento local del navegador
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        setLoading(false);
        navigate("/panel");
      }
    } catch (error) {
      setErrorMessage("Invalid credentials, please try again.");
      setShowErrorModal(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  return (
    <section className="login">
      {loading && <Spinner />}
      <div className="App">
        <div className="container-login">
          <form className="form-app" autoComplete="off" onSubmit={handleLogin}>
            <div className="form-title">
              <h2>Paciente</h2>

              <p>Por favor ingrese su numero de cedula.</p>
            </div>
            <hr
              style={{
                width: "100%",
                margin: "0 0 1rem 0",
                borderColor: "#e8e8e8",
              }}
            ></hr>
            <div className="form-user">
              <label>Cedula</label>
              <input
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                autoComplete="new-cedula"
                maxLength={10}
              />
            </div>
            <div className="form-user">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="form-options">
              <div className="">
                <a href="/login">Ingresar como doctor</a>
              </div>
            </div>
            <div className="form-buttons">
              <button className="form-button" type="submit">
                Ingresar
              </button>
              <button
                className="form-button register"
                onClick={() => navigate("/register")}
              >
                Registrar nuevo paciente
              </button>
            </div>
          </form>
          <div></div>
        </div>
        {showErrorModal && (
          <Card message={errorMessage} closeModal={closeModal} />
        )}
      </div>
    </section>
  );
};

export default LoginB;
