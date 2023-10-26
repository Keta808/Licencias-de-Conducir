"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const ValidacionPosService = require("../services/validacionPos.service");
const { validacionPosBodySchema, validacionPosIdSchema } =
require("../schema/validacionPos.schema");

/** Controlador que se uiliza para manejar las respuestas y peticiones a las rutas*/
/** Obtiene la lista de validaciones */
async function getValidacionPos(req, res) {
    try {
        const [validacionPos, errorValidacionPos] = await ValidacionPosService.getValidacionPos();
        if (errorValidacionPos) return respondError(req, res, 404, errorValidacionPos);

        respondSuccess(req, res, 200, validacionPos);
    } catch (error) {
        handleError(error, "validacionPos.controller -> getValidacionPos");
        respondError(req, res, 500, "No se obtuvo la validacion");
    }
}

/** crear una nueva validacion */
async function createValidacionPos(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = validacionPosBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newValidacionPos, validacionPosError] = 
        await ValidacionPosService.createValidacionPos(body);
        if (validacionPosError) return respondError(req, res, 400, validacionPosError);
        if (!newValidacionPos) {
            return respondError(req, res, 400, "No se creo la validacion");
        }

        respondSuccess(req, res, 201, newValidacionPos);
    } catch (error) {
        handleError(error, "validacionPos.controller -> createValidacionPos");
        respondError(req, res, 500, "No se creo la validacion");
    }
}

/** Obtiene una validacion por su id */
async function getValidacionPosById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = validacionPosIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [validacionPos, errorValidacionPos] =
        await ValidacionPosService.getValidacionPosById(params.id);
        if (errorValidacionPos) return respondError(req, res, 404, errorValidacionPos);

        respondSuccess(req, res, 200, validacionPos);
    } catch (error) {
        handleError(error, "validacionPos.controller -> getValidacionPosById");
        respondError(req, res, 500, "No se obtuvo la validacion");
    }
}

/** Actualiza una validacion por su id */
async function updateValidacionPosById(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = validacionPosIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = validacionPosBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [validacionPos, errorValidacionPos] =
        await ValidacionPosService.updateValidacionPosById(params.id, body);
        if (errorValidacionPos) return respondError(req, res, 404, errorValidacionPos);

        respondSuccess(req, res, 200, validacionPos);
    } catch (error) {
        handleError(error, "validacionPos.controller -> updateValidacionPosById");
        respondError(req, res, 500, "No se actualizo la validacion");
    }
}

/** Elimina una validacion por su id */
async function deleteValidacionPosById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = validacionPosIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const validacionPos = await ValidacionPosService.deleteValidacionPosById(params.id);
        if (!validacionPos) return respondError(req, res, 404, "No se encontro la validacion");

        respondSuccess(req, res, 200, validacionPos);
    } catch (error) {
        handleError(error, "validacionPos.controller -> deleteValidacionPosById");
        respondError(req, res, 500, "No se elimino la validacion");
    }
}

module.exports = {
    getValidacionPos,
    createValidacionPos,
    getValidacionPosById,
    updateValidacionPosById,
    deleteValidacionPosById,
};
