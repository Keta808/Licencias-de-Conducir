"use strict";

const { Schema, model } = require("mongoose");

const ValidacionPosSchema = Schema({
    postulacion: [
        {
            type: Schema.Types.ObjectId,
            ref: "Postulacion",
        },
    ],
    estado: {
        type: Boolean, // true=aprobado, false=rechazado
        required: true,
    },
});

const ValidacionPos = model("ValidacionPos", ValidacionPosSchema);
exports.ValidacionPos = ValidacionPos;
