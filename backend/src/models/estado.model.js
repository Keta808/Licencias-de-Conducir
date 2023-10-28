"use strict";
const mongoose = require("mongoose");
const ESTADO = require("../constants/validacionPos.constants");

// crea el esquema de la coleccion "estados"
const estadoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      enum: ESTADO,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

// crea el modelo de datos "Estado" a partir del esquema "estadoSchema"
const Estado = mongoose.model("Estado", estadoSchema);
module.exports = Estado;
