import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@Components/Card";
import Spinner from "../../components/Spinner";

const LoginPro = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login-profesional/",
        {
          email: email,
          id: password,
        }
      );
      if (response.status === 200) {
        setIsSubmitting(false);
        setTimeout(() => {
          setLoading(false);

          navigate("/panel-profesional", {
            state: { userData: response.data },
          });
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Error en el servidor.");
      } else if (error.request) {
        setErrorMessage(
          "No se pudo conectar con el servidor. Intente de nuevo."
        );
      } else {
        setErrorMessage("Ocurrió un error inesperado. Intente más tarde.");
      }
      setIsSubmitting(false);
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
              <h2>Doctor</h2>

              <p>Por favor ingrese sus credenciales.</p>
            </div>

            <hr
              style={{
                width: "100%",
                margin: "0 0 1rem 0",
                borderColor: "#e8e8e8",
              }}
            ></hr>
            <div className="form-user">
              <label>Correo electronico</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="new-user"
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
                <a href="/login-paciente">Ingresar como paciente</a>
              </div>
            </div>

            <div className="form-buttons">
              <button
                className="form-button"
                type="submit"
                disabled={isSubmitting || !email || !password}
              >
                Ingresar
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

export default LoginPro;
