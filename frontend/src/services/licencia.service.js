import axios from './root.service';

export const createLicenciaPorRut = async (rut, licenciaData) => {
  try {
    const response = await axios.post(`/licencias/crearLicenciaPorRut/${encodeURIComponent(rut)}`, licenciaData);
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