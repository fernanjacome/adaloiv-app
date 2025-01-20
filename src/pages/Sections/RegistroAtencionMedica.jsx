import React, { useState } from "react";
import axios from "axios";
import { Card } from "@Components/Card";
import "./RegistroAtencionMedica.css";
import { CardSuccess } from "../../components/CardSuccess";
const RegistroAtencionMedica = () => {
  // Estados para los campos del formulario
  const [Atemed_Prof_id, setAtemed_Prof_id] = useState("");
  const [Atemed_Pcte_Id, setAtemed_Pcte_Id] = useState("");
  const [Atemed_Ent_id, setAtemed_Ent_id] = useState("");
  const [Atemed_Fecha_Inicio, setAtemed_Fecha_Inicio] = useState("");
  const [Atemed_Hora_Inicio, setAtemed_Hora_Inicio] = useState("");
  const [Atemed_Fecha_Fin, setAtemed_Fecha_Fin] = useState("");
  const [Atemed_Hora_Fin, setAtemed_Hora_Fin] = useState("");
  const [Atemed_Diagnostico_CIE10, setAtemed_Diagnostico_CIE10] = useState("");
  const [Atemed_Not_Oblig, setAtemed_Not_Oblig] = useState("");
  const [Atemed_Tipo_Diag, setAtemed_Tipo_Diag] = useState("");
  const [Atemed_Cron_Diag, setAtemed_Cron_Diag] = useState("");
  const [Atemed_Con_Diagnostico, setAtemed_Con_Diagnostico] = useState("");
  const [Atemed_Tipo_Ate, setAtemed_Tipo_Ate] = useState("");
  const [Atemed_Receta, setAtemed_Receta] = useState("");
  const [F16, setF16] = useState("");
  const [F17, setF17] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Atemed_Prof_id,
      Atemed_Pcte_Id,
      Atemed_Ent_id,
      Atemed_Fecha_Inicio,
      Atemed_Hora_Inicio,
      Atemed_Fecha_Fin,
      Atemed_Hora_Fin,
      Atemed_Diagnostico_CIE10,
      Atemed_Not_Oblig,
      Atemed_Tipo_Diag,
      Atemed_Cron_Diag,
      Atemed_Con_Diagnostico,
      Atemed_Tipo_Ate,
      Atemed_Receta,
      F16,
      F17,
    };

    try {
      // Enviar la solicitud POST a la API
      const response = await axios.post(
        "http://localhost:8000/api/add-atemed/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowSuccessModal(true);
      setSuccess(
        "Atención médica registrada con éxito \n ID: " + response.data.Atemed_id
      );
      setErrorMessage("");
    } catch (err) {
      setShowErrorModal(true);
      setSuccess("");
      if (err.response && err.response.data) {
        const errorData = err.response.data;

        let errorMessages = [];
        if (errorData.Atemed_Ent_id) {
          errorMessages.push(...errorData.Atemed_Ent_id);
        }
        if (errorData.Atemed_Pcte_Id) {
          errorMessages.push(...errorData.Atemed_Pcte_Id);
        }
        if (errorData.Atemed_Prof_id) {
          errorMessages.push(...errorData.Atemed_Prof_id);
        }

        setErrorMessage(errorMessages.join("\n"));
      } else {
        setErrorMessage("Hubo un error al registrar la atención médica.");
      }
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);
    setErrorMessage("");
  };

  const handleCancelar = () => {
    setAtemed_Con_Diagnostico("");
    setAtemed_Cron_Diag("");
    setAtemed_Diagnostico_CIE10("");
    setAtemed_Ent_id("");
    setAtemed_Fecha_Fin("");
    setAtemed_Fecha_Inicio("");
    setAtemed_Hora_Fin("");
    setAtemed_Hora_Inicio("");
    setAtemed_Not_Oblig("");
    setAtemed_Prof_id("");
    setAtemed_Pcte_Id("");
    setAtemed_Receta("");
    setAtemed_Tipo_Ate("");
    setAtemed_Tipo_Diag("");
  };

  return (
    <div className="registro-atencion-medica">
      <h2>Registrar nueva Atención Médica</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form className="reatmed-form" onSubmit={handleSubmit}>
        <div className="formulario">
          <div className="form-column">
            <label>
              ID Profesional:
              <input
                type="number"
                value={Atemed_Prof_id}
                onChange={(e) => setAtemed_Prof_id(e.target.value)}
                required
              />
            </label>

            <label>
              ID Paciente:
              <input
                type="number"
                value={Atemed_Pcte_Id}
                onChange={(e) => setAtemed_Pcte_Id(e.target.value)}
                required
              />
            </label>

            <label>
              ID Entidad:
              <input
                type="number"
                value={Atemed_Ent_id}
                onChange={(e) => setAtemed_Ent_id(e.target.value)}
                required
              />
            </label>

            <label>
              Fecha Inicio:
              <input
                type="date"
                value={Atemed_Fecha_Inicio}
                onChange={(e) => setAtemed_Fecha_Inicio(e.target.value)}
                required
              />
            </label>

            <label>
              Hora Inicio:
              <input
                type="time"
                value={Atemed_Hora_Inicio}
                onChange={(e) => setAtemed_Hora_Inicio(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-column">
            <label>
              Hora Fin:
              <input
                type="time"
                value={Atemed_Hora_Fin}
                onChange={(e) => setAtemed_Hora_Fin(e.target.value)}
                required
              />
            </label>

            <label>
              Diagnóstico CIE10:
              <input
                type="text"
                value={Atemed_Diagnostico_CIE10}
                onChange={(e) => setAtemed_Diagnostico_CIE10(e.target.value)}
                required
              />
            </label>

            <label>
              Nota Obligatoria:
              <input
                type="number"
                value={Atemed_Not_Oblig}
                onChange={(e) => setAtemed_Not_Oblig(e.target.value)}
              />
            </label>
            <label>
              Tipo Diagnóstico:
              <input
                type="text"
                value={Atemed_Tipo_Diag}
                onChange={(e) => setAtemed_Tipo_Diag(e.target.value)}
              />
            </label>

            <label>
              Diagnóstico Crónico:
              <input
                type="text"
                value={Atemed_Cron_Diag}
                onChange={(e) => setAtemed_Cron_Diag(e.target.value)}
              />
            </label>
          </div>
          <div className="form-column">
            <label>
              Fecha Fin:
              <input
                type="date"
                value={Atemed_Fecha_Fin}
                onChange={(e) => setAtemed_Fecha_Fin(e.target.value)}
                required
              />
            </label>
            <label>
              Con Diagnóstico:
              <input
                type="text"
                value={Atemed_Con_Diagnostico}
                onChange={(e) => setAtemed_Con_Diagnostico(e.target.value)}
              />
            </label>

            <label>
              Tipo de Atención:
              <input
                type="text"
                value={Atemed_Tipo_Ate}
                onChange={(e) => setAtemed_Tipo_Ate(e.target.value)}
              />
            </label>

            <label>
              Receta:
              <textarea
                value={Atemed_Receta}
                onChange={(e) => setAtemed_Receta(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="container-button">
          <button className="form-button reatmed" type="submit">
            Enviar
          </button>
          <button
            className="form-button reatmed secondary"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
      {showErrorModal && (
        <Card message={errorMessage} closeModal={closeModal} />
      )}

      {showSuccessModal && (
        <CardSuccess message={success} closeModal={closeModal} />
      )}
    </div>
  );
};

export default RegistroAtencionMedica;
