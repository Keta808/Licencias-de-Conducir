import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createHora } from '../services/horas.service';

function HorasForm() {
  const navigate = useNavigate();
  const [horaCreada, setHoraCreada] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Estructura el objeto horaData según el formato requerido
    const horaData = {
      fecha: {
        year: data.year,
        mes: data.mes,
        dia: data.dia,
        hora: data.hora,
        minuto: data.minuto,
      },
      disponibilidad: true, // Por defecto, establecido como true
      tipo: data.tipo,
    };

    createHora(horaData)
      .then((response) => {
        console.log('Hora creada:', horaData);
        const hora = horaData; // Asegúrate de acceder a la propiedad correcta según tu API

        setHoraCreada(hora);
        navigate('/horas');
      })
      .catch((error) => {
        console.error('Error al crear la hora:', error);
      });
  };

  return (
    <div>
      <br></br>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div>
          <label>Año:</label>
          <input type="text" name="year" {...register('year', { required: 'Campo requerido' })} />
          {errors.year && <p>{errors.year.message}</p>}
        </div>
        <div>
          <label>Mes:</label>
          <input type="text" name="mes" {...register('mes', { required: 'Campo requerido' })} />
          {errors.mes && <p>{errors.mes.message}</p>}
        </div>
        <div>
          <label>Día:</label>
          <input type="text" name="dia" {...register('dia', { required: 'Campo requerido' })} />
          {errors.dia && <p>{errors.dia.message}</p>}
        </div>
        <div>
          <label>Hora:</label>
          <input type="text" name="hora" {...register('hora', { required: 'Campo requerido' })} />
          {errors.minuto && <p>{errors.hora.message}</p>}
        </div>
        <div>
          <label>Minuto:</label>
          <input type="text" name="minuto" {...register('minuto', { required: 'Campo requerido' })} />
          {errors.minuto && <p>{errors.minuto.message}</p>}
        </div>
        <div>
          <label>Tipo:</label>
          <input type="text" name="tipo" {...register('tipo', { required: 'Campo requerido' })} />
          {errors.tipo && <p>{errors.tipo.message}</p>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>

      {horaCreada && (
        <div>
          <h3>Hora Creada Exitosamente</h3>
          <p>ID: {horaCreada._id}</p>
          {/* Mostrar otros datos según la estructura de tu hora */}
        </div>
      )}
    </div>
  );
}

export default HorasForm;
