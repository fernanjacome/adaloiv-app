import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "@Components/Card";
import Spinner from "../../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const closeModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validaciones antes de enviar
    if (!validateEmail(formData.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.passwordConfirm,
      });
      if (response.status === 201) {
        setMessage("Registration successful!");
        navigate("/login"); // Redirige al login tras registrarse
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorMessage(
          "Error: " + Object.values(error.response.data).join(". ")
        );
        setShowErrorModal(true);
      } else {
        setErrorMessage("An unexpected error occurred.");
        setShowErrorModal(true);
      }
      setLoading(false);
    }
  };

  return (
    <section className="login">
      {loading && <Spinner />}
      <div className="App">
        <form className="form-app" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-title">
            <h2>Register</h2>
            <p>¡Bienvenido de vuelta! Por favor ingresa tus credenciales.</p>
          </div>
          <hr
            style={{
              width: "100%",
              margin: "0 0 1rem 0",
              borderColor: "#e8e8e8",
            }}
          ></hr>
          <input type="text" name="fakeUsername" style={{ display: "none" }} />
          <input type="text" name="fakeUsername" style={{ display: "none" }} />
          <input
            type="password"
            name="fakePassword"
            style={{ display: "none" }}
          />
          <div className="form-user">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="new-user"
            />
          </div>
          <div className="form-user">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-user">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-user">
            <label>Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <button
            className="form-button"
            type="submit"
            disabled={
              isSubmitting ||
              !formData.username ||
              !formData.password ||
              !formData.email ||
              !formData.passwordConfirm
            }
          >
            Register
          </button>
          <div className="form-register-login">
            <button
              className="form-button register"
              onClick={() => navigate("/login")}
            >
              ¿Ya tienes una cuenta?
            </button>
          </div>
        </form>
        {showErrorModal && (
          <Card message={errorMessage} closeModal={closeModal} />
        )}
      </div>
    </section>
  );
};

export default Register;
