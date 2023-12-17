import React, { useEffect, useState } from 'react';
import { getHoras } from '../services/horas.service';
import '../../styles/horas.css';

const formatearNumero = (numero) => {
  // Asegura que el número siempre tenga dos dígitos
  return numero.toString().padStart(2, '0');
};

const HorasSinRut = () => {
  const [horasSinRut, setHorasSinRut] = useState([]); // Cambiado el nombre del estado a horasSinRut

  useEffect(() => {
    getHoras().then((res) => {
      setHorasSinRut(res.data); // Cambiado el nombre del estado a horasSinRut
    });
  }, []);

  // Filtra las horas sin RUT
  const horasSinRutFiltradas = horasSinRut.filter((hora) => hora.rut === null);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Fecha</th>
            <th>Disponibilidad</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {horasSinRutFiltradas.map((hora) => (
            <tr key={hora._id}>
              <td>{hora.rut}</td>
              <td>{`${hora.fecha.year}/${hora.fecha.mes}/${hora.fecha.dia} ${hora.fecha.hora}:${formatearNumero(
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

export default HorasSinRut;
