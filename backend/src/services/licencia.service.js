/* eslint-disable no-console */
/* eslint-disable padded-blocks */
/* eslint-disable require-jsdoc */
const Licencia = require("../models/licencia.model.js"); // Importa el modelo de licencia
const { handleError } = require("../utils/errorHandler"); 
const User = require("../models/user.model.js");
 

require("dotenv").config(); 

const sgMail = require("@sendgrid/mail");  
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const multer = require("multer");
const storage = multer.memoryStorage(); // Almacena el archivo en memoria
const upload = multer({ storage: storage }); 
exports.upload = upload.single("pdfDocumento"); 
 

const emailUser = process.env.EMAIL_USER;

/**
 * Creates a new license and a corresponding application if it doesn't exist.
 * @param {Object} licenciaData - The data for the new license.
 * @returns {Array} An array containing the new license and an error message, if any.
 */
async function createLicencia(licenciaData) {
  try {
    const { rut, TipoLicencia, FechaRetiro, EstadoLicencia } = licenciaData;

    const LicenciaFound = await Licencia.findOne({ rut: licenciaData.rut });
    if (LicenciaFound) return [null, "La Licencia ya existe"];


    const newLicencia = new Licencia({
      rut,
      TipoLicencia,
      FechaRetiro,
      EstadoLicencia, 
  });
    await newLicencia.save();
    return [newLicencia, null];
  } catch (error) {
    handleError(error, "licencia.service -> createLicencia");
  }
}; 

// Crear licencia por rut 
async function createLicenciaPorRut(rut, licenciaData) {
  try {
    const { TipoLicencia, FechaRetiro, EstadoLicencia, pdfDocumento } = licenciaData;

    // Asegúrate de que el RUT sea válido y no esté duplicado

    const LicenciaFound = await Licencia.findOne({ rut: rut });
    if (LicenciaFound) {
      return [null, "La Licencia ya existe"];
    }

    const newLicencia = new Licencia({
      rut,
      TipoLicencia,
      FechaRetiro,
      EstadoLicencia,
      pdfDocumento: {
        data: pdfDocumento,
        contentType: "application/pdf", // Tipo de contenido para archivos PDF
      },
    });

    await newLicencia.save();
    return [newLicencia, null];
  } catch (error) {
    handleError(error, "licencia.service -> createLicenciaPorRut");
  }
}


/**
 * Retrieves all licenses from the database.
 * @returns {Array} An array containing all licenses and an error message, if any.
 */
async function getLicencias() {
  try {
    const licencias = await Licencia.find().lean().exec();

    if (!licencias) return [null, "No hay licencias disponibles"];

    // Iterar sobre las licencias y verificar que contengan el campo pdfDocumento
    licencias.forEach((licencia) => {
      if (licencia.pdfDocumento) {
        // Transformar el buffer del documento a base64 para que sea más amigable para la API
        licencia.pdfDocumento = licencia.pdfDocumento.toString("base64");
      }
    });
    return [licencias, null];
  } catch (error) {
    handleError(error, "licencia.service -> getLicencias");
  }
}

/**
 * Retrieves a license from the database by its rut.
 * @param {string} rut - The rut of the license to retrieve.
 * @returns {Array} An array containing the license and an error message, if any.
 */
async function getLicenciaByRut(rut) {
  try {
    // Busca la licencia por RUT
    const licencia = await Licencia.findOne({ rut: rut }).lean().exec();

    if (!licencia) return [null, "No hay licencias disponibles"];

    // Verifica que se haya encontrado la licencia y que contenga el campo pdfDocumento
    if (!licencia.pdfDocumento) return [null, "La licencia no contiene un documento PDF"];

    // Retorna tanto los datos del modelo de licencia como el buffer del documento
    return [licencia, licencia.pdfDocumento];
  } catch (error) {
    handleError(error, "licencia.service -> getLicenciaByRut");
  }
}  

/**
 * Updates a license in the database by its rut.
 * @param {string} rut - The rut of the license to update.
 * @param {Object} licencia - The updated data for the license.
 * @returns {Array} An array containing the updated license and an error message, if any.
 */
async function updateLicenciaByRut(rut, licencia) {
  try {
    const { TipoLicencia, FechaRetiro, EstadoLicencia, pdfDocumento } = licencia;

    const licenciaFound = await Licencia.findOne({ rut: rut });
    if (!licenciaFound) return [null, "La licencia no existe"];

    const updatedLicencia = await Licencia.findByIdAndUpdate(
      rut,
      {
        TipoLicencia: req.body.TipoLicencia || TipoLicencia,
        FechaRetiro: req.body.FechaRetiro || FechaRetiro,
        EstadoLicencia: req.body.EstadoLicencia || EstadoLicencia,
        pdfDocumento: req.body.pdfDocumento || pdfDocumento,
      },
      { new: true },
    );
    return [updatedLicencia, null];
  } catch (error) {
    handleError(error, "licencia.service -> updateLicenciaByRut");
  }
}; 


/**
 * Deletes a license from the database by its rut.
 * @param {string} rut - The rut of the license to delete.
 * @returns {Array} An array containing the deleted license and an error message, if any.
 */
async function deleteLicenciaByRut(rut) {
  try {
    const licenciaFound = await Licencia.findOne({ rut: rut });
    if (!licenciaFound) return [null, "La licencia no existe"];
    await Licencia.findByIdAndDelete(licenciaFound._id);
    return [licenciaFound, null];
  } catch (error) {
    handleError(error, "licencia.service -> deleteLicenciaByRut");
  }
};
 

// Función para enviar una licencia por correo electrónico 

async function enviarLicenciaPorRUT(rut) {
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
    const pdfDocumento = getLicenciaByRut(rut);   

    const { TipoLicencia, FechaRetiro, EstadoLicencia } = await Licencia.findOne({ rut });
    const html = `
      <p>Adjunto encontrarás tu licencia de conducir. Aquí están los detalles de tu licencia:</p>
      <ul>
        <li>Nombre: ${persona.nombre}</li>
        <li>RUT: ${persona.rut}</li>
        <li>Tipo de Licencia: ${TipoLicencia}</li>
        <li>Fecha de Retiro: ${FechaRetiro || "No asignada"}</li>
        <li>Estado de la Licencia: ${EstadoLicencia}</li>
        
      </ul>
    `;

    const subject = "Tu Licencia de Conducir";
    const text = "Aquí está tu licencia adjunta."; 
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
          filename: "Licencia.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(msg);

    return [persona, null];
    
    
  } catch (error) {
    handleError(error, "licencia.service -> enviarLicenciaPorRUT");
  }
}

module.exports = {
  createLicencia,
  getLicencias,
  getLicenciaByRut,
  updateLicenciaByRut,
  deleteLicenciaByRut,  
  enviarLicenciaPorRUT, 
  createLicenciaPorRut,
};

