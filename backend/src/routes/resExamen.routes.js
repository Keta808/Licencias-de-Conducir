/* eslint-disable max-len */
"use strict"; 

const express = require("express");

/** Controlador de usuarios */
const ResExamenController = require("../controllers/resultadoExamen.controller.js");
const ResExamenServices = require("../services/ResExamen.service.js");
/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware); 
const multer = require("multer"); 
const storage = multer.memoryStorage(); // Almacenar el archivo en memoria
const upload = multer({ storage: storage });

router.post("/AgregarResExamen", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.createResExamen); // Crea un nuevo resultado de examen 
router.get("/ResExamenes", ResExamenController.getResExamen); // Obtiene todos los resultados de examen 
router.get("/Buscar-ResExamen/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.getResExamenByRut); // Obtiene un resultado de examen por su id de resultado de examen 
router.put("/Actualizar/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.updateResExamenByRut); 
router.delete("/Eliminar/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.deleteResExamenByRut); 
router.post("/Enviar-ResExamen/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.enviarExamenPorRUT);

// authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
router.post("/resultados-examen", authorizationMiddleware.isAdmin, upload.single("pdfDocumento"), async (req, res) => {
    try {
        // Extraer los datos de la solicitud
        const { rut, fechaDocumento } = req.body;
        const pdfDocumento = req.file.buffer; // El archivo PDF en formato Buffer

        // Crear un objeto con los datos
        const resultadoExamenData = {
            rut,
            fechaDocumento,
            pdfDocumento,
        };

        const [newResExamen, resExamenError] = await ResExamenServices.createResExamen(resultadoExamenData);
        if (resExamenError) {
            return respondError(req, res, 400, resExamenError);
        }
        if (!newResExamen) {
            return respondError(req, res, 400, "No se creó el resultado de examen");
        }
        respondSuccess(req, res, 201, newResExamen);
    } catch (error) {
        handleError(error, "resultadoExamen.controller -> recibirResultadosExamen");
        respondError(req, res, 500, "No se creó el resultado de examen");
    }
}); 

module.exports = router; 
