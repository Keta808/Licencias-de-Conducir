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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150vh', marginBottom: '100px' }}>
    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
      <h2>Inicia sesión!</h2>
    </div>
    <LoginForm />
  </div>
  );
}

export default Login;
