"use strict"; 

const Joi = require("joi"); 

const licenciaBodySchema = Joi.object({
    rut: Joi.string().messages({
        "string.empty": "El rut no puede estar vacío.",
        "string.base": "El rut debe ser de tipo string.",
    }),
    TipoLicencia: Joi.string().messages({
        "string.empty": "El tipo no puede estar vacío.",
        "any.required": "El tipo es obligatorio.",
        "string.base": "El tipo debe ser de tipo string.",
    }),
    fechaRetiro: Joi.date().messages({
        "date.empty": "La fecha de Retiro no puede estar vacía.",
        "any.required": "La fecha de Retiro es obligatoria.",
        "date.base": "La fecha de Retiro debe ser de tipo date.",
    }),
    EstadoLicencia: Joi.string().messages({
        "string.empty": "El estado no puede estar vacío.",
        "any.required": "El estado es obligatorio.",
        "string.base": "El estado debe ser de tipo string.",
    }),
    pdfDocumento: Joi.object().messages({
        "object.empty": "El documento no puede estar vacío.",
        "any.required": "El documento es obligatorio.",
        "object.base": "El documento debe ser de tipo object.",
    }),
    }).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const licenciaIdSchema = Joi.object({
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

module.exports = { licenciaBodySchema, licenciaIdSchema }; 
