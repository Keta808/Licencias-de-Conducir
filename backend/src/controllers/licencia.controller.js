
const LicenciasServices = require("../services/licencia.service.js");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { licenciaBodySchema, licenciaIdSchema } = require("../schema/licencia.schema");
/**
 * Creates a new license.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function createLicencia(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = licenciaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [newLicencia, licenciaError] = await LicenciasServices.createLicencia(body);
    if (licenciaError) return respondError(req, res, 400, licenciaError);
    if (!newLicencia) {
      return respondError(req, res, 400, "No se creo la licencia");
    }
    respondSuccess(req, res, 201, newLicencia);
  } catch (error) {
    handleError(error, "licencia.controller -> createLicencia");
    respondError(req, res, 500, "No se creo la licencia");
  }
}; 

/**
 * Retrieves all licenses.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function getLicencias(req, res) {
  try {
    const [licencias, errorLicencias] = await LicenciasServices.getLicencias();
    if (errorLicencias) {
      return respondError(req, res, 404, errorLicencias);
    }
    licencias.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, licencias);
  } catch (error) {
    handleError(error, "licencia.controller -> getLicencias");
    respondError(req, res, 400, error.message);
  }
};


/**
 * Retrieves a license by its RUT.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function getLicenciaByRut(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = licenciaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);
    const [licencia, errorLicencia] = await LicenciasServices.getLicenciaByRut(params.rut);
    if (errorLicencia) return respondError(req, res, 404, errorLicencia);
    respondSuccess(req, res, 200, licencia);
  } catch (error) {
    handleError(error, "licencia.controller -> getLicenciaByRut");
    respondError(req, res, 400, error.message);
  }
};

/**
 * Updates a license by its RUT.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function updateLicenciaByRut(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = licenciaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);
    const { error: bodyError } = licenciaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);
    const [updatedLicencia, errorLicencia] = await LicenciasServices.updateLicenciaByRut(
      params.rut,
      body,
    );
    if (errorLicencia) return respondError(req, res, 404, errorLicencia);
    respondSuccess(req, res, 200, updatedLicencia);
  } catch (error) {
    handleError(error, "licencia.controller -> updateLicenciaByRut");
    respondError(req, res, 400, error.message);
  }
};

/**
 * Deletes a license by its RUT.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function deleteLicenciaByRut(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = licenciaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);
    const [licencia, errorLicencia] = await LicenciasServices.deleteLicenciaByRut(params.rut);
    if (errorLicencia) return respondError(req, res, 404, errorLicencia);
    respondSuccess(req, res, 200, licencia);
  } catch (error) {
    handleError(error, "licencia.controller -> deleteLicenciaByRut");
    respondError(req, res, 400, error.message);
  }
};

module.exports = {
  createLicencia,
  getLicencias,
  getLicenciaByRut,
  updateLicenciaByRut,
  deleteLicenciaByRut,
};

