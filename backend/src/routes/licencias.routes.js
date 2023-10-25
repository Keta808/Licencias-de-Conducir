/* eslint-disable max-len */
"use strict"; 

const express = require("express");

/** Controlador de usuarios */
const LicenciasController = require("../controllers/licencia.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware); 

// Define las rutas para los usuarios /api/usuarios 
router.post("/AgregarLicencia", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, LicenciasController.createLicencia); // Crea una nueva licencia 
router.get("/Licencias", LicenciasController.getLicencia); // Obtiene todas las licencias 
router.get("/Buscar-Licencia/:numeroLicencia", LicenciasController.getLicenciaById);
router.get("/Buscar-Licencia/:rut", LicenciasController.getLicenciaByRut); 
// router para enviar por correo la licencia 
// router.post("/Enviar-Licencia/:numeroLicencia", LicenciasController.sendLicenciaById);


// router.put("/Actualizar/:numeroLicencia", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
          // updateLicenciaById); // Actualiza una licencia por su id de licencia
// router.delete("/Eliminar/:numeroLicencia", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
  //            deleteLicenciaById); // Elimina una licencia por su id de licencia 

router.put("/ActualizaPorRut/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
           LicenciasController.updateLicenciaByRut); // Actualiza una licencia por su rut
module.exports = router;  

router.delete("/EliminarPorRut/:numeroLicencia", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
              deleteLicenciaByRut); 

module.exports = router; 
