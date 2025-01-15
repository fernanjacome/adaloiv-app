import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@Components/Card";
import Spinner from "../../components/Spinner";

const LoginPro = ({ setShowLoginA }) => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("rememberedUsername", email);
    } else {
      localStorage.removeItem("rememberedUsername");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login-profesional/", {
        email: email,
        id: password,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("AccessToken", response.data.access_token);
        localStorage.setItem("RefreshToken", response.data.refresh_token);
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", email);
        } else {
          localStorage.removeItem("rememberedUsername");
        }
        setIsSubmitting(false);
        setLoading(false);
        navigate("/panel", { state: { userData: response.data } });
        console.log("Login successful", response.data);
      }
    } catch (error) {
      if (error.response) {
        // Errores específicos del servidor
        setErrorMessage(error.response.data.error || "Error en el servidor.");
      } else if (error.request) {
        // Errores de red
        setErrorMessage(
          "No se pudo conectar con el servidor. Intente de nuevo."
        );
      } else {
        // Otros errores
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
                <a href="/loginB">Ingresar como paciente</a>
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
