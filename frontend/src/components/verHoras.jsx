import React, { useState, useEffect } from 'react';
import { verHoras, liberarHora } from '../services/horas.service';
import { useNavigate } from 'react-router-dom';
import '../../styles/verHoras.css';
const formatearNumero = (numero) => {
  return numero.toString().padStart(2, '0');
};

const VerHoras = () => {
  const navigate = useNavigate();
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
        if (!data) {
          return [];
        }
        setHoras(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerHoras();
  }, []);

  const handleEliminarHora = async (id) => {
    try {
      // Realiza la liberación de la hora en el backend
      const response = await liberarHora(id);

      if (response) {
        // Actualiza el estado local eliminando la hora con el ID correspondiente
        setHoras((prevHoras) => prevHoras.filter((hora) => hora._id !== id));

        console.log(`Hora con ID ${id} eliminada correctamente`);
        // Redirige a la página después de la eliminación
        window.location.reload();
        navigate('/SeleccionarHora');
      }
    } catch (error) {
      console.error('Error al eliminar la hora:', error.message);
    }
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
    <div className="ver-horas-container">
      <h1>Mis Horas </h1>
      <ul>
        {Array.isArray(horas) && horas.length > 0 ? (
          horas.map((hora) => (
            <h2 key={hora._id}>
              <li>
                {`${hora.fecha.dia}/${hora.fecha.mes}/${hora.fecha.year} ${hora.fecha.hora}:${formatearNumero(
                  hora.fecha.minuto
                )}, Tipo: ${hora.tipo}`}
                <button className="eliminar-button" onClick={() => confirmarEliminarHora(hora._id)}>
                  Eliminar Hora
                </button>
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
