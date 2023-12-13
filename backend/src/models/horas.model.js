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
    let mesActual = fecha.getMonth() + 1;
    let mesDelCampo = this.mes;  // Acceder al valor del campo 'mes' en el contexto de la instancia

    if (mesDelCampo === mesActual) {
        return dia >= 1 && dia <= 31 && dia >= fecha.getDate();
    } else {
        return dia >= 1 && dia <= 31;
    }
}


function validarHora(hora) {
    return hora >= 8 && hora <= 15;
}

function validarMinuto(minuto) {
    return minuto >= 0 && minuto <= 59;
}   

function validarTipo(tipo){
    tipo = tipo.toLowerCase();
    return tipo === "teorico" || tipo === "practico" || tipo === "práctico" ;
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

function validarRutDigitoVerificador(rut) {
    const numeros = rut.slice(0, -1);
    const digitoVerificador = rut.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = numeros.length - 1; i >= 0; i--) {
        suma += parseInt(numeros.charAt(i)) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resultado = 11 - (suma % 11);
    const digitoCalculado = resultado === 11 ? 0 : resultado;
    console.log("hago algo");
    return digitoCalculado.toString() === digitoVerificador;
}

function validarRut(rut) {
    // Expresión regular para validar RUT chileno en varios formatos
    const patron = /^\d{1,3}(\.\d{3})*-[\dkK]$/;

    // Eliminar puntos y guiones adicionales para tener un formato consistente
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');

    // Verificar si el RUT coincide con el patrón
    console.log("hago algo");
    return patron.test(rutLimpio) && validarRutDigitoVerificador(rutLimpio);
}


const horaSchema = new mongoose.Schema({
    rut: {
        type: String,
        default: null,
        validator: {
            validator: validarRut,
            message: "El rut no es valido",
        },
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
        validate: {
            validator: validarTipo,
            message: "El tipo debe ser teorico o practico",
        },
    },
});

const Hora = mongoose.model("Hora", horaSchema);
module.exports = Hora;
