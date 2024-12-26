import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginB = ({ setShowLoginA }) => {
  const [cedula, setCedula] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedCedula = localStorage.getItem("rememberedCedula");
    if (savedCedula) {
      setCedula(savedCedula);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("rememberedCedula", cedula);
    } else {
      localStorage.removeItem("rememberedCedula");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        cedula: cedula,
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
      setErrorMessage("Invalid credentials, please try again.");
    }
  };

  return (
    <section className="login">
      <div className="App">
        <div className="container-login">
          <form className="form-app" onSubmit={handleLogin}>
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
              />
            </div>
            <div className="form-options">
              <div className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label>Recordarme</label>
              </div>
              <div className="">
                <a href="/login">Ingresar como doctor</a>
              </div>
            </div>
            <div className="form-buttons">
              <button className="form-button" type="submit">
                Login
              </button>
              <button className="form-button register" type="submit">
                Register
              </button>
            </div>
          </form>
          <div></div>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </section>
  );
};

export default LoginB;
