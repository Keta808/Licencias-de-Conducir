import React from "react"; 
import {useState} from 'react';   
import CrearLicenciaForm from '../components/CrearLicenciaForm';

const Title = <h1> Generar Licencias </h1> 
import { buscarLicenciaPorRut, MostrarLicencias, enviarLicenciaPorRUT, EliminarLicenciaPorRut } from '../services/licencia.service'; 
import { getExamenesAprobados } from '../services/ResExamen.services';

import ResExamen from '../components/ResExamen' ;


function Licencia() { 
  const [rut, setRut] = useState("");
  const [licencia, setLicencia] = useState(null);  
  const [licencias, setLicencias] = useState([]);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false); 
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [examenesAprobados, setExamenesAprobados] = useState([]);
  const [mostrarResExamen, setMostrarResExamen] = useState(false); 

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
    setMostrarFormulario(false);
    setBusquedaRealizada(false);
  }; 

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleToggleForm = () => {
    setMostrarFormulario((prevMostrarFormulario) => !prevMostrarFormulario);
    setMostrarBusqueda(false);
    setBusquedaRealizada(false);
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

const handleEliminarLicenciaPorRut = async (rut) => {
  // Mostrar aviso de confirmación
  const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta licencia?");

  if (!confirmacion) {
    // El usuario canceló la eliminación
    return;
  }

  try {
    // Eliminar la licencia
    const response = await EliminarLicenciaPorRut(rut);
    console.log("Respuesta de EliminarLicenciaPorRut:", response.data);
    console.log("Estado HTTP:", response.status);

    // Actualizar la lista después de la eliminación
    await handleMostrarTodasLasLicencias();

    alert("Licencia eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la licencia:", error);
  }
}; 


 

const handleToggleResExamen = async () => {
  try {
    // Lógica para obtener los exámenes aprobados
    const response = await getExamenesAprobados();
    const examenesAprobados = response.data || [];

    // Actualizar el estado con los exámenes aprobados
    setExamenesAprobados(examenesAprobados);

    // Toggle del estado para mostrar/ocultar
    setMostrarResExamen((prevMostrarResExamen) => !prevMostrarResExamen);
  } catch (error) {
    console.error('Error al Obtener Resultados', error);
  }
};
 
  return (
    <div>
      {Title}

      <div>
        <button onClick={handleToggleBusqueda}>
          {mostrarBusqueda ? "Ocultar Licencia" : "Ver Licencia"}  
        </button>  
      {mostrarBusqueda && !mostrarFormulario && (
      <button onClick={handleMostrarTodasLasLicencias}>Mostrar Todas las Licencias</button>)} 
      <button onClick={handleToggleForm}>
      {mostrarFormulario ? "Ocultar Formulario" : "Crear Licencia"}  
      </button>   
      <button onClick={handleToggleResExamen}>
      {mostrarResExamen ? "Ocultar Resultados" : "Ver Resultados Examenes"}  
      </button>  
      {mostrarResExamen && <ResExamen examenesAprobados={examenesAprobados} />}
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
    {/* Formatear la fecha antes de mostrarla */}
    <p>Fecha de Retiro: {new Date(licencia['FechaRetiro']).toLocaleDateString('es-CL')}</p>
    <p>Estado de Licencia: {licencia['EstadoLicencia']}</p>
    <button onClick={() => handleEnviarLicenciaPorCorreo(rut)}>
    Enviar Por Correo
    </button> 
    <button onClick={() => handleEliminarLicenciaPorRut(rut)}>
    Eliminar Licencia
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
            {/* Formatear la fecha antes de mostrarla */}
            <p>Fecha de Retiro: {new Date(lic.FechaRetiro).toLocaleDateString('es-CL')}</p>
            <p>Estado de Licencia: {lic.EstadoLicencia}</p> 
          <button onClick={() => handleEnviarLicenciaPorCorreo(lic.rut)}>
          Enviar Por Correo
          </button> 
          <button onClick={() => handleEliminarLicenciaPorRut(lic.rut)}>
    Eliminar Licencia
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