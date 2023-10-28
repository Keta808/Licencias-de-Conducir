/* eslint-disable padded-blocks */
/* eslint-disable require-jsdoc */
"use strict";

const ResExamen = require("../models/resultadoExamen.model.js"); 
const { handleError } = require("../utils/errorHandler");

require("dotenv").config(); 
const User = require("../models/user.model.js");  

const sgMail = require("@sendgrid/mail");  
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const multer = require("multer");
const storage = multer.memoryStorage(); // Almacena el archivo en memoria
const upload = multer({ storage: storage }); 
exports.upload = upload.single("pdfDocumento"); 
 

const emailUser = process.env.EMAIL_USER;


/**
 * Creates a new ResExamen document in the database.
 * @param {Object} ResExamenData - The data for the new ResExamen document.
 * @param {string} ResExamenData.rut - The RUT of the user associated with the ResExamen document.
 * @param {Date} ResExamenData.fechaDocumento - The date of the ResExamen document.
 * @param {string} ResExamenData.pdfDocumento - The PDF document of the ResExamen document.
 * @returns {Promise<Array>} - A Promise that resolves to the new ResExamen document and a success message, or rejects with an error message.
 */
async function createResExamen(ResExamenData) {
    try {  
        const { rut, fechaDocumento, pdfDocumento } = ResExamenData; 
        
        const examenFound = await ResExamen.findOne({ rut: rut }); 
        if (examenFound) return [null, "El resultado de examen ya existe"];
        
        const newResExamen = new ResExamen({
            rut,
            fechaDocumento,
            pdfDocumento,
        }); 
        await newResExamen.save();
        return [newResExamen, null];
    } catch (error) {
        handleError(error, "ResExamen.service -> createResExamen");
    }
};

async function createResExamenPorRut(rut, ResExamenData) {
 try { 
   const { fechaDocumento, pdfDocumento } = ResExamenData; 
   const ResExamenFound = await ResExamen.findOne({ rut: rut }); 
   if (ResExamenFound) return [null, "El resultado de examen ya existe"]; 
    const newResExamen = new ResExamen({
        rut,
        fechaDocumento,
        pdfDocumento: {
            data: pdfDocumento,
            contentType: "application/pdf", // Tipo de contenido para archivos PDF
        },
    });
    await newResExamen.save(); 
    return [newResExamen, null];

 } catch (error) {
    handleError(error, "ResExamen.service -> createResExamenPorRut");
  }

};

/**
 * Retrieves all ResExamen documents from the database.
 * @returns {Promise<Array>} - A Promise that resolves to an array of ResExamen documents, or rejects with an error message.
 */
async function getResExamenes() {
  try {
    const resExamenes = await ResExamen.find().lean().exec();

    if (!resExamenes) return [null, "No hay resultados de exámenes disponibles"];

    // Iterar sobre los resultados de exámenes y verificar si contienen el campo pdfDocumento
    resExamenes.forEach((resExamen) => {
      if (resExamen.pdfDocumento) {
        // Transformar el buffer del documento a base64 para que sea más amigable para la API
        resExamen.pdfDocumento = resExamen.pdfDocumento.toString("base64");
      }
    });

    return [resExamenes, null];
  } catch (error) {
    handleError(error, "ResExamen.service -> getResExamenes");
  }
}

/**
 * Retrieves a ResExamen document from the database by RUT.
 * @param {string} rut - The RUT of the user associated with the ResExamen document.
 * @returns {Promise<Array>} - A Promise that resolves to the ResExamen document, or rejects with an error message.
 */
async function getResExamenByRut(rut) {
  try {
    const resExamen = await ResExamen.findOne({ rut: rut }).lean().exec();

    if (!resExamen) return [null, "No hay resultados de exámenes disponibles para este RUT"];
    if (!resExamen.pdfDocumento) return [null, "El examen no contiene un documento PDF"];


    return [resExamen, resExamen.pdfDocumento];
  } catch (error) {
    handleError(error, "ResExamen.service -> getResExamenByRut");
  }
}

/**
 * Updates a ResExamen document in the database by RUT.
 * @param {string} rut - The RUT of the user associated with the ResExamen document.
 * @param {Object} ResExamenData - The updated data for the ResExamen document.
 * @param {Date} ResExamenData.fechaDocumento - The updated date of the ResExamen document.
 * @param {string} ResExamenData.pdfDocumento - The updated PDF document of the ResExamen document.
 * @returns {Promise<Array>} - A Promise that resolves to the updated ResExamen document and a success message, or rejects with an error message.
 */
async function updateResExamenByRut(rut, ResExamenData) { 
 try { 
    const ResExamenFound = await ResExamen.findOne({ rut: rut }); 
    if (!ResExamenFound) return [null, "No hay resultados de examenes disponibles para ese rut"]; 
    
    
    const { fechaDocumento, pdfDocumento } = ResExamenData;  

    const updatedResExamen = await ResExamen.findByIdAndUpdate(
        rut,
        {
            fechaDocumento: req.body.fechaDocumento || fechaDocumento,
            pdfDocumento: req.body.pdfDocumento || pdfDocumento,
        },
        { new: true },
    );  
  return [updatedResExamen, null];
 } catch (error) {
    handleError(error, "ResExamen.service -> updateResExamenByRut");
 };
}; 


/**
 * Deletes a ResExamen document from the database by RUT.
 * @param {string} rut - The RUT of the user associated with the ResExamen document to be deleted.
 * @returns {Promise<Array>} - A Promise that resolves to the deleted ResExamen document and a success message, or rejects with an error message.
 */
async function deleteResExamenByRut(rut) {
    try {
        const ResExamenFound = await ResExamen.findOne({ rut: rut });
        if (!ResExamenFound) {
            return [null, "No hay resultados de examenes para ese rut"];
        }

        const ResExamenDeleted = await ResExamen.findOneAndDelete({ rut: rut }).exec();

        return [ResExamenDeleted, null];
    } catch (error) {
        handleError(error, "ResExamen.service -> deleteResExamenByRut");
    }
};
  

async function enviarExamenPorRUT(rut) {
  try {
    // 1. Buscar la persona por RUT
    const persona = await User.findOne({ rut }); 
    const email = persona.email;  
    
    if (!persona) {
      return [null, "No se encontró una persona con este RUT"];
    }
    
    // 2. Verificar que la persona tenga una dirección de correo electrónico
    if (!persona.email) {
      return [null, "La persona no tiene una dirección de correo electrónico registrada"];
    } 
    

    // 3. Obtener el PDF de la licencia desde la base de datos (debes implementar esta parte)
    const pdfDocumento = getResExamenByRut(rut); 
    const { fechaDocumento, estadoExamen } = await ResExamen.findOne({ rut: rut }); 
    const html = `  
    <p>Adjunto encontrarás tus resultados de Examen. Aquí están los detalles:</p>
      <ul>
        <li>Nombre: ${persona.nombre}</li>
        <li>RUT: ${persona.rut}</li>
        <li>Fecha del Documento: ${fechaDocumento}</li> 
        <li>Estado de Examenes: ${estadoExamen}</li>
      </ul>
    `;

    const subject = "Resultados de examen de Conducir";
    const text = "Aquí estan tus Resultados de Examenes Adjunto."; 
    // 5. Enviar el correo
    const msg = {
      to: email,
      from: emailUser, // Tu dirección de correo
      subject,
      text,
      html,
      attachments: [
        {
          content: pdfDocumento.toString("base64"), // Contenido del archivo PDF de la licencia
          filename: "ResultadosExamenes.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(msg);

    return [persona, null];
    
    
  } catch (error) {
    handleError(error, "ResExamen.service -> enviarExamenPorRUT");
  }
}
// Funcion enviar 
module.exports = { 
    createResExamen, 
    getResExamenes,
    getResExamenByRut,
    updateResExamenByRut, 
    deleteResExamenByRut, 
    enviarExamenPorRUT, 
    createResExamenPorRut, 
};

