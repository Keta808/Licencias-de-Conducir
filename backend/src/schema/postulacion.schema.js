"use strict";
const Joi = require("joi");
/**
 * 
 * Esquema de la postulacion
 * 
 */

const postulacionBodySchema = Joi.object({

    nombre: Joi.string().required().messages({ 
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
    }),
    rut: Joi.string().required().messages({
        "string.empty": "El rut no puede estar vacío.",
        "any.required": "El rut es obligatorio.",
    }),
    edad: Joi.string().required().messages({
        "string.empty": "La edad no puede estar vacía.",
        "any.required": "La edad es obligatoria.",
    }),

    direccion: Joi.string().required().messages({
        "string.empty": "La direccion no puede estar vacía.",
        "any.required": "La direccion es obligatoria.",
    }),
    
    tramite: Joi.string().required().messages({
        "string.empty": "El tramite no puede estar vacía.",
        "any.required": "El tramite es obligatoria.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
}); 

const postulacionIdSchema = Joi.object({
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

module.exports = { postulacionBodySchema, postulacionIdSchema };


