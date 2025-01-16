import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import "./ConsultaPaciente.css";

const ConsultaPaciente = () => {
  const [pacienteId, setPacienteId] = useState("");
  const [pacienteData, setPacienteData] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    setPacienteId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setPacienteData(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/paciente/${pacienteId}/`
      );
      setPacienteData(response.data);
      setIsModalOpen(true); // Abre el modal cuando la información del paciente esté disponible
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(`No se encontró el paciente con ID: ${pacienteId}`);
      } else {
        setError("Ocurrió un error al obtener la información del paciente.");
      }
    }
  };

  const fieldLabels = {
    Pcte_id: "Cédula",
    Pcte_nom: "Nombre",
    Pcte_sexo: "Sexo",
    Pcte_fecha_nac: "Fecha de nacimiento",
    Pcte_edad: "Edad",
    Pcte_meses: "Meses",
    Pcte_dias: "Días",
    Pcte_nacionalidad: "Nacionalidad",
    Pcte_celular: "Celular",
    Pcte_edad_compuesta: "Edad compuesta",
    Pcte_nac_etnia: "Etnia de nacimiento",
    Pcte_tipo_bono: "Tipo de bono",
    Pcte_seguro: "Seguro",
    Pcte_provincia: "Provincia",
    Pcte_canton: "Cantón",
    Pcte_parroquia: "Parroquia",
    Pcte_peso: "Peso",
    Pcte_talla_cm: "Talla (cm)",
    Pcte_imc: "Índice de Masa Corporal (IMC)",
    Permietro_cefalico: "Perímetro cefálico",
    Valor_hemoglobina: "Valor de hemoglobina",
    Indice_anemia: "Índice de anemia",
    Imc_resultado: "Resultado IMC",
    Num_atencion_prenatal: "Número de atenciones prenatales",
    Pcte_disc: "Discapacidad",
    Pcte_tipo_disc: "Tipo de discapacidad",
    Pcte_porctj_disc: "Porcentaje de discapacidad",
  };

  const renderValue = (key, value) => {
    if (value === null) {
      const defaultMessages = {
        Pcte_nac_etnia: "La etnia de nacimiento no está registrada.",
        Pcte_talla_cm: "La talla del paciente no está disponible.",
        Permietro_cefalico: "El perímetro cefálico no ha sido registrado.",
        Valor_hemoglobina: "No se dispone de un valor de hemoglobina.",
        Indice_anemia: "No se dispone del índice de anemia.",
        Num_atencion_prenatal: "No hay registros de atenciones prenatales.",
        Pcte_tipo_disc: "No se especificó el tipo de discapacidad.",
        Pcte_porctj_disc: "No se registró el porcentaje de discapacidad.",
      };
      return defaultMessages[key] || "Información no disponible.";
    }
    if (key === "Pcte_id") {
      return value ? parseInt(value).toString() : value;
    }
    return value;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const personalInfo = [
    { label: "Cédula", value: pacienteData?.Pcte_id },
    { label: "Nombre", value: pacienteData?.Pcte_nom },
    { label: "Sexo", value: pacienteData?.Pcte_sexo },
    { label: "Fecha de nacimiento", value: pacienteData?.Pcte_fecha_nac },
    { label: "Edad Compuesta", value: pacienteData?.Pcte_edad_compuesta },
    { label: "Nacionalidad", value: pacienteData?.Pcte_nacionalidad },
    { label: "Etnia", value: pacienteData?.Pcte_nac_etnia },
  ];

  const directionInfo = [
    { label: "Provincia", value: pacienteData?.Pcte_provincia },
    { label: "Canton", value: pacienteData?.Pcte_canton },
    { label: "Parroquia", value: pacienteData?.Pcte_parroquia },
    { label: "Celular", value: pacienteData?.Pcte_celular },
  ];

  const healthInfo = [
    { label: "Peso", value: pacienteData?.Pcte_peso },
    { label: "Talla (cm)", value: pacienteData?.Pcte_talla_cm },
    { label: "IMC", value: pacienteData?.Pcte_imc },
    { label: "Resultado IMC", value: pacienteData?.Imc_resultado },
    { label: "Valor de hemoglobina", value: pacienteData?.Valor_hemoglobina },
    { label: "Índice de anemia", value: pacienteData?.Indice_anemia },
  ];

  const additionalInfo = [
    {
      label: "Número de atenciones prenatales",
      value: pacienteData?.Num_atencion_prenatal,
    },
    { label: "Seguro", value: pacienteData?.Pcte_seguro },
    { label: "Tipo de Bono", value: pacienteData?.Pcte_tipo_bono },
    { label: "Discapacidad", value: pacienteData?.Pcte_disc },
    { label: "Tipo discapacidad", value: pacienteData?.Pcte_tipo_disc },
    {
      label: "Porcentaje de discapacidad",
      value: pacienteData?.Permietro_cefalico,
    },
    {
      label: "Valor hemoglobina",
      value: pacienteData?.Valor_hemoglobina,
    },
  ];

  return (
    <div className="consulta-container">
      <h1 className="consulta-title">Consultar Información del Paciente</h1>
      <form onSubmit={handleSubmit} className="consulta-form">
        <input
          type="text"
          placeholder="Ingrese el ID del paciente"
          value={pacienteId}
          onChange={handleInputChange}
          className="consulta-input"
        />
        <button type="submit" className="consulta-button">
          Consultar
        </button>
      </form>

      {error && <div className="consulta-error">{error}</div>}

      {/* Modal con la información del paciente */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Información del Paciente"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Información detallada del Paciente</h2>

        <div className="modal-contenedor">
          <div className="modal-info">
            <h2>Información Personal</h2>
            <ul>
              {personalInfo.map((item, index) => (
                <li key={index}>
                  <strong>{item.label}:</strong>{" "}
                  {renderValue(item.label, item.value)}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-info">
            <h2>Informacion de dirección</h2>
            <ul>
              {directionInfo.map((item, index) => (
                <li key={index}>
                  <strong>{item.label}:</strong>{" "}
                  {renderValue(item.label, item.value)}
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-info">
            <h2>Información de Salud</h2>
            <ul>
              {healthInfo.map((item, index) => (
                <li key={index}>
                  <strong>{item.label}:</strong>{" "}
                  {renderValue(item.label, item.value)}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-info">
            <h2>Información Adicional</h2>
            <ul>
              {additionalInfo.map((item, index) => (
                <li key={index}>
                  <strong>{item.label}:</strong>{" "}
                  {renderValue(item.label, item.value)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="content-buton-close">
          <button onClick={closeModal} className="modal-close-btn">
            Cerrar
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default ConsultaPaciente;
