import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';

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
      
      <div>
        <div>
          <button onClick={() => navigate('/horas')}
          >
            Horas
          </button>
          <button onClick={()=> navigate('/postulacion')}>
          Postulacion
          </button>
          <button onClick={()=> navigate('/validacionPos')}>
          Validacion Postulacion
          </button>

        <button onClick={()=> navigate('/licencias')}>
          Licencias 
        </button> 
          <button onClick = {() => navigate('/')}
          >
            Home 
          </button>
          <h1>Bienvenido Funcionario</h1>
          <p>Estas logeado como: {user.email}</p>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
        <Outlet />
      </div>
    );
  }
    else if (user && user.roles && user.roles.length > 0) {
    return(    
      console.log(user.roles[0].name),
          <div>
            
            <button onClick={() => navigate('/')}
            >
              Home
            </button>

            <button onClick = {() => navigate('/SeleccionarHora')}
            >
              Seleccionar Hora
            </button>
            
            <h1>Aqui deberia ir un header</h1>
            <p>Estas logeado como: {user.email}</p>
            <button onClick={handleLogout}>Cerrar sesion</button>
          </div>
        
    );
  }else {
    // Manejar el caso en que user o user.roles no están definidos
    return <p>Error al obtener información del usuario</p>;
  }

}



  

export default Root;
