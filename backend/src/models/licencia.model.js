/* eslint-disable max-len */
const mongoose = require("mongoose");

const licenciaSchema = mongoose.Schema({
    rut: {
        type: String,
        ref: "User", // Referencia al modelo de usuario
        unique: true, // Cada RUT en las licencias debe ser único
        required: true,
      },
    TipoLicencia: { type: String, unique: false, enum: ["A1", "A2", "A3", "A4", "A5", "B", "C", "D", "E", "F", "G", "H"], default: "B" },
    FechaRetiro: { type: String, default: null },
    EstadoLicencia: { type: String, enum: ["Retirada", "En Tramite", "Retirable"], default: "En Tramite" },
    pdfDocumento: {
        data: Buffer || null, // Almacena el contenido del PDF
        contentType: String || null, // Tipo de contenido del archivo (por ejemplo, 'application/pdf')
    },
});

const Licencia = mongoose.model("Licencia", licenciaSchema); 
module.exports = Licencia; 

