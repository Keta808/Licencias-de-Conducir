import HorasDisponibles from '../components/HoraDisponible';
import VerHoras from '../components/verHoras';
import { useNavigate } from 'react-router-dom';


const SeleccionarHora  = () => {
  const navigate = useNavigate();

    return (
      <div>
          <button onClick = {() => navigate('/')}
          >
            Home 
          </button>
        <div>
          <div>
            <VerHoras/> 
          </div>
          <div className="table-container">
            <h1>Horas Disponibles</h1>
            <HorasDisponibles/>
        </div>
    </div>
    </div>
  );
    
}

export default SeleccionarHora;
