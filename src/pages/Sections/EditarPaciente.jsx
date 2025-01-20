import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@Components/Card";
import { CardSuccess } from "../../components/CardSuccess";

const EditarPacienteForm = ({ pacienteId }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonConsulta, setButtonConsulta] = useState(true);
  const [formData, setFormData] = useState({
    Pcte_nom: "",
    Pcte_sexo: "",
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

  useEffect(() => {
    const pcteIdLength = formData.Pcte_id ? formData.Pcte_id.length : 0;
    if (pcteIdLength > 3) {
      setButtonConsulta(false);
    } else {
      setButtonConsulta(true);
    }
  }, [formData.Pcte_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el peso o la talla cambia, recalcular el IMC
    if (name === "Pcte_peso" || name === "Pcte_talla_cm") {
      const peso = parseFloat(formData.Pcte_peso);
      const tallaCm = parseFloat(formData.Pcte_talla_cm);

      // Verificar si ambos valores están presentes y son válidos
      if (!isNaN(peso) && !isNaN(tallaCm) && tallaCm > 0) {
        // Convertir talla de cm a metros
        const tallaM = tallaCm / 10;

        // Calcular IMC
        const imc = (peso / (tallaM * tallaM)).toFixed(2); // Redondear a 2 decimales

        // Actualizar el estado con el IMC calculado
        setFormData({
          ...formData,
          [name]: value,
          Pcte_imc: imc, // Asignar el valor calculado del IMC
        });
      } else {
        // Si los valores no son válidos, simplemente actualizar el estado sin calcular IMC
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === "Pcte_fecha_nac") {
      // Código para calcular la edad (ya proporcionado en tu ejemplo)
      const fechaNacimiento = new Date(value);
      const hoy = new Date();

      let edadAnios = hoy.getFullYear() - fechaNacimiento.getFullYear();
      let edadMeses = hoy.getMonth() - fechaNacimiento.getMonth();
      let edadDias = hoy.getDate() - fechaNacimiento.getDate();

      if (edadMeses < 0) {
        edadMeses += 12;
      }
      if (edadDias < 0) {
        edadDias += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
      }

      setFormData({
        ...formData,
        [name]: value,
        Pcte_edad: edadAnios,
        Pcte_meses: edadMeses,
        Pcte_dias: edadDias,
        Pcte_edad_compuesta: `${edadAnios} años, ${edadMeses} meses, ${edadDias} días`,
      });
    } else {
      // Para otros campos, simplemente actualizamos el estado
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/paciente/editar/${formData.Pcte_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setShowSuccessModal(true);
      setSuccess("Paciente actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar el paciente:", error.response.data);
      setShowErrorModal(true);
      setErrorMessage("Error al actualizar el paciente.");
    }
  };

  const handleCancel = () => {
    setButtonDisabled(false);
    setFormData({
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
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);
    setErrorMessage("");
  };
  const handleConsulta = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/paciente/${formData.Pcte_id}/`
      );
      if (response.data) {
        setFormData(response.data);
        setButtonDisabled(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Si el error es 404 (no encontrado)
        setShowErrorModal(true);
        setErrorMessage(
          "El paciente no se encuentra en la base de datos del MSP"
        );
      } else {
        setShowErrorModal(true);
        setErrorMessage(
          "Hubo un problema con la solicitud. Inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Editar paciente</h3>
        <div className="form-container">
          {" "}
          <div className="form-column-rpaciente">
            <div className="form-group">
              <label htmlFor="Pcte_id">ID del Paciente</label>
              <div className=" paciente_id">
                <input
                  id="Pcte_id"
                  type="text"
                  name="Pcte_id"
                  value={formData.Pcte_id}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={handleConsulta}
                  disabled={buttonConsulta}
                >
                  Consultar
                </button>
              </div>
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
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Sin Definir">Sin Definir</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_fecha_nac">Fecha de Nacimiento</label>
              <input
                id="Pcte_fecha_nac"
                type="date"
                name="Pcte_fecha_nac"
                value={formData.Pcte_fecha_nac.split("T")[0]}
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
              <select
                id="Pcte_tipo_bono"
                name="Pcte_tipo_bono"
                value={formData.Pcte_tipo_bono}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Desarrollo Humano">Desarrollo Humano</option>
                <option value="Joaquín Gallegos Lara">
                  Joaquín Gallegos Lara
                </option>
                <option value="Manuela Espejo">Manuela Espejo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Pcte_seguro">Seguro</label>
              <select
                id="Pcte_seguro"
                name="Pcte_seguro"
                value={formData.Pcte_seguro}
                onChange={handleChange}
                className="form-input"
              >
                <option value="No Aporta">No aporta</option>
                <option value="IESS, Jubilado Sistema de Pensiones">
                  IESS, Jubilado sistema de pensiones
                </option>
                <option value="IESS, Afiliado Seguro General Tiempo Completo">
                  IESS, Afiliado seguro general tiempo completo
                </option>
                <option value="Tipo de Afiliación Desconocida">
                  Tipo de afiliación desconocida
                </option>
                <option value="IESS, Afiliado Seguro Campesino">
                  IESS, Afiliado seguro Campesino
                </option>
              </select>
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
              <label htmlFor="Pcte_peso">Peso (kg) </label>
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
                disabled
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
              <select
                id="Imc_resultado"
                name="Imc_resultado"
                value={formData.Imc_resultado}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Obesidad Tipo I">Obesidad Tipo I</option>
                <option value="Peso normal">Peso normal</option>
                <option value="Sobrepeso">Sobrepeso</option>
                <option value="Delgadez Aceptable">Delgadez Aceptable</option>
                <option value="Obesidad Tipo II">Obesidad Tipo II</option>
              </select>
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
              <select
                id="Pcte_tipo_disc"
                name="Pcte_tipo_disc"
                value={formData.Pcte_tipo_disc}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Física">Física</option>
                <option value="Auditiva">Auditiva</option>
                <option value="Psicosocial">Psicosocial</option>
                <option value="Visual">Visual</option>
                <option value="Motora">Motora</option>
                <option value="Intelectual">Intelectual</option>
                <option value="Múltiple">Múltiple</option>
                <option value="Enfermedad Crónica">Enfermedad Crónica</option>
                <option value="Neurológica">Neurológica</option>
                <option value="Autismo">Autismo</option>
                <option value="Cognitiva">Cognitiva</option>
                <option value="Depresión">Depresión</option>
              </select>
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
            Editar Paciente
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="submit-btn cancel"
          >
            Cancelar
          </button>
        </div>
      </form>
      {showSuccessModal && (
        <CardSuccess message={success} closeModal={closeModal} />
      )}
      {showErrorModal && (
        <Card message={errorMessage} closeModal={closeModal} />
      )}
    </>
  );
};

export default EditarPacienteForm;
