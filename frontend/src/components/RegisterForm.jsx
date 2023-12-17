import React from 'react';
import { useForm } from 'react-hook-form';
import { createUser } from '../services/register.service'; // Ajusta la ruta según tu estructura

const RegisterForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Llama a la función para crear un nuevo usuario
    console.log(data);
    data.roles=["user"];
    const result = await createUser(data);

    // Manejar el resultado según sea necesario
    if (result) {
      console.log('Usuario creado:', result);
      // Puedes redirigir o realizar otras acciones después de crear el usuario
    } else {
      console.error('Error al crear usuario');
      // Puedes mostrar un mensaje de error o realizar otras acciones
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre:</label>
      <input {...register('nombre', { required: 'El nombre es obligatorio' })} />
      {errors.nombre && <p>{errors.nombre.message}</p>}

      <label>RUT:</label>
      <input {...register('rut', { required: 'El RUT es obligatorio' })} />
      {errors.rut && <p>{errors.rut.message}</p>}

      <label>Email:</label>
      <input {...register('email', { required: 'El email es obligatorio', pattern: /^\S+@\S+$/i })} />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Password:</label>
      <input {...register('password', { required: 'La contraseña es obligatoria' })} type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;
