import React, { useEffect, useState } from 'react';
import { getHorasDisponibles } from '../services/horas.service';
import '../../styles/horas.css';
//import { useAuth } from '../context/AuthContext';

const formatearNumero = (numero) => {
  // Asegura que el número siempre tenga dos dígitos
  return numero.toString().padStart(2, '0');
};

const HorasDisponibles= () => {

  const [horas, setHoras] = useState([]);
  useEffect(() => {
    getHorasDisponibles().then((res) => {
      setHoras(res.data);
    });
  }, []);

  //const { user } = useAuth();
  //console.log(user);

  return (
    <div>
     
      <h1>Horas Asignadas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Disponibilidad</th>
            <th>Tipo</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorasDisponibles;
