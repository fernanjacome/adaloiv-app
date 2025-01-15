import React, { useState } from 'react';

const Dashboard = () => {
  const [AtemedId, setAtemedId] = useState('');
  const [atemedData, setAtemedData] = useState(null);
  const [error, setError] = useState(null);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!AtemedId) {
      alert('Por favor, ingresa un ID');
      return;
    }

    try {
      // Hacer una solicitud GET a la API para obtener el Atemed por su ID
      const response = await fetch(`http://127.0.0.1:8000/api/atemed/${AtemedId}/`);

      if (response.ok) {
        const data = await response.json();
        setAtemedData(data[0]);  // Obtener el primer objeto de la respuesta
        setError(null);        // Limpiar cualquier error previo
      } else {
        throw new Error('No se encontró el Atemed con ese ID');
      }
    } catch (error) {
      setError(error.message);
      setAtemedData(null); // Limpiar cualquier dato previo
    }
  };

  return (
    <div className="container">
      <h2>Buscar Atemed por ID</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="AtemedId">ID del Atemed:</label>
        <input
          type="number"
          id="AtemedId"
          value={AtemedId}
          onChange={(e) => setAtemedId(e.target.value)}
          placeholder="Ingresa el ID del Atemed"
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {atemedData && (
        <div className="atemed-details">
          <h3>Detalles del Atemed</h3>
          <p><strong>ID:</strong> {atemedData.Atemed_id}</p>
          <p><strong>Profesional ID:</strong> {atemedData.Atemed_Prof_id}</p>
          <p><strong>Paciente ID:</strong> {atemedData.Atemed_Pcte_Id}</p>
          <p><strong>Entidad ID:</strong> {atemedData.Atemed_Ent_id}</p>
          <p><strong>Diagnóstico CIE10:</strong> {atemedData.Atemed_Diagnostico_CIE10}</p>
          <p><strong>Fecha de inicio:</strong> {atemedData.Atemed_Fecha_Inicio}</p>
          <p><strong>Hora de inicio:</strong> {atemedData.Atemed_Hora_Inicio}</p>
          <p><strong>Fecha de fin:</strong> {atemedData.Atemed_Fecha_Fin}</p>
          <p><strong>Hora de fin:</strong> {atemedData.Atemed_Hora_Fin}</p>
          <p><strong>Diagnóstico Cronológico:</strong> {atemedData.Atemed_Cron_Diag}</p>
          <p><strong>Tipo de diagnóstico:</strong> {atemedData.Atemed_Tipo_Diag}</p>
          <p><strong>Condición del diagnóstico:</strong> {atemedData.Atemed_Con_Diagnostico}</p>
          <p><strong>Tipo de atención:</strong> {atemedData.Atemed_Tipo_Ate}</p>
          <p><strong>Receta:</strong> {atemedData.Atemed_Receta ? atemedData.Atemed_Receta : 'No disponible'}</p>
          <p><strong>Nota no obligatoria:</strong> {atemedData.Atemed_Not_Oblig ? atemedData.Atemed_Not_Oblig : 'No disponible'}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
