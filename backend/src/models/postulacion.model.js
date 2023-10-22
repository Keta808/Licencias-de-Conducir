const { Schema, model } = require("mongoose");
// FALTA AGREGAR QUE TRAMITE DESEA REALIZAR
const PostulacionSchema = Schema({
    persona: userSchema,
    direccion: {
        type: String,
        required: true,
    },
    documentoPDF: {
        data: Buffer,
        contentType: String,
    },
    tramite: {
        type: String,
        required: true,
    },
}); 

const Postulacion = model("Postulacion", PostulacionSchema); 
exports.Postulacion = Postulacion;
