/* eslint-disable max-len */
"use strict"; 

const express = require("express");

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


router.post("/AgregarResExamen", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.createResExamen); // Crea un nuevo resultado de examen 
router.get("/ResExamenes", ResExamenController.getResExamen); // Obtiene todos los resultados de examen 
router.get("/Buscar-ResExamen/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.getResExamenByRut); // Obtiene un resultado de examen por su id de resultado de examen 
router.put("/Actualizar/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.updateResExamenByRut); 
router.delete("/Eliminar/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, ResExamenController.deleteResExamenByRut);

// authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
