"use strict";

const { Schema, model } = require("mongoose");

const ValidacionPosSchema = Schema({
    rut: {
        type: String, // hay que hacer que se vincule con el rut de la persona que postulo
        required: true,
    },
    estado: {
        type: Boolean, // true=aprobado, false=rechazado
        required: true,
    },
});

const ValidacionPos = model("ValidacionPos", ValidacionPosSchema);
exports.ValidacionPos = ValidacionPos;
