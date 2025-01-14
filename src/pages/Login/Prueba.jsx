import React, { useState } from 'react'
import "./Prueba.css"

const Prueba = () => {

   const [pacienteId, setPacientId] = useState();
   const [ateMed, setAteMed] = useState(null); 
        const fetchData = async () => {
            try {
                const pcteId = "1206939975";
              const response = await fetch(`http://127.0.0.1:8000/api/atemed/${pacienteId}/`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const result = await response.json();
              if (Array.isArray(result) && result.length > 0) {
                setAteMed(result[0]); // Asignar el primer objeto del arreglo
              } else {
                setAteMed(result); // Asignar directamente si es un objeto
              }
            } catch (err) {
                console.log(err)
            }
          };
 

  return (
    <div>
        <label>Ingrese cedula</label>
        <input type='text' onChange={(e)=>{setPacientId(e.target.value)}} ></input>
        <button className='boton' onClick={fetchData}>Llamado API</button>

        {ateMed ? (
      <div>
        <h3>Datos del paciente</h3>
        <ul>
          <li><strong>Atemed ID:</strong> {ateMed.Atemed_id}</li>
          <li><strong>Profesional ID:</strong> {ateMed.Atemed_Prof_id}</li>
          <li><strong>Paciente ID:</strong> {ateMed.Atemed_Pcte_Id}</li>
          <li><strong>Fecha de Inicio:</strong> {ateMed.Atemed_Fecha_Inicio}</li>
          <li><strong>Fecha de Fin:</strong> {ateMed.Atemed_Fecha_Fin}</li>
          <li><strong>Diagnóstico CIE10:</strong> {ateMed.Atemed_Diagnostico_CIE10}</li>
          <li><strong>Tipo de Diagnóstico:</strong> {ateMed.Atemed_Tipo_Diag}</li>
          <li><strong>Tipo de Atención:</strong> {ateMed.Atemed_Tipo_Ate}</li>
          <li><strong>Cronología del Diagnóstico:</strong> {ateMed.Atemed_Cron_Diag}</li>
          <li><strong>Diagnóstico Concluido:</strong> {ateMed.Atemed_Con_Diagnostico}</li>
        </ul>
      </div>
    ) : (
      <p>Esperando datos...</p> // Mensaje mientras no se cargan los datos
    )}
    </div>
  )
}

export default Prueba