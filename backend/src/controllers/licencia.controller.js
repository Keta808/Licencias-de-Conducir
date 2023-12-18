/* eslint-disable space-before-blocks */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
"use strict";  

const LicenciasServices = require("../services/licencia.service.js");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { licenciaBodySchema, licenciaIdSchema } = require("../schema/licencia.schema"); 
const User = require("../models/user.model.js"); 
require("dotenv").config();
const multer = require("multer");
const storage = multer.memoryStorage(); // Almacena el archivo en memoria
const upload = multer({ storage: storage }); 
exports.upload = upload.single("pdfDocumento");
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
    const { rut } = params;


    const [licencia, errorMessage, pdfDocumento] = await LicenciasServices.getLicenciaByRut(rut);

    if (!licencia) {
      
      return respondError(req, res, 404, errorMessage);
    }

    // Si hay un pdfDocumento, devolverlo
    if (pdfDocumento) {
      // eslint-disable-next-line quotes
      res.contentType('application/pdf');
      res.send(pdfDocumento.data);
    } else {
      respondSuccess(req, res, 200, licencia);
    }
  } catch (error) {
    handleError(error, "licencia.controller -> getLicenciaByRut");
    respondError(req, res, 500, error.message);
  }
}


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
    const { error: paramsError } = licenciaBodySchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);
    const [licencia, errorLicencia] = await LicenciasServices.deleteLicenciaByRut(params.rut);
    if (errorLicencia) return respondError(req, res, 404, errorLicencia);
    respondSuccess(req, res, 200, licencia);
  } catch (error) {
    handleError(error, "licencia.controller -> deleteLicenciaByRut");
    respondError(req, res, 400, error.message);
  }
};


async function enviarLicenciaPorRUT(req, res) {
  try {
    const { params } = req;
    const { rut } = params; // Obtener el RUT desde los parámetros de la ruta

    // Llama a la función del servicio para enviar la licencia por RUT
    const [persona, error] = await LicenciasServices.enviarLicenciaPorRUT(rut);

    if (error) {
      return respondError(req, res, 400, error); // Maneja el error correctamente
    }

    return respondSuccess(req, res, 200, persona); // Devuelve la respuesta exitosa
  } catch (error) {
    handleError(error, "licencia.controller -> enviarLicenciaPorRUT");
    return respondError(req, res, 500, error.message); // Maneja los errores generales
  }
} 

async function createLicenciaPorRut(req, res) {
  try {
      const { params } = req;
      const { rut } = params;
      const { body, file } = req; // Datos de la licencia desde el cuerpo de la solicitud
      const { TipoLicencia, FechaRetiro, EstadoLicencia } = body;
      const pdfDocumento = file ? file.buffer : null;

      const userFound = await User.findOne({ rut: rut });
      if (!userFound) return respondError(req, res, 404, "El usuario no existe"); 
    

      const [newLicencia, errorLicencia] = await LicenciasServices.createLicenciaPorRut(rut, {
          TipoLicencia,
          FechaRetiro,
          EstadoLicencia,
          pdfDocumento,
      });

      if (errorLicencia) {
          return respondError(req, res, 400, errorLicencia);
      }

      if (!newLicencia) {
          return respondError(req, res, 400, "No se creó la licencia");
      }

      respondSuccess(req, res, 201, newLicencia);
  } catch (error) {
      handleError(error, "licencia.controller -> createLicenciaPorRut");
      respondError(req, res, 500, "No se creó la licencia");
  }
}


module.exports = {
  createLicencia,
  getLicencias,
  getLicenciaByRut,
  updateLicenciaByRut,
  deleteLicenciaByRut, 
  enviarLicenciaPorRUT, 
  createLicenciaPorRut,
};

