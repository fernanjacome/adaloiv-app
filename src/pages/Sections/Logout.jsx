import React from "react";

const Logout = ({ onConfirm }) => {
  return (
    <div className="logout-container">
      <h2>Cerrar sesión</h2>
      <p>¿Estás seguro de que deseas cerrar sesión?</p>
      <button className="confirm-button" onClick={onConfirm}>
        Confirmar
      </button>
    </div>
  );
};

export default Logout;
