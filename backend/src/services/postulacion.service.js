"use strict";

const Postulacion = require("../models/postulacion.model.js");
/**
 * Servicio que se conecta con la BD para traer la lista de postulaciones
*/
async function getPostulaciones() {
    try {
        const postulaciones = await Postulacion.find().exec();
        if (!postulaciones) return [null, "No hay postulaciones"];

        return [postulaciones, null];
    } catch (error) {
        
    }
}

module.exports = {
    getPostulaciones,
};
