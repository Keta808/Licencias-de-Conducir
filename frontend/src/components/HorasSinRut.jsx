import React, { useEffect, useState } from 'react';
import { getHoras, eliminarHora } from '../services/horas.service';
import '../../styles/horas.css';

const formatearNumero = (numero) => {
  return numero.toString().padStart(2, '0');
};

const HorasConRut = () => {
  const [horas, setHoras] = useState([]);
  const [horaEliminando, setHoraEliminando] = useState(null);

  useEffect(() => {
    getHoras().then((res) => {
      setHoras(res.data);
    });
  }, []);

  // Filtra las horas con RUT
  const horasConRutFiltradas = horas.filter((hora) => hora.rut === null);

  const handleEliminarHora = (id) => {
    setHoraEliminando(id);
  };

  const handleConfirmarEliminacion = async (id) => {
    try {
      await eliminarHora(id);
      // Actualizar el estado después de eliminar la hora
      const nuevasHoras = horas.filter((hora) => hora._id !== id);
      setHoras(nuevasHoras);
      setHoraEliminando(null);
    } catch (error) {
      console.error('Error al eliminar la hora:', error);
      setHoraEliminando(null);
    }
  };

  const handleCancelarEliminacion = () => {
    setHoraEliminando(null);
  };

  return (
    <div>
      <h1>Horas Disponibles</h1>
      <table className="table">
        <thead>
          <tr>
            
            <th>Fecha</th>
            <th>Disponibilidad</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horasConRutFiltradas.map((hora) => (
            <tr key={hora._id}>
            
              <td>{`${hora.fecha.dia}/${hora.fecha.mes}/${hora.fecha.year} ${hora.fecha.hora}:${formatearNumero(
                hora.fecha.minuto
              )}`}</td>
              <td>{hora.disponibilidad ? 'Disponible' : 'No disponible'}</td>
              <td>{hora.tipo}</td>
              <td>
                {hora._id === horaEliminando ? (
                  <>
                    <button onClick={() => handleConfirmarEliminacion(hora._id)}>Confirmar Eliminación</button>
                    <button onClick={handleCancelarEliminacion}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => handleEliminarHora(hora._id)}>Eliminar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorasConRut;
