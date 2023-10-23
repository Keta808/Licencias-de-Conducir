"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const PostulacionService = require("../services/postulacion.service");

/** Controlador que se uiliza para manejar las respuestas y peticiones a las rutas*/
async function getPostulaciones() {
    try {
        const [postulaciones, errorPostulaciones] = await PostulacionService.getPostulaciones();
        if (errorPostulaciones) return respondError(req, res, 404, errorPostulaciones);

        postulaciones.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, postulaciones);
    } catch (error) {
        handleError(error, "postulacion.controller -> getPostulaciones");
        respondError(req, res, 400, error.message);
    }
}

module.exports = {
    getPostulaciones,
};
