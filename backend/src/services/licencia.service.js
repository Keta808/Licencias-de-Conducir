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

// servicio para obtener una licencia por su id de licencia (numeroLicencia)
exports.getLicenciaById = async (numeroLicencia) => {
  try {
    return await Licencia.findById(numeroLicencia);
  } catch (error) {
    throw new Error("Error al obtener la licencia.");
  }
};

// servicio para obtener una licencia por su rut de usuario 
exports.getLicenciaByRut = async (rut) => {
  try {
    return await Licencia.findOne({ rut: rut });
  } catch (error) {
    throw new Error("Error al obtener la licencia.");
  }
};


// Servicio para actualizar una licencia por su id de licencia (numeroLicencia) 
exports.updateLicenciaById = async (numeroLicencia, licenciaData) => {
  try {
    return await Licencia.findByIdAndUpdate(numeroLicencia, licenciaData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Error al actualizar la licencia.");
  }
}; 

// Servicio para eliminar una licencia por su id de licencia (numeroLicencia)
exports.deleteLicenciaById = async (numeroLicencia) => {
  try {
    return await Licencia.findByIdAndDelete(numeroLicencia);
  } catch (error) {
    throw new Error("Error al eliminar la licencia.");
  }
}; 

