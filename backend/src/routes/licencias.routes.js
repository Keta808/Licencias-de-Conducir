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

const multer = require("multer");
const storage = multer.memoryStorage(); // Almacena el archivo en memoria
const upload = multer({ storage: storage });

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

router.delete("/EliminarPorRut/:rut", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, 
              deleteLicenciaByRut); 

router.post("/Enviar-Licencia/", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, LicenciasController.enviarLicenciaPorCorreo);    
router.post("/Enviar-Licencia-RUT/", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, LicenciasController.enviarLicenciaPorCorreo);    

router.post("/crearLicencia", authorizationMiddleware.isAdmin, authorizationMiddleware.isFuncionario, upload.single("pdfDocumento"), async (req, res) => {
  try {
    // Extraer otros datos del cuerpo de la solicitud
    const { rut, TipoLicencia, FechaRetiro, EstadoLicencia } = req.body;
    
    const pdfDocumento = req.file.buffer;

    const licenciaData = {
      rut,
      TipoLicencia,
      FechaRetiro,
      EstadoLicencia,
      pdfDocumento,
    };

    const [newLicencia, errorLicencia] = await LicenciasServices.createLicencia(licenciaData);

    if (errorLicencia) {
      return respondError(req, res, 400, errorLicencia);
    }

    if (!newLicencia) {
      return respondError(req, res, 400, "No se creó la licencia");
    }

    respondSuccess(req, res, 201, newLicencia);
  } catch (error) {
    handleError(error, "licencia.controller -> createLicencia");
    respondError(req, res, 500, "No se creó la licencia");
  }
});

module.exports = router; 
