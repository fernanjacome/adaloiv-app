import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@Components/Card";
import Spinner from "../../components/Spinner";
import { useUserContext } from "../../context/UserContext";

const LoginPaciente = () => {
  const [cedula, setCedula] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserData } = useUserContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login-paciente/",
        {
          Pcte_id: cedula,
        }
      );
      if (response.status === 200) {
        setIsSubmitting(false);
        setTimeout(() => {
          setLoading(false);

          navigate("/panel-paciente", { state: { userData: response.data } });

          setUserData(response.data);
        }, 1000);
      }
    } catch (error) {
      setErrorMessage("No se encuentra registrado en el sistema MSP");
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
            <div className="form-options">
              <div className="">
                <a href="/login-profesional">Ingresar como doctor</a>
              </div>
            </div>
            <div className="form-buttons">
              <button
                className="form-button"
                type="submit"
                disabled={isSubmitting || !cedula}
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

export default LoginPaciente;
