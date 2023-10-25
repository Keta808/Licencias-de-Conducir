"use strict";

const ResExamen = require("../models/resultadoExamen.model.js"); 
const { handleError } = require("../utils/errorHandler");


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
        
        if (ResExamenData.rut != null) {
            const ResFound = await ResExamenData.findOne({ rut: ResExamenData.rut });
        
            if (ResFound) return [null, "Los resultados de examen ya existen"];
        }
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

/**
 * Retrieves all ResExamen documents from the database.
 * @returns {Promise<Array>} - A Promise that resolves to an array of ResExamen documents, or rejects with an error message.
 */
async function getResExamenes() { 
    try {
        const ResExamenes = await ResExamen.find().exec();
        if (!ResExamenes) return [null, "No hay resultados de examenes disponibles"];
        return [ResExamenes, null];
    } catch (error) {
        handleError(error, "ResExamen.service -> getResExamenes");
    }
};

/**
 * Retrieves a ResExamen document from the database by RUT.
 * @param {string} rut - The RUT of the user associated with the ResExamen document.
 * @returns {Promise<Array>} - A Promise that resolves to the ResExamen document, or rejects with an error message.
 */
async function getResExamenByRut(rut) {
    try {
        const ResExamen = await ResExamen.findOne({ rut: rut }); 
        if (!ResExamen) return [null, "No hay resultados de examenes disponibles"];
        return [ResExamen, null]; 
    } catch (error) {
        handleError(error, "ResExamen.service -> getResExamenByRut");
    }
};

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

module.exports = { 
    createResExamen, 
    getResExamenes,
    getResExamenByRut,
    updateResExamenByRut, 
    deleteResExamenByRut,
};

