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

  if(user.roles[0].name === 'admin'){
    return (
      console.log(user),
      <div>
        <div>
          <button onClick={() => navigate('/horas')}
          >
            Horas
          </button>
          <button onClick = {() => navigate('/')}
          >
            Home 
          </button>
          <h1>Aqui deberia ir un header</h1>
          <p>Estas logeado como: {user.email}</p>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
        <Outlet />
      </div>
    );
  }
  else{
    return(    
      console.log(user.roles[0].name),
          <div>
            
            <button onClick={() => navigate('/')}
            >
              Home
            </button>
            <h1>Aqui deberia ir un header</h1>
            <p>Estas logeado como: {user.email}</p>
            <button onClick={handleLogout}>Cerrar sesion</button>
          </div>
        
    );
  }



  
}

export default Root;
