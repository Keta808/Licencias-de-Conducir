import axios from './root.service';

// Función para crear un nuevo usuario en el backend
export const createUser = async (userData) => {
  console.log("aaa");
  console.log(userData);
    try {
      const response = await axios.post('/createUser', userData); // Ajusta la ruta según tu configuración
      const { status, data } = response;
  
      if (status === 201) {
        return data; // Puedes retornar cualquier dato útil del servidor si es necesario
      }
  
      // Aquí puedes manejar diferentes códigos de estado si es necesario
      console.error(`Error: ${status}`, data);
      return null;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };