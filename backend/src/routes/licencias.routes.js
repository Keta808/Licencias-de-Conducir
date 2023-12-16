/* eslint-disable padded-blocks */
/* eslint-disable max-len */
"use strict"; 
const express = require("express"); 
const multer = require("multer"); 
const path = require("path");

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

// Configuración de Multer
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

// Define las rutas para los usuarios /api/usuarios 

router.get("/Licencias", LicenciasController.getLicencias); // Obtiene todas las licencias 

router.get("/Buscar-Licencia/:rut", LicenciasController.getLicenciaByRut, authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario); // Obtiene una licencia por su rut


router.put("/ActualizaPorRut/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
           LicenciasController.updateLicenciaByRut); // Actualiza una licencia por su rut
module.exports = router;  

router.delete("/EliminarPorRut/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
              LicenciasController.deleteLicenciaByRut); 
                  
router.get("/EnviarLicenciaRut/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, LicenciasController.enviarLicenciaPorRUT);    

router.post("/crearLicenciaPorRut/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, upload.single("pdfDocumento"), LicenciasController.createLicenciaPorRut); 

module.exports = router; 
