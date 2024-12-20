import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

export const Card = ({ message, closeModal }) => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Función para formatear la fecha una sola vez
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
      setCurrentDate(formattedDate); // Guardamos la fecha formateada en el estado
    };

    formatDate(); // Llamamos la función cuando el componente se monta
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <MdCancel style={{ fontSize: "5rem", color: "#F1416C" }} />
        <p>{message}</p>
        <button onClick={closeModal} className="close-btn">
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
