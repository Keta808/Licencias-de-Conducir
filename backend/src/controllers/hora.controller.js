"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const HoraService = require("../services/hora.service");
const { horaBodySchema, horaIdSchema } = require("../schema/hora.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las horas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getHoras(req,res){
    try {
        const [horas, errorHoras] = await HoraService.getHoras();
        if (errorHoras) return respondError(req, res, 404, errorHoras);
        horas.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, horas);
    } catch (error) {
        handleError(error, "hora.controller -> getHoras");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea una nueva hora
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */



async function createHora(req,res){
    
    try {
        const { body } = req;

       
      const { error: bodyError } = horaBodySchema.validate(body);
    
      if (bodyError) return respondError(req, res, 400, bodyError.message);    
        const [newHora, horaError] = await HoraService.createHora(body);
        if (horaError) return respondError(req, res, 400, horaError);
        if (!newHora) {
            return respondError(req, res, 400, "No se creo la hora");
        }

        respondSuccess(req, res, 201, newHora);
    } catch (error) {

        handleError(error, "hora.controller -> createHora");
        respondError(req, res, 500, "No se creo la hora");
    }

}


/**
 * Obtiene una hora por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function getHoraById(req,res){
    try {
        const { params } = req;
        const { error: paramsError } = horaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [hora, errorHora] = await HoraService.getHorabyId(params.id);

        if (errorHora) return respondError(req, res, 404, errorHora);

        respondSuccess(req, res, 200, hora);
    } catch (error) {
        console.log(error, "aa ")
        handleError(error, "hora.controller -> getHoraById");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Actualiza una hora por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function updateHora(req,res){
    try {
        const { params, body } = req;
        const { error: paramsError } = horaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = horaBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [hora, errorHora] = await HoraService.updateHora(params.id, body);

        if (errorHora) return respondError(req, res, 404, errorHora);

        respondSuccess(req, res, 200, hora);
    } catch (error) {
        handleError(error, "hora.controller -> updateHora");
        respondError(req, res, 400, error.message);
    }
}


/**
 * Elimina una hora por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function deleteHora(req,res){
    try {
        const { params } = req;
        const { error: paramsError } = horaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [hora, errorHora] = await HoraService.deleteHora(params.id);

        if (errorHora) return respondError(req, res, 404, errorHora);

        respondSuccess(req, res, 200, hora);
    } catch (error) {
        handleError(error, "hora.controller -> deleteHora");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Funcion para obtener las horas disponibles
 * 
 */

async function getHorasDisponibles(req,res){
    try {

        const {rut} =req.params;
        const [horas, errorHoras] = await HoraService.getHorasDisponibles(rut);
        if (errorHoras) return respondError(req, res, 404, errorHoras);

        horas.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, horas);
    } catch (error) {
        handleError(error, "hora.controller -> getHoras");
        respondError(req, res, 400, error.message);
    }
}

/**
 * funcion para actualizar la disponibilidad de una hora mediante el rut de un usuario en sesion
 */

async function elegirHora(req,res){
    try {
       
        const { id } = req.params;
        const { rut } = req.body;

        const [hora, errorHora] = await HoraService.elegirHora(id, rut);
        
        if (errorHora) return respondError(req, res, 404, errorHora);
        respondSuccess(req, res, 200, hora);
    } catch (error) {
        handleError(error, "hora.controller -> elegirHora");
        respondError(req, res, 400, error.message);
    }
}

async function verHoras(req, res) {
    try {
        const { rut } = req.params;
        const [horas, errorHoras] = await HoraService.verHoras(rut);

        if (errorHoras) {
            return respondError(req, res, 400, errorHoras);
        }

        horas.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, horas);
    } catch (error) {
        handleError(error, "hora.controller -> verHoras");
        respondError(req, res, 500, "Error interno del servidor");
    }
}

async function liberarHora(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = horaIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [horaLiberada, errorLiberar] = await HoraService.liberarHora(params.id);
        if (errorLiberar) return respondError(req, res, 400, errorLiberar);

        respondSuccess(req, res, 200, horaLiberada);
    } catch (error) {
        handleError(error, "hora.controller -> liberarHora");
        respondError(req, res, 500, "Error interno del servidor");
    }
}

/**
 * Exporta funciones para ser utilizadas en routes/hora.routes.js
 */
module.exports = {
    getHoras,
    createHora,
    getHoraById,
    updateHora,
    getHorasDisponibles,
    elegirHora,
    deleteHora,
    verHoras,
    liberarHora
};