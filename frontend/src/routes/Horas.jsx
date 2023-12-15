import { set } from 'react-hook-form';
import {getHoras} from '../services/horas.service';
import {useEffect, useState} from 'react';  
import "../../styles/horas.css";


const formatearNumero = (numero) => {
    // Asegura que el número siempre tenga dos dígitos
    return numero.toString().padStart(2, '0');
  };


const horas = () => {

    const [horas, setHoras] = useState([]);

    useEffect(() => {
        getHoras().then((res) => {
            setHoras(res.data);
        });
        console.log(horas);
    }
    , []);


    const horasConRut = horas.filter((hora) => hora.rut !== null);

  // Filtra las horas sin RUT
  const horasSinRut = horas.filter((hora) => hora.rut === null);

    return (
        <div className="container">
          <div className="table-container">
            <h1>Horas Asignadas</h1>
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
                {horasConRut.map((hora) => (
                  <tr key={hora._id}>
                    <td>{hora.rut}</td>
                    <td>{`${hora.fecha.dia}/${hora.fecha.mes}/${hora.fecha.year} ${hora.fecha.hora}:${formatearNumero(hora.fecha.minuto)}`}</td>
                    <td>{hora.disponibilidad ? 'Disponible' : 'No disponible'}</td>
                    <td>{hora.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <h1>Horas Sin Asignar</h1>
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
                {horasSinRut.map((hora) => (
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
    </div>
  );



      
};

export default horas;