import HorasDisponibles from '../components/HoraDisponible';




const SeleccionarHora  = () => {
   

    return (
   
        <div className="container">
          <div className="table-container">
            <h1>Horas Sin Asignar</h1>
            <HorasDisponibles/>
        </div>
    </div>
  );
    
}

export default SeleccionarHora;
