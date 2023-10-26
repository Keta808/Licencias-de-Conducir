/* eslint-disable space-before-blocks */
/* eslint-disable require-jsdoc */
"use strict";

const Hora = require("../models/horas.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene las horas de la base de datos
 */

async function getHoras() {
    try {
        const horas = await Hora.find() .exec();

        if (!horas) return [null, "No hay horas disponibles"];
        
        return [horas, null];
    } catch (error) {
        handleError(error, "hora.service -> getHoras");
    }
}

/**
 * Crea una nueva hora en la base de datos
 * @param {Object} hora Objeto de hora
 * @returns {Promise} Promesa con el objeto de hora creado
 */

async function createHora(hora) {
    try {
        const { rut, fecha, disponibilidad, tipo } = hora;

        if(hora.rut != null){
            const horaFound = await Hora.findOne({ rut: hora.rut });
        
            if (horaFound) return [null, "La hora ya existe"];
          
        }

        const newHora = new Hora({
            rut,
            fecha: {
                year: fecha.year,
                mes: fecha.mes,
                dia: fecha.dia,
                hora: fecha.hora,
                minuto: fecha.minuto
            },
            disponibilidad,
            tipo
        });
        await newHora.save();

        return [newHora, null];
    } catch (error) {
        console.error(error);
        handleError(error, "hora.service -> createHora");
    }
}

/**
 * Obtiene una hora por su id de la base de datos
 * @param {string} Id de la hora
 * @returns {Promise} Promesa con el objeto de hora
 */
async function getHorabyId(id) {
    try {
        const hora = await Hora.findById(id).exec();
        if (!hora) return [null, "La hora no existe"];

        return [hora, null];
    } catch (error) {
        
        handleError(error, "hora.service -> getHoraById");
    }
}

/**
 * Actualiza una hora por su id en la base de datos
 * @param {string} Id de la hora
 * @param {Object} hora Objeto de hora
 * @returns {Promise} Promesa con el objeto de hora actualizado
 */


async function updateHora(id, hora) {
    try {
      
        const horaFound = await Hora.findById(id);
        if (!horaFound) return [null, "La hora no existe"];

        const { rut, fechaSchema, disponibilidad, tipo } = hora;

        const horaUpdated = await Hora.findByIdAndUpdate(
            id,
            {
                rut,
                fechaSchema,
                disponibilidad,
                tipo
            },
            {
                new: true,
            }
        ).exec();

        return [horaUpdated, null];
    } catch (error) {
        handleError(error, "hora.service -> updateHora");
    }
}

/**
 * Elimina una hora por su id de la base de datos
 * @param {string} Id de la hora
 * @returns {Promise} Promesa con el objeto de hora eliminado
 */

async function deleteHora(id) {
    try {
        const horaFound = await Hora.findById(id);
        if (!horaFound) return [null, "La hora no existe"];

        const horaDeleted = await Hora.findByIdAndDelete(id).exec();

        return [horaDeleted, null];
    } catch (error) {
        handleError(error, "hora.service -> deleteHora");
    }
}


/**
 * Funcion para obtener las horas disponibles
 * 
 */

async function getHorasDisponibles() {
    try {
        const horas = await Hora.find({disponibilidad: true}) .exec();

        if(!horas) return [null, "No hay horas disponibles"];
        
        return [horas, null];
    } catch (error) {
        handleError(error, "hora.service -> getHoras");
    }
}





module.exports = {
    getHoras,
    createHora, 
    getHorabyId,
    updateHora,
    getHorasDisponibles,
    deleteHora
};



