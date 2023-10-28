"use strict";
const mongoose = require("mongoose");  

/**
 * 
 * @param {*} year 
 * @returns 
 */
function validarYear(year) {
    const fecha = new Date();
    const yearActual = fecha.getFullYear();
    return year >= yearActual;
}

/**
 * 
 * @param {*} mes 
 * @returns 
 */
function validarMes(mes) {
    const fecha = new Date();
    const mesActual = fecha.getMonth() + 1;

    return mes >= 1 && mes <= 12 && mes >= mesActual;
}

/**
 * 
 * @param {*} dia 
 * @returns 
 */
function validarDia(dia) {
    const fecha = new Date();
    return dia >= 1 && dia <= 31;
}

/**
 * 
 * @param {*} valor 
 * @param {*} mes 
 * @param {*} año 
 * @returns 
 */


/**
 * 
 * @param {*} hora 
 * @returns 
 */
function validarHora(hora) {
    return hora >= 8 && hora <= 15;
}

/**
 * 
 * @param {*} minuto 
 * @returns 
 */
function validarMinuto(minuto) {
    return minuto >= 0 && minuto <= 59;
}   

/**
 * 
 */
const fechaSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        validate: {
            validator: validarYear,
            message: "El año debe ser mayor o igual al actual",
        },
    },
    mes: {
        type: Number,
        required: true,
        validate: {
            validator: validarMes,
            message: "El mes debe ser entre 1 y 12",
        },
    },
    dia: {
        type: Number,
        required: true,
        validate: {
          validator: validarDia,
          message: "El día debe ser entre 1 y 31",
        },
      },

    hora: {
        type: Number,
        required: true,
        validate: {
            validator: validarHora,
            message: "La hora debe ser entre 0 y 23",
        },
    },
    minuto: {
        type: Number,
        required: true,
        validate: {
            validator: validarMinuto,
            message: "El minuto debe ser entre 0 y 59",
        },
    },
});

const horaSchema = new mongoose.Schema({
    rut: {
        type: String,
        default: null,
    },
    fecha: {
        required: true,
        type: fechaSchema,
    },
    disponibilidad: {
        required: true,
        type: Boolean,
    },
    tipo: {
        required: true,
        type: String,
    },
});

const Hora = mongoose.model("Hora", horaSchema);
module.exports = Hora;
