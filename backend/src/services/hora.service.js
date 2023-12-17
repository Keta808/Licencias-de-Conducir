/* eslint-disable space-before-blocks */
/* eslint-disable require-jsdoc */
"use strict";

const validacionPostulacion = require("../models/validacionPos.model.js");
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
    console.log("digito calculado y verificador");
    console.log(digitoCalculado, digitoVerificador);
    return digitoCalculado.toString() === digitoVerificador;
}

function validarRut(rut) {
    // Expresión regular para validar RUT chileno en varios formatos
    const patron = /^(\d{1,3}\.\d{1,3}\.\d{1,3}|\d{1,9})-[\dkK]$/;



    // Eliminar puntos y guiones adicionales para tener un formato consistente
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');

    // Verificar si el RUT coincide con el patrón
    console.log(rutLimpio);
    console.log("patron test");
    console.log(patron.test(rutLimpio));
    return patron.test(rut) && validarRutDigitoVerificador(rutLimpio);
}

async function createHora(hora) {
    try {
        const { rut, fecha, disponibilidad, tipo } = hora;

        if(hora.rut != null){
            const horaFound = await Hora.findOne({ rut: hora.rut });
            if (horaFound) return [null, "La hora ya existe"];
        }

        if(rut != null){
            if(validarRut(rut) == false) return [null, "El rut no es valido"];
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

async function getHorasDisponibles(rut) {
    try {

        //si está aprobado:
        const validacionFound = await validacionPostulacion.findOne({ rut: rut });
        if(!validacionFound) return [null, "El usuario no está aprobado"];
        if(!validacionFound.estado) return [null, "El usuario no está aprobado"];
        //if(validarRut(rut) == false) return [null, "El rut no es valido"];

        const horas = await Hora.find({ rut: null});      
        if(!horas) return [null, "No hay horas disponibles"];
        
        return [horas, null];
    } catch (error) {
        handleError(error, "hora.service -> getHoras");
    }
}


/**
 * Funcion para asignar una hora a un usuario mediante el rut de la sesion
 */

async function elegirHora(id, rut){
    try {

        const horaFound = await Hora.findById(id);

        //si está aprobado:
        const validacionFound = await validacionPostulacion.findOne({ rut: rut });
        if(!validacionFound.estado) return [null, "El usuario no está aprobado"];
        
        if (!horaFound) return [null, "La hora no existe"];
        if(horaFound.rut != null) return [null, "La hora ya esta asignada a un usuario" ];
        if(horaFound.disponibilidad == false) return [null, "La hora no esta disponible"];
        

    await Hora.findByIdAndUpdate(id, { rut: rut ,disponibilidad: false}, {new: true}).exec();
  
    const horaUpdated={
        id:horaFound._id,
        rut:rut,
        fecha:horaFound.fecha,
        disponibilidad:false,
        tipo:horaFound.tipo

    }
    
    return [horaUpdated, null];
    } catch (error) {
        handleError(error, "hora.service -> elegirHora");
    }
}


/**
* Exporta las funciones del servicio 
*/

module.exports = {
    getHoras,
    createHora, 
    getHorabyId,
    updateHora,
    getHorasDisponibles,
    elegirHora,
    deleteHora
};



