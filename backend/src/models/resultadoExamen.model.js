const mongoose = require("mongoose"); 

const resultadoExamenSchema = mongoose.Schema({
    rut: {
        type: String,
        ref: "User", // Referencia al modelo de usuario
        unique: true, // Cada RUT en las licencias debe ser único
        require: true,
      },  
      fechaDocumento: { type: String },
      pdfDocumento: {
        data: Buffer, // Almacena el contenido del PDF
        contentType: String, // Tipo de contenido del archivo (por ejemplo, 'application/pdf')
    },
});


const ResExamen = mongoose.model("ResExamen", resultadoExamenSchema); 
module.exports = ResExamen; 
