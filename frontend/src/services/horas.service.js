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


export const getHorabyId = async (id) => {
  try {
      const response = await axios.get(`/horas/${id}`);
      const { status, data } = response;

      if (status === 200) {
          return [data, null];
      } else {
          console.error(`Error getting hour by ID: ${status}`, data);
          return [null, 'Error al obtener la hora por ID'];
      }
  } catch (error) {
      console.error('Error:', error);
      return [null, 'Error al obtener la hora por ID'];
  }
};


export const createHora = async (hora) => {
    try {
        const response = await axios.post('/horas',hora);
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
  

  export const elegirHora = async (id, email) => {
      try {
          // Realiza la solicitud para obtener el rut asociado al correo electrónico
          const response = await axios.get(`obtenerRut/obtenerRutPorEmail/${email}`);
          const { status, data } = response;
  
          if (status !== 200) {
              console.error(`Error al obtener el rut: ${status}`, data);
              return [null, 'Error al obtener el rut'];
          }
  
          const Rrut = data.rut;
         
          const horaFound = await axios.get(`/horas/${id}`);
          

          if (!horaFound.data) {          
              return [null, 'La hora no existe'];
          }
  
          if (!horaFound.data.data.disponibilidad) {
              return [null, 'La hora no está disponible'];
          }

          
          await axios.put(`horas/asignar/${id}`, { rut: Rrut, disponibilidad: false });

          const horaUpdated = {
              id: horaFound.data._id,
              rut: Rrut,
              fecha: horaFound.data.fecha,
              disponibilidad: false,
              tipo: horaFound.data.tipo,
          };
  
          return [horaUpdated, null];
      } catch (error) {
          console.error('Error:', error);
          return [null, 'Error al elegir la hora'];
      }
  };
  
  export const eliminarHora = async (id) => {
    try {
      const response = await axios.delete(`/horas/${id}`);
      const { status, data } = response;
  
      if (status === 200) {
        console.log('Hora eliminada con éxito:', data);
      } else {
        console.error(`Error al eliminar la hora: ${status}`, data);
        throw new Error('Error al eliminar la hora');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const verHoras = async (email) => {
    try {
      const response = await axios.get(`obtenerRut/obtenerRutPorEmail/${email}`);
      const { status, data } = response;

      if (status !== 200) {
          console.error(`Error al obtener el rut: ${status}`, data);
          return [null, 'Error al obtener el rut'];
      }
      const rut = data.rut;
     
      const horasResponse = await axios.get(`/horas/ver/${rut}`);
      const {status: horasStatus, data: horasData} = horasResponse;
      if (horasStatus === 200) {
        return horasData;
      } else {
        console.error(`Error al obtener horas: ${horasStatus}`, horasData);
        return [];
      }

     
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const liberarHora = async (id) => {
    try {
      
      const [hora, errorHora] = await getHorabyId(id);
      if (errorHora) return [null, errorHora];
  
      
  
     
      const response = await axios.put(`/horas/liberar/${id}`, { rut: null, disponibilidad: true });
  
      if (response.status === 200) {
        return [response.data, null];
      } else {
        console.error(`Error al liberar la hora: ${response.status}`, response.data);
        return [null, `Error al liberar la hora: ${response.status}`];
      }
    } catch (error) {
      console.error('Error:', error);
      return [null, 'Error interno del servidor'];
    }
  };