"use strict";

const Postulacion = require("../models/postulacion.model.js");
const { handleError } = require("../utils/errorHandler");
/**
 * Servicio que se conecta con la BD para traer la lista de postulaciones
*/
async function getPostulaciones() {
    try {
        const postulaciones = await Postulacion.find().exec();
        if (!postulaciones) return [null, "No hay postulaciones"];

        return [postulaciones, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getPostulaciones");
    }
}

/**
 * Servicio que se conecta con la BD para crear una nueva postulacion
 */
async function createPostulaciones(postulacion) {
    try {
        const { nombre, rut, edad, direccion, tramite } = postulacion;

        const postulacionFound = await Postulacion.findOne({ rut: postulacion.rut });
        if (postulacionFound) return [null, "La postulacion ya existe"];

        const newPostulacion = new Postulacion({
            nombre,
            rut,
            edad,
            direccion,
            tramite,

        });
        await newPostulacion.save();

        return [newPostulacion, null];
    } catch (error) {
        handleError(error, "postulacion.service -> createPostulaciones");
    }
}

/**
 * Servicio que se conecta con la BD para traer una postulacion por su id
 */
async function getPostulacionById(id) {
    try {
        const postulacion = await Postulacion.findById(id).exec();
        if (!postulacion) return [null, "No hay postulacion"];

        return [postulacion, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getPostulacionById");
    }
}

/**
 * Servicio que se conecta con la BD para actualizar una postulacion por su id
 */
async function updatePostulacion(id, postulacion) {
    try {
        const { nombre, rut, edad, direccion, tramite } = postulacion;

        const postulacionFound = await Postulacion.findById(id);
        if (!postulacionFound) return [null, "La postulacion no existe"];

        const postulacionUpdated = await Postulacion.findByIdAndUpdate(id, {
            nombre,
            rut,
            edad,
            direccion,
            tramite,
        }, { new: true });

        return [postulacionUpdated, null];
    } catch (error) {
        handleError(error, "postulacion.service -> updatePostulacion");
    }
}

/**
 * Servicio que se conecta con la BD para eliminar una postulacion por su id
 */
async function deletePostulacionById(id) {
    try {
        const postulacion = await Postulacion.findByIdAndDelete(id).exec();
        if (!postulacion) return [null, "No hay postulacion"];

        return [postulacion, null];
    } catch (error) {
        handleError(error, "postulacion.service -> deletePostulacionById");
    }
}

module.exports = {
    getPostulaciones,
    createPostulaciones,
    getPostulacionById,
    updatePostulacion,
    deletePostulacionById,
};
