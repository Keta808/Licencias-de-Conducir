import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/postulacion');
  }

  if (localStorage.getItem('user')) {
    return (
      <>
        <h2>Ya estas logeado!</h2>
        <button onClick={() => navigate('/')}>Ir a home</button>
        <button onClick={() => navigate('/postulacion')}>Ir a Formulario</button>
      </>
    );
  }

  return (
    <div>
      <h2>Inicia sesion!</h2>
    </div>
  );
}

export default Login;
