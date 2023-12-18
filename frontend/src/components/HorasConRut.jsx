import React, { useEffect, useState } from 'react';
import { getHoras, eliminarHora } from '../services/horas.service';
import '../../styles/horas.css';

const formatearNumero = (numero) => {
  return numero.toString().padStart(2, '0');
};

const HorasConRut = () => {
  const [horas, setHoras] = useState([]);

  useEffect(() => {
    getHoras().then((res) => {
      setHoras(res.data);
    });
  }, []);

  const handleEliminarHora = async (id) => {
    const shouldDelete = window.confirm('¿Estás seguro de que deseas eliminar esta hora?');

    if (shouldDelete) {
      try {
        await eliminarHora(id);
        // Actualizar el estado después de eliminar la hora
        const nuevasHoras = horas.filter((hora) => hora._id !== id);
        setHoras(nuevasHoras);
      } catch (error) {
        console.error('Error al eliminar la hora:', error);
      }
    }
  };

  return (
    <div>
      <h1>Horas Asignadas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Fecha</th>
            <th>Disponibilidad</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horas
            .filter((hora) => hora.rut !== null)
            .map((hora) => (
              <tr key={hora._id}>
                <td>{hora.rut}</td>
                <td>{`${hora.fecha.dia}/${hora.fecha.mes}/${hora.fecha.year} ${hora.fecha.hora}:${formatearNumero(
                  hora.fecha.minuto
                )}`}</td>
                <td>{hora.disponibilidad ? 'Disponible' : 'No disponible'}</td>
                <td>{hora.tipo}</td>
                <td>
                  <button onClick={() => handleEliminarHora(hora._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorasConRut;
