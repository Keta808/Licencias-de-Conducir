const Licencia = require("../models/licencia.model.js"); // Importa el modelo de licencia

// const LicenciasServices= require("../services/licencia.service.js");


// Controlador para crear una nueva licencia
exports.createLicencia = async (req, res) => {
  try {
    const nuevaLicencia = new Licencia(req.body);
    const licenciaGuardada = await nuevaLicencia.save();
    res.status(201).json(licenciaGuardada);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la licencia." });
  }
};

// Controlador para obtener todas las licencias
exports.getLicencia = async (req, res) => {
  try {
    const licencias = await Licencia.find();
    res.json(licencias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las licencias." });
  }
};


// Controlador para obtener una licencia por su id de licencia 
exports.getLicenciaById = async (req, res) => {
  try {
    const licencia = await Licencia.findById(req.params.nuevaLicencia);
    res.json(licencia);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la licencia." });
  }
}; 

// Controlador para obtener una licencia por su rut de usuario 
exports.getLicenciaByRut = async (req, res) => {
  try {
    const licencia = await Licencia.findOne({ rut: req.params.rut });
    res.json(licencia);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la licencia." });
  }
}; 

// Controlador para actualizar una licencia por su id de licencia 
exports.updateLicenciaById = async (req, res) => { 
    try {
        const LicenciaUpdated = await User.findByIdAndUpdate(
           nuevaLicencia,
            {
                FechaRetiro: req.body.FechaRetiro,
                EstadoLicencia: req.body.EstadoLicencia,
                pdfDocumento: req.body.pdfDocumento,
            },
            { new: true }, // Devuelve el nuevo objeto actualizado
          );
          
        res.json({ mensaje: "La licencia se ha actualizado." });
        return [LicenciaUpdated, null];
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la licencia." });
    }
};  

// Controlador para actualizar una licencia por su rut de usuario
exports.updateLicenciaByRut = async (req, res) => { 
  try {
      const LicenciaUpdated = await User.findOneAndUpdate(
         rut,
          {
              FechaRetiro: req.body.FechaRetiro || FechaRetiro,
              EstadoLicencia: req.body.EstadoLicencia || EstadoLicencia,
              pdfDocumento: req.body.pdfDocumento || pdfDocumento,
          },
          { new: true }, // Devuelve el nuevo objeto actualizado
        );
        
      res.json({ mensaje: "La licencia se ha actualizado." });
      return [LicenciaUpdated, null];
  } catch (error) {
      res.status(500).json({ error: "Error al actualizar la licencia." });
  }
};

// Controlador para eliminar una licencia por su id de licencia 
exports.deleteLicenciaById = async (req, res) => {
  try {
    await Licencia.findByIdAndDelete(req.params.numeroLicencia);
    res.json({ mensaje: "La licencia se ha eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la licencia." });
  }
}; 


// Controlador para eliminar una licencia por su rut de usuario
exports.deleteLicenciaByRut = async (req, res) => {
  try {
    await Licencia.findOneAndDelete(req.params.rut);
    res.json({ mensaje: "La licencia se ha eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la licencia." });
  }
}; 


// Controlador para enviar una licencia por correo electronico 
exports.sendLicenciaByEmail = async (req, res) => {
  try {
    const licencia = await Licencia.findOne({ rut: req.params.rut });
    res.json(licencia);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la licencia." });
  }
}; 
