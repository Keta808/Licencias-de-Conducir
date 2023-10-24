"use strict";

const { Schema, model } = require("mongoose");
// FALTA AGREGAR QUE TRAMITE DESEA REALIZAR
const PostulacionSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },  
    rut: {
        type: String,
        required: true,
       
    },
    direccion: {
        type: String,
        required: true,
    },
    tramite: {
        type: String,
        required: true,
    },
}); 

const Postulacion = model("Postulacion", PostulacionSchema); 
module.exports = Postulacion;
