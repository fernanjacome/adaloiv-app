import React, { useState } from "react";
import "./ConsultaMedica.css"; // Asegúrate de que la ruta sea correcta

const ConsultaMedica = () => {
  const [AtemedId, setAtemedId] = useState("");
  const [atemedData, setAtemedData] = useState(null);
  const [error, setError] = useState(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false); // Estado para controlar visibilidad del panel

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPanelVisible(true);
    if (!AtemedId) {
      alert("Por favor, ingresa un ID");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/atemed/profesional/${AtemedId}/`
      );

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setAtemedData(data.data);
        setError(null);
      } else {
        throw new Error("No se encontró el Atemed con ese ID");
      }
    } catch (error) {
      setError(error.message);
      setAtemedData(null);
    }
  };

  // Función para cerrar el panel
  const handleClosePanel = () => {
    setIsPanelVisible(false);
  };

  return (
    <div className=" consulta-medica container">
      <div className="form-column">
        <h2>Buscar Atención Medica</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="AtemedId">Ingrese el ID de la Atención medica:</label>
          <input
            type="text"
            id="AtemedId"
            value={AtemedId}
            onChange={(e) => setAtemedId(e.target.value)}
            placeholder="12345689"
          />
          <button className="buscar" type="submit">
            Buscar
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>

      <div className="details-column">
        {isPanelVisible && atemedData && (
          <div className="atemed-details">
            <button className="close-btn" onClick={handleClosePanel}>
              ×
            </button>
            {/* Botón para cerrar */}
            <h3>Detalles de la Atencion Medica</h3>

            <div className="atemed-info">
              <div className="atemed-section">
                <p>
                  <strong>ID:</strong> {atemedData.Atemed_id}
                </p>
                <p>
                  <strong>Profesional ID:</strong> {atemedData.Atemed_Prof_id}
                </p>
                <p>
                  <strong>Paciente ID:</strong> {atemedData.Atemed_Pcte_Id}
                </p>
                <p>
                  <strong>Entidad ID:</strong> {atemedData.Atemed_Ent_id}
                </p>
              </div>

              <div className="atemed-section diagnosis">
                <p>
                  <strong>Diagnóstico CIE10:</strong>{" "}
                  {atemedData.Atemed_Diagnostico_CIE10}
                </p>
                <p>
                  <strong>Diagnóstico Cronológico:</strong>{" "}
                  {atemedData.Atemed_Cron_Diag}
                </p>
                <p>
                  <strong>Tipo de diagnóstico:</strong>{" "}
                  {atemedData.Atemed_Tipo_Diag}
                </p>
                <p>
                  <strong>Condición del diagnóstico:</strong>{" "}
                  {atemedData.Atemed_Con_Diagnostico}
                </p>
              </div>

              <div className="atemed-section">
                <p>
                  <strong>Tipo de atención:</strong>{" "}
                  {atemedData.Atemed_Tipo_Ate}
                </p>
                <p>
                  <strong>Fecha de inicio:</strong>{" "}
                  {atemedData.Atemed_Fecha_Inicio}
                </p>
                <p>
                  <strong>Hora de inicio:</strong>{" "}
                  {atemedData.Atemed_Hora_Inicio}
                </p>
                <p>
                  <strong>Fecha de fin:</strong> {atemedData.Atemed_Fecha_Fin}
                </p>
                <p>
                  <strong>Hora de fin:</strong> {atemedData.Atemed_Hora_Fin}
                </p>
              </div>

              <div className="atemed-section">
                <p>
                  <strong>Receta:</strong>{" "}
                  {atemedData.Atemed_Receta || "No disponible"}
                </p>
                <p>
                  <strong>Nota no obligatoria:</strong>{" "}
                  {atemedData.Atemed_Not_Oblig || "No disponible"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultaMedica;
