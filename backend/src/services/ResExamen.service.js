/* eslint-disable require-jsdoc */
"use strict";

const ResExamen = require("../models/resultadoExamen.model.js"); 
const { handleError } = require("../utils/errorHandler");
const nodemailer = require("nodemailer"); 
require("dotenv").config();

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
            pdfDocumento: pdfDocumento,
        }); 
        await newResExamen.save();
        return [newResExamen, null];
    } catch (error) {
        handleError(error, "ResExamen.service -> createResExamen");
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

async function enviarResExamenPorCorreo(rut, pdfDocumento) { 
 try {
    // 1. Buscar la persona por RUT
 const persona = await User.findOne({ rut });

 if (!persona) {
   return [null, "No se encontró una persona con este RUT"];
 }

 // 2. Verificar que la persona tenga una dirección de correo electrónico
 if (!persona.email) {
   return [null, "La persona no tiene una dirección de correo electrónico registrada"];
 }

 // 3. Configurar el transporte de correo (usando las credenciales centralizadas o de la aplicación)
 const transporter = nodemailer.createTransport({
   service: process.env.EMAIL_SERVICE, // Cargar desde variables de entorno
   auth: {
     user: process.env.EMAIL_USER, // Cargar desde variables de entorno
     pass: process.env.EMAIL_PASSWORD, // Cargar desde variables de entorno
   },
 }); 
 const mailOptions = {
    from: process.env.EMAIL_USER, // Correo de la aplicación
    to: persona.email, // Correo de la persona
    subject: "Tus resultados de examen",
    text: "Aquí están tus resultados de los examenes:",
    attachments: [
      {
        filename: "ResultadosExamenes.pdf",
        content: pdfDocumento, // Contenido del archivo PDF de la licencia
      },
    ],
  }; 

  await transporter.sendMail(mailOptions);
    return [persona, null];
  } catch (error) {
    handleError(error, "ResExamen.service -> enviarResExamenPorCorreo");
  }
};    

async function enviarExamenPorRUT(rut) {
  try {
    // 1. Buscar la persona por RUT
    const persona = await User.findOne({ rut });

    if (!persona) {
      return [null, "No se encontró una persona con este RUT"];
    }

    // 2. Verificar que la persona tenga una dirección de correo electrónico
    if (!persona.email) {
      return [null, "La persona no tiene una dirección de correo electrónico registrada"];
    }

    // 3. Obtener el PDF de la licencia desde la base de datos (debes implementar esta parte)
    const pdfDocumento = await getResExamenByRut(rut);

    // 4. Configurar el transporte de correo (usando las credenciales centralizadas o de la aplicación)
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // Cargar desde variables de entorno
      auth: {
        user: process.env.EMAIL_USER, // Cargar desde variables de entorno
        pass: process.env.EMAIL_PASSWORD, // Cargar desde variables de entorno
      },
    });

    // 5. Preparar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER, // Correo de la aplicación
      to: persona.email, // Correo de la persona
      subject: "Tus resultados de examen",
      text: "Aquí están tus resultados de los examenes:",
      attachments: [
        {
          filename: "ResultadosExamenes.pdf",
          content: pdfDocumento, // Contenido del archivo PDF de la licencia
        },
      ],
    }; 
  
    await transporter.sendMail(mailOptions);
      return [persona, null];
    } catch (error) {
      handleError(error, "ResExamen.service -> enviarResExamenPorCorreo");
    }
}
// Funcion enviar 
module.exports = { 
    createResExamen, 
    getResExamenes,
    getResExamenByRut,
    updateResExamenByRut, 
    deleteResExamenByRut, 
    enviarResExamenPorCorreo,
    enviarExamenPorRUT,
};

