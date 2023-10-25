"use strict";  

const Joi = require("joi");  

const ResExamenBodySchema = Joi.object({
    rut: Joi.string().messages({
        "string.empty": "El rut no puede estar vacío.",
        "string.base": "El rut debe ser de tipo string.",
    }),
    fecha: Joi.date().messages({
        "date.empty": "La fecha no puede estar vacía.",
        "any.required": "La fecha es obligatoria.",
        "date.base": "La fecha debe ser de tipo date.",
    }),
    tipo: Joi.string().messages({
        "string.empty": "El tipo no puede estar vacío.",
        "any.required": "El tipo es obligatorio.",
        "string.base": "El tipo debe ser de tipo string.",
    }),
    resultado: Joi.string().messages({
        "string.empty": "El resultado no puede estar vacío.",
        "any.required": "El resultado es obligatorio.",
        "string.base": "El resultado debe ser de tipo string.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
}); 

const ResExamenIdSchema = Joi.object({
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

module.exports = { ResExamenBodySchema, ResExamenIdSchema }; 
