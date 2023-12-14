import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import '../../styles/login.css'; // Ajusta la ruta según tu estructura de archivos

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default LoginForm;
