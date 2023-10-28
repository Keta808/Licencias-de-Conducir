"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

const postulacionRoutes = require("./postulacion.routes.js");
const validacionPosRoutes = require("./validacionPos.routes.js"); 

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Enrutador de horas */
const horaRoutes = require("./hora.routes.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth

router.use("/auth", authRoutes);
// define la ruta para horas
router.use("/horas", authenticationMiddleware, horaRoutes);

router.use("/auth", authRoutes); 


// Define rutas opara las licencias 

// router.use("/licencias", authenticationMiddleware, licenciasRoutes); 
// Define rutas para los resultados de examen 
// router.use("/resExamen", authenticationMiddleware, resExamenRoutes);

// router.use("/licencias", authenticationMiddleware, licenciasRoutes); 


// Define rutas para las postulaciones
router.use("/postulacion", postulacionRoutes);
router.use("/validacionPos", authenticationMiddleware, validacionPosRoutes);


// define ruta para subir archivos
// const uploadRoutes = require("./upload.routes.js");
// router.use("/upload", uploadRoutes);

// Exporta el enrutador
module.exports = router;
