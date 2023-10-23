"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

const postulacionRoutes = require("./postulacion.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/**Enrutador de horas */
const horaRoutes = require("./hora.routes.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
<<<<<<< HEAD
router.use("/auth", authRoutes);
//define la ruta para horas
router.use("/horas", authenticationMiddleware, horaRoutes);
=======
router.use("/auth", authRoutes); 


// Define rutas opara las licencias /api/licencias 
// router.use("/licencias", authenticationMiddleware, licenciasRoutes); 
// router.use("/licencias", licenciasRoutes); 

router.use("/postulacion", postulacionRoutes);
>>>>>>> 9a748ae64b97f7f274c6c561581e72fb903a1816

// Exporta el enrutador
module.exports = router;
