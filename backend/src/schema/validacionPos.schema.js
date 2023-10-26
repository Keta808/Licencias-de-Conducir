"use strict";

const Joi = require("joi");

/** esquema de la validacion */
const validacionPosBodySchema = Joi.object({
    rut: Joi.string().required().messages({
        "string.empty": "El rut no puede estar vacío.",
        "any.required": "El rut es obligatorio.",
    }),

    estado: Joi.string().required().messages({
        "string.empty": "El estado no puede estar vacío.",
        "any.required": "El estado es obligatorio.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const validacionPosIdSchema = Joi.object({
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

module.exports = { validacionPosBodySchema, validacionPosIdSchema };
