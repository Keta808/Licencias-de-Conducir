import React from 'react';

function ResExamen({ examenesAprobados }) {
  return (
    <div>
      <h2>Listado de Resultados de Exámenes Aprobados:</h2>
      <ul>
        {examenesAprobados && examenesAprobados.map((examen) => (
          <li key={examen._id}>
            <p>Rut: {examen.rut}</p>
            <p>Fecha de Examen: {examen.fechaDocumento}</p>
            <p>Estado de Examen: {examen.estadoExamen}</p> 
            {/* Puedes agregar más información según tus necesidades */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResExamen;