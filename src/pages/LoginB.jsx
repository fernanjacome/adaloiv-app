import React, { useState } from "react";
import axios from "axios";
const LoginB = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="App">
      <div className="container-login">
        <form className="form-app" onSubmit={handleLogin}>
          <div className="form-title">
            <h2>Login Paciente</h2>

            <p>Por favor ingrese su numero de cedula.</p>
          </div>
          <div className="form-user">
            <label>Cedula</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
  );
};

export default LoginB;
