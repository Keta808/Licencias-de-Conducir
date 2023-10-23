const Licencia = require("../models/licencia.model"); // Importa el modelo de licencia

// Servicio para crear una nueva licencia
exports.createLicencia = async (licenciaData) => {
  try {
    const nuevaLicencia = new Licencia(licenciaData);
    return await nuevaLicencia.save();
  } catch (error) {
    throw new Error("Error al crear la licencia.");
  }
};

// Servicio para obtener todas las licencias
exports.getLicencias = async () => {
  try {
    return await Licencia.find();
  } catch (error) {
    throw new Error("Error al obtener las licencias.");
  }
}; 

