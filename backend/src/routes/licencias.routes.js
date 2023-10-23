"use strict"; 

const express = require("express");

/** Controlador de usuarios */
const LicenciasController = require("../controllers/licencia.controller.js");

/** Middlewares de autorización */
// const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
// const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
// router.use(authenticationMiddleware); 

// Define las rutas para los usuarios /api/usuarios 
router.post("/AgregarLicencia", LicenciasController.createLicencia); // Crea una nueva licencia 
router.get("/Licencias", LicenciasController.getLicencia); // Obtiene todas las licencias 
router.get("/:numeroLicencia", LicenciasController.getLicenciaById);
router.get("/:rut", LicenciasController.getLicenciaByRut); 

// router.put("/:numeroLicencia", authorizationMiddleware.isAdmin, updateLicenciaById); // Actualiza una licencia por su id de licencia
// router.delete("/:numeroLicencia", authorizationMiddleware.isAdmin, deleteLicenciaById); // Elimina una licencia por su id de licencia
module.exports = router; 
