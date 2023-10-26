"use strict";

const ValidacionPos = require("../models/validacionPos.model.js");
const { handleError } = require("../utils/errorHandler");

/** servicio que se conecta con la bd para traer lista de validaciones */
async function getValidacionPos() {
    try {
        const validacionPos = await ValidacionPos.find().exec();
        if (!validacionPos) return [null, "No hay validaciones"];

        return [validacionPos, null];
    } catch (error) {
        handleError(error, "validacionPos.service -> getValidacionPos");
    }
}

/** servicio que se conecta con la bd para crear una nueva validacion */
async function createValidacionPos(validacionPos) {
    try {
        const { rut, estado } = validacionPos;

        const validacionPosFound = await ValidacionPos.findOne({ rut: validacionPos.rut });
        if (validacionPosFound) return [null, "La validacion ya existe"];

        const newValidacionPos = new ValidacionPos({
            rut,
            estado,
        });
        await newValidacionPos.save();

        return [newValidacionPos, null];
    } catch (error) {
        handleError(error, "validacionPos.service -> createValidacionPos");
    }
}

/** servicio que se conecta con la bd para traer una validacion por su id */
async function getValidacionPosById(id) {
    try {
        const postulacion = await ValidacionPos.findById(id).exec();
        if (!postulacion) return [null, "No hay postulacion"];

        return [postulacion, null];
    } catch (error) {
        handleError(error, "postulacion.service -> getPostulacionById");
    }
}

/** servicio que se conecta con la bd para actualizar una validacion por su id */
async function updateValidacionPosById(id, validacionPos) {
    try {
        const { rut, estado } = validacionPos;
        const validacionPosFound = await ValidacionPos.findById(id).exec();
        if (!validacionPosFound) return [null, "No hay validacion"];

        const validacionPosUpdated = await ValidacionPos.findByIdAndUpdate(id, {
            rut,
            estado,
        }, { new: true });
        
        return [validacionPosUpdated, null];
    } catch (error) {
        handleError(error, "validacionPos.service -> updateValidacionPosById");
    }
}

/** servicio que se conecta con la bd para eliminar una validacion por id */
async function deleteValidacionPosById(id) {
    try {
        const validacionPos = await ValidacionPos.findByIdAndDelete(id).exec();
        if (!validacionPos) return [null, "No hay validacion"];

        return [validacionPos, null];
    } catch (error) {
        handleError(error, "validacionPos.service -> deleteValidacionPosById");
    }
}

module.exports = {
    getValidacionPosById,
    getValidacionPos,
    createValidacionPos,
    updateValidacionPosById,
    deleteValidacionPosById,
};
