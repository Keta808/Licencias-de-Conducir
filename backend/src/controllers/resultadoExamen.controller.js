/* eslint-disable no-multiple-empty-lines */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
"use strict"; 

const ResExamenServices = require("../services/ResExamen.service.js"); 
const { respondSuccess, respondError } = require("../utils/resHandler"); 
const { handleError } = require("../utils/errorHandler");
const { resExamenBodySchema, resExamenIdSchema } = require("../schema/ResExamen.schema.js");  
require("dotenv").config();
const multer = require("multer");
const storage = multer.memoryStorage(); // Almacena el archivo en memoria
const upload = multer({ storage: storage }); 
exports.upload = upload.single("pdfDocumento");
const User = require("../models/user.model.js"); 
/**
 * Creates a new resultado de examen.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function createResExamen(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = resExamenBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const [newResExamen, resExamenError] = await ResExamenServices.createResExamen(body);
        if (resExamenError) return respondError(req, res, 400, resExamenError);
        if (!newResExamen) {
            return respondError(req, res, 400, "No se creo el resultado de examen");
        }
        respondSuccess(req, res, 201, newResExamen);
    } catch (error) {
        handleError(error, "resultadoExamen.controller -> createResExamen");
        respondError(req, res, 500, "No se creo el resultado de examen");
    }
}; 
async function createResExamenPorRut(req, res) {
 try {  
    const { params } = req;
    const { rut } = params; // Obten el RUT desde los parámetros
    const { body } = req; // Datos de la licencia desde el cuerpo de la solicitud
    const { fechaDocumento } = body;
    const pdfDocumento = req.file.buffer; 
    // Obten el contenido del archivo PDF
    const userFound = await User.findOne({ rut: rut }); 
    if (!userFound) return [null, "El usuario no existe"]; 

    const [newResExamen, errorResExamen]= await ResExamenServices.createResExamenPorRut(rut, {
        fechaDocumento,
        pdfDocumento,
      }); 
     if (errorResExamen) return respondError(req, res, 400, errorResExamen);  
        if (!newResExamen) { 
            return respondError(req, res, 400, "No se creo el resultado de examen");
        }
      respondSuccess(req, res, 201, newResExamen);
 } catch (error) {
    handleError(error, "resultadoExamen.controller -> createResExamen");
    respondError(req, res, 500, "No se creo el resultado de examen");
}
};
/**
 * Retrieves all resultado de examenes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function getResExamenes(req, res) {
    try {
        const [resExamenes, errorResExamenes] = await ResExamenServices.getResExamenes();
        if (errorResExamenes) {
            return respondError(req, res, 404, errorResExamenes);
        }
        resExamenes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, resExamenes);
    } catch (error) {
        handleError(error, "resultadoExamen.controller -> getResExamenes");
        respondError(req, res, 400, error.message);
    }
};

/**
 * Retrieves a resultado de examen by RUT.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function getResExamenByRut(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = resExamenIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
        const [resExamen, errorResExamen] = await ResExamenServices.getResExamenByRut(params.rut);
        if (errorResExamen) return respondError(req, res, 404, errorResExamen);
        respondSuccess(req, res, 200, resExamen);
    } catch (error) {
        handleError(error, "resultadoExamen.controller -> getResExamenByRut");
        respondError(req, res, 400, error.message);
    }
};  

/**
 * Updates a resultado de examen by RUT.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function updateResExamenByRut(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = resExamenIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);
        const { error: bodyError } = resExamenBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);
        const [updatedExamen, errorUpdatedExamen] = await ResExamenServices.updateResExamenByRut(
            params.rut, 
            body,
            );
        if (errorUpdatedExamen) {
            return respondError(req, res, 404, errorUpdatedExamen);
        }
        respondSuccess(req, res, 200, updatedExamen);
    } catch (error) {
        handleError(error, "resultadoExamen.controller -> updateResExamenByRut");
        respondError(req, res, 400, error.message);
    }
};

/**
 * Deletes a resultado de examen by RUT.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
async function deleteResExamenByRut(req, res) {
    try { 
        const { params } = req; 
        const { error: paramsError } = resExamenIdSchema.validate(params); 
        if (paramsError) return respondError(req, res, 400, paramsError.message);
        const [deletedExamen, errorDeletedExamen] = await ResExamenServices.deleteResExamenByRut(
                params.rut,
        );
        if (errorDeletedExamen) return respondError(req, res, 404, errorDeletedExamen);
        respondSuccess(req, res, 200, deletedExamen);
    } catch (error) {
        handleError(error, "resultadoExamen.controller -> deleteResExamenByRut");
        respondError(req, res, 400, error.message);
    };
};



async function enviarExamenPorRUT(req, res) { 
    try { 
        const { params } = req;  
        const { rut } = params;  
        const [resExamen, errorResExamen] = await ResExamenServices.enviarExamenPorRUT(rut); 
        if (errorResExamen) return respondError(req, res, 404, errorResExamen); 
        respondSuccess(req, res, 200, resExamen);
    } catch (error) {
        handleError(error, "resultadoExamen.controller -> enviarExamenPorRUT");
        respondError(req, res, 400, error.message);
    };
} 




module.exports = {
    createResExamen,
    getResExamenes,
    getResExamenByRut,
    updateResExamenByRut,
    deleteResExamenByRut,
 
    enviarExamenPorRUT, 
    createResExamenPorRut,

};
