import React, { useState, useEffect } from 'react';
import { verHoras } from '../services/horas.service';

const formatearNumero = (numero) => {
  return numero.toString().padStart(2, '0');
};

const VerHoras = () => {
  const [horas, setHoras] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerHoras = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user && user.email;
        if (!email) {
          console.error('No se pudo obtener el correo electrónico del usuario.');
          return;
        }

        const data = await verHoras(email);
        if(!data){
          return [];
        }
        setHoras(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerHoras();
  }, []);

  const handleEliminarHora = (id) => {
    // Aquí irá la lógica para confirmar y eliminar la hora
    console.log(`Eliminar hora con ID ${id}`);
  };

  const confirmarEliminarHora = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar esta hora?');
    if (confirmacion) {
      handleEliminarHora(id);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <h1>Mis Horas </h1>
      <ul>
        {Array.isArray(horas) && horas.length > 0 ? (
          horas.map((hora) => (
            <h2 key={hora._id}>
              <li>
                {`${hora.fecha.dia}/${hora.fecha.mes}/${hora.fecha.year} ${hora.fecha.hora}:${formatearNumero(
                  hora.fecha.minuto
                )}, Tipo: ${hora.tipo}`}
                <button onClick={() => confirmarEliminarHora(hora._id)}>Eliminar Hora</button>
              </li>
            </h2>
          ))
        ) : (
          <p>No hay horas disponibles</p>
        )}
      </ul>
    </div>
  );
  
};

export default VerHoras;
