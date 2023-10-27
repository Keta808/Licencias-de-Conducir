/* eslint-disable max-len */
"use strict"; 

const express = require("express");
const multer = require("multer");
const path = require("path");
/** Controlador de usuarios */
const ResExamenController = require("../controllers/resultadoExamen.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ruta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now() + extension);
    },
  });
  const upload = multer({ storage: storage });

router.post("/AgregarResExamen", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.createResExamen); // Crea un nuevo resultado de examen 
router.get("/ResExamenes", ResExamenController.getResExamenes); // Obtiene todos los resultados de examen 
router.get("/Buscar-ResExamen/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.getResExamenByRut); // Obtiene un resultado de examen por su id de resultado de examen 
router.put("/Actualizar/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.updateResExamenByRut); 
router.delete("/Eliminar/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.deleteResExamenByRut); 

router.get("/EnviarResExamen/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.enviarExamenPorRUT);

// authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
router.post("/resultados-examen/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, upload.single("pdfDocumento"), ResExamenController.createResExamenPorRut); 

module.exports = router; 
