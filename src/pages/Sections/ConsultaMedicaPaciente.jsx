import React, { useState, useEffect } from "react";
import "./ConsultaMedica.css"; // Asegúrate de que la ruta sea correcta
import MedicalAttentionList from "../../components/MedicalAttentionList";

const ConsultaMedicaPaciente = ({ userData }) => {
  const [atemedData, setAtemedData] = useState(null);
  const [error, setError] = useState(null);
  const [medicalData, setMedicalData] = useState(null);

  console.log(userData);

  useEffect(() => {
    const fetchAtencionMedica = async () => {
      if (userData.Data.Pcte_id) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/atemed/${userData.Data.Pcte_id}/`
          );

          if (!response.ok) {
            throw new Error("Error al obtener los datos de la API");
          }
          const data = await response.json();

          const atencionesMedicas = data.data;
          console.log(atencionesMedicas);
          setMedicalData(atencionesMedicas);
        } catch (error) {
          console.error("Error:", error.message);
          setError("Hubo un error al cargar las atenciones médicas.");
        }
      } else {
        setError("No se encontró el Atemed con ese ID");
      }
    };

    fetchAtencionMedica();
  }, []);

  return (
    <div className="consulta-medica-paciente container">
      <div className="form-column">
        <h2>Buscar Atención Médica</h2>
      </div>
      {error && <p className="error-message">{error}</p>}
      {medicalData && <MedicalAttentionList data={medicalData} />}
    </div>
  );
};

export default ConsultaMedicaPaciente;
