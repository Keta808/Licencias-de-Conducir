import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../../styles/root.css';
function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();

  if (user && user.roles && user.roles.length > 0 && user.roles[0].name === 'admin') {
    return (
      <div className="container">
        <div className="navbar">
          <div className="branding">
            
          </div>
          <button onClick={() => navigate('/horas')}>Horas</button>
          <button onClick={() => navigate('/postulacion')}>Postulacion</button>
          <button onClick={() => navigate('/validacionPos')}>Validacion Postulacion</button>
          <button onClick={() => navigate('/licencias')}>Licencias</button>
          <button onClick={() => navigate('/')}>Home</button>
          <p>Estás logueado como: {user.email}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  } else if (user && user.roles && user.roles.length > 0) {
    return (
      <div className="container">
        <div className="navbar">
          <div className="branding">
           
          </div>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/SeleccionarHora')}>Seleccionar Hora</button>
          <p>Estás logueado como: {user.email}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
        <h1>Aqui debería ir un header</h1>
        <p>Estás logueado como: {user.email}</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  } else {
    // Manejar el caso en que user o user.roles no están definidos
    return <p>Error al obtener información del usuario</p>;
  }

}



  

export default Root;
