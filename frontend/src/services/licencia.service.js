import axios from './root.service';

export const createLicenciaPorRut = async (rut, licenciaData) => {
  try {
      const response = await axios.post(`/licencias/crearLicenciaPorRut/${encodeURIComponent(rut)}`, licenciaData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const buscarLicenciaPorRut = async (rut) => {
  try {
    const response = await axios.get(`/licencias/Buscar-Licencia/${encodeURIComponent(rut)}`);
    return response.data; 
   
  } catch (error) {
    throw error;
  }
}; 

export const MostrarLicencias = async () => { 
 try{ 
  const response = await axios.get(`/licencias/Licencias`); 
  return response.data;
 }catch (error) {
  throw error;
 }
}; 


export const enviarLicenciaPorRUT = async (rut) => { 
  try{ 
    const response = await axios.get(`/licencias/EnviarLicenciaRut/${encodeURIComponent(rut)}`); 
    return response.data;
  }catch (error) {
    throw error;
  }
  } 

export const EliminarLicenciaPorRut = async (rut) => { 
  try{ 
    const response = await axios.delete(`/licencias/EliminarPorRut/${encodeURIComponent(rut)}`); 
    return response.data;
  }catch (error) {
    throw error;
  }
  }