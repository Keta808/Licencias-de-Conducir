"use strict";

const { Schema, model } = require("mongoose");
const validTramites = ["obtener licencia", "renovar licencia"];

const PostulacionSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },  
    rut: {
        type: String,
        required: true,
       
    },
    edad: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v >= 18;
            },
            message: "La edad debe ser mayor o igual a 18",
        },
    },
    direccion: {
        type: String,
        required: true,
    },
    tramite: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return validTramites.includes(v);
            },
            message: "el tramite debe ser obtener licencia o renovar licencia",
        },
    },
}); 

const Postulacion = model("Postulacion", PostulacionSchema); 
module.exports = Postulacion;
