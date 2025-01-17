import { useUserContext } from "../../context/UserContext";
import "./InicioPaciente.css";

const InicioPaciente = () => {
  const { userData } = useUserContext();
  const paciente = userData.Data;

  // Función para manejar datos null y mostrar "Información no disponible"
  const getValue = (value) =>
    value === null || value === undefined ? "Información no disponible" : value;

  return (
    <>
      <h2>Información del Paciente</h2>
      <div className="info-paciente">
        <div className="form-column-info-paciente">
          <div className="form-section">
            <h3>Datos Generales</h3>
            <hr></hr>
            <div className="form-item">
              <label>Cedula: </label>
              <span>{getValue(paciente?.Pcte_id)}</span>
            </div>
            <div className="form-item">
              <label>Nombre: </label>
              <span>{getValue(paciente?.Pcte_nom)}</span>
            </div>
            <div className="form-item">
              <label>Edad: </label>
              <span>{getValue(paciente?.Pcte_edad)} años</span>
            </div>
            <div className="form-item">
              <label>Edad compuesta: </label>
              <span>{getValue(paciente?.Pcte_edad_compuesta)}</span>
            </div>
            <div className="form-item">
              <label>Sexo: </label>
              <span>{getValue(paciente?.Pcte_sexo)}</span>
            </div>
            <div className="form-item">
              <label>Nacionalidad: </label>
              <span>{getValue(paciente?.Pcte_nacionalidad)}</span>
            </div>
            <div className="form-item">
              <label>Fecha de Nacimiento: </label>
              <span>
                {getValue(
                  new Date(paciente?.Pcte_fecha_nac).toLocaleDateString()
                )}
              </span>
            </div>
          </div>

          <div className="form-section">
            <h3>Datos Médicos</h3>
            <hr></hr>
            <div className="form-item">
              <label>IMC: </label>
              <span>{getValue(paciente?.Pcte_imc)}</span>
            </div>
            <div className="form-item">
              <label>Resultado IMC: </label>
              <span>{getValue(paciente?.Imc_resultado)}</span>
            </div>
            <div className="form-item">
              <label>Diagnóstico: </label>
              <span>{getValue(paciente?.Pcte_disc)}</span>
            </div>
            <div className="form-item">
              <label>Tipo de Bono: </label>
              <span>{getValue(paciente?.Pcte_tipo_bono)}</span>
            </div>
            <div className="form-item">
              <label>Seguro: </label>
              <span>{getValue(paciente?.Pcte_seguro)}</span>
            </div>
            <div className="form-item">
              <label>Perímetro cefálico: </label>
              <span>{getValue(paciente?.Permietro_cefalico)}</span>
            </div>
            <div className="form-item">
              <label>Valor de hemoglobina: </label>
              <span>{getValue(paciente?.Valor_hemoglobina)}</span>
            </div>
          </div>
          <div className="form-section">
            <h3>Contacto</h3>
            <hr></hr>
            <div className="form-item">
              <label>Celular: </label>
              <span>{getValue(paciente?.Pcte_celular)}</span>
            </div>
            <div className="form-item">
              <label>Canton: </label>
              <span>{getValue(paciente?.Pcte_canton)}</span>
            </div>
            <div className="form-item">
              <label>Provincia: </label>
              <span>{getValue(paciente?.Pcte_provincia)}</span>
            </div>
            <div className="form-item">
              <label>Parroquia: </label>
              <span>{getValue(paciente?.Pcte_parroquia)}</span>
            </div>
            <div className="form-item">
              <label>Atención Prenatal: </label>
              <span>{getValue(paciente?.Num_atencion_prenatal)}</span>
            </div>
          </div>
        </div>

        <div className="form-column-info-paciente ">
          <div className="form-section otros">
            <h3>Otros Datos</h3>
            <hr></hr>
            <div className="form-data">
              <div className="form-item">
                <label>Indice de Anemia: </label>
                <span>{getValue(paciente?.Indice_anemia)}</span>
              </div>
              <div className="form-item">
                <label>Tipo de Discapacidad: </label>
                <span>{getValue(paciente?.Pcte_tipo_disc)}</span>
              </div>
              <div className="form-item">
                <label>Etnia: </label>
                <span>{getValue(paciente?.Pcte_nac_etnia)}</span>
              </div>
            </div>
            <div className="form-data">
              <div className="form-item">
                <label>Peso: </label>
                <span>{getValue(paciente?.Pcte_peso)}</span>
              </div>
              <div className="form-item">
                <label>IMC: </label>
                <span>{getValue(paciente?.Pcte_imc)}</span>
              </div>
              <div className="form-item">
                <label>Talla (cm): </label>
                <span>{getValue(paciente?.Pcte_talla_cm)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InicioPaciente;
