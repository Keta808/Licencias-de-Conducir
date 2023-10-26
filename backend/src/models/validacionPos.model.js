"use strict";
const mongoose = require("mongoose");

// const { Schema, model } = require("mongoose");

const ValidacionPosSchema = new mongoose.Schema({
    rut: {
        type: String, // hay que hacer que se vincule con el rut de la persona que postulo
        required: true,
    },
    estado: {
        type: Boolean, // true=aprobado, false=rechazado
        required: true,
    },
});

const ValidacionPos = mongoose.model("ValidacionPos", ValidacionPosSchema);
// exports.ValidacionPos = ValidacionPos;
module.exports = ValidacionPos;
