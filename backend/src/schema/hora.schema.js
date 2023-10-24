"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de hora.
 * @constant {Object}
 */

const horaBodySchema = Joi.object({
    rut: Joi.string().messages({
        "string.empty": "El rut no puede estar vacío.",
        "string.base": "El rut debe ser de tipo string.",
    }),
    fecha: Joi.required().messages({
        "fecha.empty": "La fecha no puede estar vacía.",
        "any.required": "La fecha es obligatoria.",
    }),
    disponibilidad: Joi.boolean().required().messages({
        "boleean.empty": "La disponibilidad no puede estar vacía.",
        "any.required": "La disponibilidad es obligatoria.",
    }),
    tipo: Joi.string().required().messages({
        "string.empty": "El tipo no puede estar vacío.",
        "any.required": "El tipo es obligatorio.",
        "string.base": "El tipo debe ser de tipo string.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    });

/**
 * Esquema de validación para el id de hora.
 * @constant {Object}
 */
const horaIdSchema = Joi.object({
    id: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El id no puede estar vacío.",
            "any.required": "El id es obligatorio.",
            "string.base": "El id debe ser de tipo string.",
            "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
        }),
});

module.exports = { horaBodySchema, horaIdSchema };
