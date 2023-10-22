const mongoose = require("mongoose");

const licenciaSchema = mongoose.Schema({
    rut: {
        type: String,
        ref: "User", // Referencia al modelo de usuario
        unique: true, // Cada RUT en las licencias debe ser único
        require: true,
      },
    numeroLicencia: { type: String, unique: true },
    FechaRetiro: { type: Date },
    EstadoLicencia: { type: String, enum: ["Activa", "Retirada", "En Tramite"] },
    pdfDocumento: {
        data: Buffer, // Almacena el contenido del PDF
        contentType: String, // Tipo de contenido del archivo (por ejemplo, 'application/pdf')
    },
});

const Licencia = mongoose.model("Licencia", licenciaSchema); 
module.exports = Licencia; 
