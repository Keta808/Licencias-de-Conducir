import React, { useEffect, useState } from 'react';
import { getHorasDisponibles, elegirHora } from '../services/horas.service';
import '../../styles/horasDisponibles.css';

const formatearNumero = (numero) => {
  return numero.toString().padStart(2, '0');
};

const HorasDisponibles = () => {
  const [horas, setHoras] = useState([]);

  useEffect(() => {
    getHorasDisponibles().then((res) => {
      setHoras(res.data);
    });
  }, []);

  const handleSelectHour = async (horaId) => {
    const shouldSelect = window.confirm('¿Estás seguro de que deseas seleccionar esta hora?');
  
    if (shouldSelect) {
      const user = JSON.parse(localStorage.getItem('user'));
      const email = user && user.email;
      if (!email) {
        console.error('No se pudo obtener el correo electrónico del usuario.');
        return;
      }
  
      try {   
  
        const [horaSelected, error] = await elegirHora(horaId, email);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="horas-container">
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Disponibilidad</th>
            <th>Tipo</th>
            <th className="actions-column">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horas.map((hora) => (
            <tr key={hora._id}>
              <td>{`${hora.fecha.dia}/${hora.fecha.mes}/${hora.fecha.year} ${hora.fecha.hora}:${formatearNumero(
                hora.fecha.minuto
              )}`}</td>
              <td>{hora.disponibilidad ? 'Disponible' : 'No disponible'}</td>
              <td>{hora.tipo}</td>
              <td>
                <button onClick={() => handleSelectHour(hora._id)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorasDisponibles;
