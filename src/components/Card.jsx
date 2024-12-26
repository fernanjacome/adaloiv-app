import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

export const Card = ({ message, closeModal }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const capitalizeWords = (str) => {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const formatDate = () => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      const date = new Date();
      const formattedDate = date.toLocaleDateString("es-ES", options);
      const capitalizedDate = capitalizeWords(formattedDate);
      setCurrentDate(capitalizedDate);
    };

    formatDate();
    // Retrasar ligeramente la visibilidad para que la animación funcione
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const handleClose = () => {
    setIsExiting(true); // Activar animación de cierre
    setTimeout(() => {
      setIsVisible(false); // Retirar del DOM después de la animación
      closeModal(); // Llamar a la función de cierre
    }, 200); // Tiempo igual a la duración de la animación (0.5s)
  };

  return (
    <div className="modal-overlay">
      <div
        className={`modal-card ${isVisible && !isExiting ? "show" : "close"}`}
      >
        <MdCancel style={{ fontSize: "5rem", color: "#F1416C" }} />
        <p>{message}</p>
        <button onClick={handleClose} className="close-btn">
          Ok, entendido!
        </button>
        <div className="modal-footer">
          <hr />
          <p className="modal-date">{currentDate}</p>
        </div>
      </div>
    </div>
  );
};
