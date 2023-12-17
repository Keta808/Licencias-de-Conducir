
import HorasConRut from '../components/HorasConRut';
import HorasSinRut from '../components/HorasSinRut';
import HorasForm from '../components/HorasForm';
import "../../styles/horas.css";


const horas = () => {

    return (
        <div className="container">
          <div className="table-container">
            <br></br>
            <HorasForm/>
            <HorasConRut/>
            
            <h1>Horas Sin Asignar</h1>

            <HorasSinRut/>
            
      </div>
    </div>
  );



      
};

export default horas;