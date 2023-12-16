import React from "react"; 
import {useState, useEffect} from 'react';  
import axios from "../services/root.service";  
import CrearLicenciaForm from '../components/CrearLicenciaForm';
const Title = <h1> Generar Licencias </h1> 
import { buscarLicenciaPorRut } from '../services/licencia.service';

function Licencia() { 
  const [rut, setRut] = useState("");
  const [licencia, setLicencia] = useState(null); 
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false); 
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  
  
  const handleSearch = async () => {
    try {
      const response = await buscarLicenciaPorRut(rut);
      console.log("Respuesta de buscarLicenciaPorRut:", response.data);
      console.log("Estado HTTP:", response.status);
      setLicencia(response.data || null);
      setBusquedaRealizada(true);
      setMostrarBusqueda(true);

    } catch (error) {
      console.error("Error al buscar licencia:", error);
    }
  };
  

  const handleToggleBusqueda = () => {
    setMostrarBusqueda((prevMostrarBusqueda) => !prevMostrarBusqueda);
    // También podríamos resetear busquedaRealizada si deseas que el mensaje aparezca solo después de cada búsqueda
     setBusquedaRealizada(false);
  }; 

const [mostrarFormulario, setMostrarFormulario] = useState(false);
const handleToggleForm = () => {
   setMostrarFormulario((prevMostrarFormulario) => !prevMostrarFormulario);
};

  return (
    <div>
      {Title}

      <div>
        <button onClick={handleToggleBusqueda}>
          {mostrarBusqueda ? "Ocultar Licencia" : "Ver Licencia"}
        </button> 
        <button onClick={handleToggleForm}>
      {mostrarFormulario ? "Ocultar Formulario" : "Crear Licencia"}
   </button>
      </div>

      {mostrarBusqueda && (
        <div>
          <label htmlFor="rut">Ingrese el Rut:</label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>

          {busquedaRealizada && licencia ? (
  <div>
    <h2>Datos de la licencia:</h2>
    <p>Rut: {licencia['rut']}</p>
    <p>Tipo de Licencia: {licencia['TipoLicencia']}</p>
    <p>Fecha de Retiro: {licencia['FechaRetiro']}</p>
    <p>Estado de Licencia: {licencia['EstadoLicencia']}</p>
    {/* Agrega más detalles según tu modelo de licencia */}
  </div>
) : (
  <p>{busquedaRealizada ? `No se encontró licencia para el usuario con RUT ${rut}.` : ""}</p>
)}
        </div>
      )} 
      {mostrarFormulario && <CrearLicenciaForm />}
    </div>
  );
}   

export default Licencia;