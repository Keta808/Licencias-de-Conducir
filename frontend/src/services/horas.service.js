import axios from './root.service';

export const getHoras = async () => {
    try {
        const response = await axios.get('/horas');
        const {status, data} = response;
        if (status === 200) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error(error);
    }
};

export const createHora = async (hora) => {
    try {
        const response = await axios.post('/horas', hora);
        const {status, data} = response;
        if (status === 201) {
            return response.data;
        }
        return {};
    } catch (error) {
        console.error(error);
    }
};

export const getHorasDisponibles = async () => {
    try {
      // Obtén el correo electrónico del almacenamiento local
      const user = JSON.parse(localStorage.getItem('user'));
      const email = user && user.email;
  
      if (!email) {
        console.error('No se pudo obtener el correo electrónico del usuario.');
        return null;
      }
  
      // Realiza la solicitud para obtener el rut asociado al correo electrónico
      const response = await axios.get(`obtenerRut/obtenerRutPorEmail/${email}`);
      const { status, data } = response;
  
      console.log("rut: ");
      console.log(data);
      if (status === 200) {
        const rut = data.rut;
  
        // Ahora puedes usar el rut para realizar la solicitud final
        const horasResponse = await axios.get(`/horas/disponibles/${rut}`);
        const { status: horasStatus, data: horasData } = horasResponse;
  
        if (horasStatus === 200) {
          return horasData;
        } else {
          console.error(`Error al obtener horas: ${horasStatus}`, horasData);
          return null;
        }
      } else {
        console.error(`Error al obtener el rut: ${status}`, data);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

