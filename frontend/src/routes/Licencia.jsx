import React from "react"; 
import {useState, useEffect} from 'react';   
import CrearLicenciaForm from '../components/CrearLicenciaForm';
const Title = <h1> Generar Licencias </h1> 
import { buscarLicenciaPorRut, MostrarLicencias, enviarLicenciaPorRUT } from '../services/licencia.service';

function Licencia() { 
  const [rut, setRut] = useState("");
  const [licencia, setLicencia] = useState(null);  
  const [licencias, setLicencias] = useState([]);
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

const handleMostrarTodasLasLicencias = async () => {
  try {
    const response = await MostrarLicencias();
    console.log('Respuesta de obtenerTodasLasLicencias:', response.data);
    console.log('Estado HTTP:', response.status);
    setLicencias(response.data || []);
    setMostrarBusqueda(true);
    setBusquedaRealizada(true);
    setLicencia(null); // Limpiar el estado de licencia actual al mostrar todas las licencias
  } catch (error) {
    console.error('Error al obtener todas las licencias:', error);
  }
}; 

const handleEnviarLicenciaPorCorreo = async (rut) => {
  try {
    const response = await enviarLicenciaPorRUT(rut);
    console.log("Respuesta de enviarLicenciaPorRut:", response.data);
    console.log("Estado HTTP:", response.status); 
    alert("Licencia enviada correctamente"); 
  } catch (error) {
    console.error("Error al enviar la licencia por correo:", error);
  }
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
   {mostrarBusqueda && (
          <button onClick={handleMostrarTodasLasLicencias}>Mostrar Todas las Licencias</button>
        )}
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
    <button onClick={() => handleEnviarLicenciaPorCorreo(rut)}>
    Enviar Por Correo
    </button>
  </div>
) : ( 
  <>
  {busquedaRealizada && licencias.length > 0 ? (
    <div>
      <h2>Listado de Todas las Licencias:</h2>
      <ul>
        {licencias.map((lic) => (
          <li key={lic._id}>
            <p>Rut: {lic.rut}</p>
            <p>Tipo de Licencia: {lic.TipoLicencia}</p>
            <p>Fecha de Retiro: {lic.FechaRetiro}</p>
            <p>Estado de Licencia: {lic.EstadoLicencia}</p> 
          <button onClick={() => handleEnviarLicenciaPorCorreo(lic.rut)}>
          Enviar Por Correo
          </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (  
  <p>{busquedaRealizada ? `No se encontró licencia para el usuario con RUT ${rut}.` : ""}</p>
)} 
 </>
 )}
    </div>
      )} 
      {mostrarFormulario && <CrearLicenciaForm />}
    </div>
  );
}   

export default Licencia;