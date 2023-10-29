"use strict";
const mongoose = require("mongoose");  


function validarYear(year) {
    let fecha = new Date();
    let yearActual = fecha.getFullYear();
    return year >= yearActual;
}


function validarMes(mes) {
    let fecha = new Date();
    let mesActual = fecha.getMonth() + 1;
    return mes >= 1 && mes <= 12 && mes >= mesActual;
}

function validarDia(dia) {
    let fecha = new Date();
    return dia >= 1 && dia <= 31 && dia >= fecha.getDate();
}


function validarHora(hora) {
    return hora >= 8 && hora <= 15;
}

function validarMinuto(minuto) {
    return minuto >= 0 && minuto <= 59;
}   

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
          message: "El día debe ser entre 1 y 31 y mayor o igual que el actual",
        },
      },

    hora: {
        type: Number,
        required: true,
        validate: {
            validator: validarHora,
            message: "La hora debe ser entre 8 y 15",
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
