const Licencia = require("../models/licencia.model.js"); // Importa el modelo de licencia
const { handleError } = require("../utils/errorHandler");
const User = require("../models/user.model.js");

/**
 * Creates a new license and a corresponding application if it doesn't exist.
 * @param {Object} licenciaData - The data for the new license.
 * @returns {Array} An array containing the new license and an error message, if any.
 */
async function createLicencia(licenciaData) {
  try {
    const { rut, TipoLicencia, FechaRetiro, EstadoLicencia, pdfDocumento } = licenciaData;

    const LicenciaFound = await Licencia.findOne({ rut: rut });
    if (LicenciaFound) return [null, "La Licencia ya existe"];
    
    const usuarioExistente = await User.findOne({ rut });
    if (!usuarioExistente) {
      return [null, "El usuario con este RUT no existe"];
    }

    const newLicencia = new Licencia({
      rut,
      TipoLicencia,
      FechaRetiro,
      EstadoLicencia, 
      pdfDocumento,
  });
    await newLicencia.save();
    return [newLicencia, null];
  } catch (error) {
    handleError(error, "licencia.service -> createLicencia");
  }
}; 


/**
 * Retrieves all licenses from the database.
 * @returns {Array} An array containing all licenses and an error message, if any.
 */
async function getLicencias() {
  try {
    const licencias = await Licencia.find().exec();
    if (!licencias) return [null, "No hay licencias disponibles"];
    return [licencias, null];
  } catch (error) {
    handleError(error, "licencia.service -> getLicencias");
  }
}; 

/**
 * Retrieves a license from the database by its rut.
 * @param {string} rut - The rut of the license to retrieve.
 * @returns {Array} An array containing the license and an error message, if any.
 */
async function getLicenciaByRut(rut) {
  try {
    const licencia = await Licencia.findOne({ rut: rut }); 
    if (!licencia) return [null, "No hay licencias disponibles"];
    return [licencia, null]; 
  } catch (error) {
    handleError(error, "licencia.service -> getLicenciaByRut");
  }
};  

/**
 * Updates a license in the database by its rut.
 * @param {string} rut - The rut of the license to update.
 * @param {Object} licencia - The updated data for the license.
 * @returns {Array} An array containing the updated license and an error message, if any.
 */
async function updateLicenciaByRut(rut, licencia) {
  try {
    const { TipoLicencia, FechaRetiro, EstadoLicencia, pdfDocumento } = licencia;

    const licenciaFound = await Licencia.findOne({ rut: rut });
    if (!licenciaFound) return [null, "La licencia no existe"];

    const updatedLicencia = await Licencia.findByIdAndUpdate(
      rut,
      {
        TipoLicencia: req.body.TipoLicencia || TipoLicencia,
        FechaRetiro: req.body.FechaRetiro || FechaRetiro,
        EstadoLicencia: req.body.EstadoLicencia || EstadoLicencia,
        pdfDocumento: req.body.pdfDocumento || pdfDocumento,
      },
      { new: true },
    );
    return [updatedLicencia, null];
  } catch (error) {
    handleError(error, "licencia.service -> updateLicenciaByRut");
  }
}; 


/**
 * Deletes a license from the database by its rut.
 * @param {string} rut - The rut of the license to delete.
 * @returns {Array} An array containing the deleted license and an error message, if any.
 */
async function deleteLicenciaByRut(rut) {
  try {
    const licenciaFound = await Licencia.findOne({ rut: rut });
    if (!licenciaFound) return [null, "La licencia no existe"];
    await Licencia.findByIdAndDelete(licenciaFound._id);
    return [licenciaFound, null];
  } catch (error) {
    handleError(error, "licencia.service -> deleteLicenciaByRut");
  }
};

module.exports = {
  createLicencia,
  getLicencias,
  getLicenciaByRut,
  updateLicenciaByRut,
  deleteLicenciaByRut, 
  EnviarLicencia,
};

