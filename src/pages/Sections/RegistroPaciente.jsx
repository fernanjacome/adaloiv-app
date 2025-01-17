import React, { useState } from "react";
import "./RegistroPaciente.css";
import { CardSuccess } from "../../components/CardSuccess";

const RegistroPaciente = () => {
  // Definimos el estado del formulario
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    Pcte_id: "",
    Pcte_nom: "",
    Pcte_sexo: "M",
    Pcte_fecha_nac: "",
    Pcte_edad: "",
    Pcte_meses: "",
    Pcte_dias: "",
    Pcte_edad_compuesta: "",
    Pcte_nacionalidad: "",
    Pcte_nac_etnia: "",
    Pcte_celular: "",
    Pcte_tipo_bono: "",
    Pcte_seguro: "",
    Pcte_provincia: "",
    Pcte_canton: "",
    Pcte_parroquia: "",
    Pcte_peso: "",
    Pcte_talla_cm: "",
    Pcte_imc: "",
    Permietro_cefalico: "",
    Valor_hemoglobina: "",
    Indice_anemia: "",
    Imc_resultado: "",
    Num_atencion_prenatal: "",
    Pcte_disc: "",
    Pcte_tipo_disc: "",
    Pcte_porctj_disc: "",
  });

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/registrar-paciente/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      setShowSuccessModal(true);
      setSuccess("Paciente registrado con éxito");
    } else {
      if (response.data.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage("Hubo un error al registrar el paciente.");
      }
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);
    setErrorMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {" "}
          <div className="form-column-rpaciente">
            <div className="form-group">
              <label htmlFor="Pcte_id">ID del Paciente</label>
              <input
                id="Pcte_id"
                type="text"
                name="Pcte_id"
                value={formData.Pcte_id}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_nom">Nombre del Paciente</label>
              <input
                id="Pcte_nom"
                type="text"
                name="Pcte_nom"
                value={formData.Pcte_nom}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_sexo">Género</label>
              <select
                id="Pcte_sexo"
                name="Pcte_sexo"
                value={formData.Pcte_sexo}
                onChange={handleChange}
                className="form-input"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_fecha_nac">Fecha de Nacimiento</label>
              <input
                id="Pcte_fecha_nac"
                type="date"
                name="Pcte_fecha_nac"
                value={formData.Pcte_fecha_nac}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_edad">Edad</label>
              <input
                id="Pcte_edad"
                type="number"
                name="Pcte_edad"
                value={formData.Pcte_edad}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_meses">Meses</label>
              <input
                id="Pcte_meses"
                type="number"
                name="Pcte_meses"
                value={formData.Pcte_meses}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_dias">Días</label>
              <input
                id="Pcte_dias"
                type="number"
                name="Pcte_dias"
                value={formData.Pcte_dias}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_edad_compuesta">Edad Compuesta</label>
              <input
                id="Pcte_edad_compuesta"
                type="text"
                name="Pcte_edad_compuesta"
                value={formData.Pcte_edad_compuesta}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-column-rpaciente">
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="Pcte_nacionalidad">Nacionalidad</label>
                <input
                  id="Pcte_nacionalidad"
                  type="text"
                  name="Pcte_nacionalidad"
                  value={formData.Pcte_nacionalidad}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Pcte_nac_etnia">Etnia</label>
                <input
                  id="Pcte_nac_etnia"
                  type="text"
                  name="Pcte_nac_etnia"
                  value={formData.Pcte_nac_etnia}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <label htmlFor="Pcte_celular">Celular</label>
              <input
                id="Pcte_celular"
                type="text"
                name="Pcte_celular"
                value={formData.Pcte_celular}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_tipo_bono">Tipo de Bono</label>
              <input
                id="Pcte_tipo_bono"
                type="text"
                name="Pcte_tipo_bono"
                value={formData.Pcte_tipo_bono}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_seguro">Seguro</label>
              <input
                id="Pcte_seguro"
                type="text"
                name="Pcte_seguro"
                value={formData.Pcte_seguro}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_provincia">Provincia</label>
              <input
                id="Pcte_provincia"
                type="text"
                name="Pcte_provincia"
                value={formData.Pcte_provincia}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_canton">Cantón</label>
              <input
                id="Pcte_canton"
                type="text"
                name="Pcte_canton"
                value={formData.Pcte_canton}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_parroquia">Parroquia</label>
              <input
                id="Pcte_parroquia"
                type="text"
                name="Pcte_parroquia"
                value={formData.Pcte_parroquia}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-column-rpaciente">
            <div className="form-group">
              <label htmlFor="Pcte_peso">Peso</label>
              <input
                id="Pcte_peso"
                type="text"
                name="Pcte_peso"
                value={formData.Pcte_peso}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_talla_cm">Talla (cm)</label>
              <input
                id="Pcte_talla_cm"
                type="number"
                name="Pcte_talla_cm"
                value={formData.Pcte_talla_cm}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_imc">IMC</label>
              <input
                id="Pcte_imc"
                type="text"
                name="Pcte_imc"
                value={formData.Pcte_imc}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Permietro_cefalico">Perímetro Cefálico</label>
              <input
                id="Permietro_cefalico"
                type="text"
                name="Permietro_cefalico"
                value={formData.Permietro_cefalico}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Valor_hemoglobina">Valor Hemoglobina</label>
              <input
                id="Valor_hemoglobina"
                type="text"
                name="Valor_hemoglobina"
                value={formData.Valor_hemoglobina}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Indice_anemia">Índice de Anemia</label>
              <input
                id="Indice_anemia"
                type="text"
                name="Indice_anemia"
                value={formData.Indice_anemia}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Imc_resultado">Resultado IMC</label>
              <input
                id="Imc_resultado"
                type="text"
                name="Imc_resultado"
                value={formData.Imc_resultado}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Num_atencion_prenatal">
                Número de Atención Prenatal
              </label>
              <input
                id="Num_atencion_prenatal"
                type="text"
                name="Num_atencion_prenatal"
                value={formData.Num_atencion_prenatal}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-column-rpaciente">
            <div className="form-group">
              <label htmlFor="Pcte_disc">Discapacidad</label>
              <input
                id="Pcte_disc"
                type="text"
                name="Pcte_disc"
                value={formData.Pcte_disc}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_tipo_disc">Tipo de Discapacidad</label>
              <input
                id="Pcte_tipo_disc"
                type="text"
                name="Pcte_tipo_disc"
                value={formData.Pcte_tipo_disc}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_porctj_disc">
                Porcentaje de Discapacidad
              </label>
              <input
                id="Pcte_porctj_disc"
                type="text"
                name="Pcte_porctj_disc"
                value={formData.Pcte_porctj_disc}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="button-container">
          <button type="submit" className="submit-btn">
            Registrar Paciente
          </button>
        </div>
      </form>
      {showSuccessModal && (
        <CardSuccess message={success} closeModal={closeModal} />
      )}
    </>
  );
};

export default RegistroPaciente;
