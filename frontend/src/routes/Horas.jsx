
import HorasConRut from '../components/HorasConRut';
import HorasSinRut from '../components/HorasSinRut';
import HorasForm from '../components/HorasForm';



const horas = () => {

    return (
        <div className="container">
          <div className="table-container">
            <br></br>
            <HorasForm/>
            <HorasConRut/>
            
  

            <HorasSinRut/>
            
      </div>
    </div>
  );



      
};

export default horas;