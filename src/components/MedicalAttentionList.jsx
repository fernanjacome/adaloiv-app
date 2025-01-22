import React, { useState } from "react";

const MedicalAttentionList = ({ data }) => {
  console.log(data);

  // Estado para controlar qué card tiene la receta abierta
  const [openCardId, setOpenCardId] = useState(null);

  const toggleCard = (id) => {
    setOpenCardId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div
      className="medical-attention-container"
      style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
    >
      {data.map((attention) => (
        <div
          key={attention.Atemed_id}
          className="card"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            width: "300px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ color: "#333" }}>Atención ID: {attention.Atemed_id}</h3>
          <p>
            <strong>Paciente ID:</strong> {attention.Atemed_Pcte_Id}
          </p>
          <p>
            <strong>Profesional ID:</strong> {attention.Atemed_Prof_id}
          </p>
          <p>
            <strong>Entidad ID:</strong> {attention.Atemed_Ent_id}
          </p>
          <p>
            <strong>Fecha Inicio:</strong>{" "}
            {new Date(attention.Atemed_Fecha_Inicio).toLocaleDateString()}
          </p>
          <p>
            <strong>Hora Inicio:</strong> {attention.Atemed_Hora_Inicio}
          </p>
          <p>
            <strong>Fecha Fin:</strong>{" "}
            {new Date(attention.Atemed_Fecha_Fin).toLocaleDateString()}
          </p>
          <p>
            <strong>Hora Fin:</strong> {attention.Atemed_Hora_Fin}
          </p>
          <p>
            <strong>Con Diagnóstico:</strong>{" "}
            {attention.Atemed_Con_Diagnostico || "No especificado"}
          </p>
          <p>
            <strong>Diagnóstico Cronico:</strong>{" "}
            {attention.Atemed_Cron_Diag || "No especificado"}
          </p>
          <p>
            <strong>Diagnóstico:</strong>{" "}
            {attention.Atemed_Diagnostico_CIE10 || "No especificado"}
          </p>
          <p>
            <strong>Tipo Diagnóstico:</strong>{" "}
            {attention.Atemed_Tipo_Diag || "No especificado"}
          </p>
          <p>
            <strong>Tipo Atención:</strong> {attention.Atemed_Tipo_Ate}
          </p>
          <a
            href="#!"
            onClick={() => toggleCard(attention.Atemed_id)}
            style={{
              display: "inline-block",
              color: "#007BFF",
              textDecoration: "underline",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Ver receta
          </a>

          {/* Mostrar la receta si esta card está abierta */}
          {openCardId === attention.Atemed_id && (
            <div
              className="receta-card"
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <h4>Receta:</h4>
              <p>{attention.Atemed_Receta || "No disponible"}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MedicalAttentionList;
