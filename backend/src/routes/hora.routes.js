"use strict";

const express = require("express");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const horaController = require("../controllers/hora.controller.js");

const router = express.Router();   

router.use(authenticationMiddleware);

// Define the routes for the hours
router.get("/", authorizationMiddleware.isAdmin, 
    authorizationMiddleware.isFuncionario, horaController.getHoras);
    
router.get("/disponibles", horaController.getHorasDisponibles);

router.post("/", authorizationMiddleware.isAdmin, 
    authorizationMiddleware.isFuncionario, horaController.createHora);

router.get("/:id", authorizationMiddleware.isAdmin,
    authorizationMiddleware.isFuncionario, horaController.getHoraById);

router.put("/:id",
authorizationMiddleware.isAdmin,
authorizationMiddleware.isFuncionario,
horaController.updateHora,
);

router.delete("/:id",
authorizationMiddleware.isAdmin,
authorizationMiddleware.isFuncionario,
horaController.deleteHora,
);

router.put("/asignar/:id", horaController.elegirHora);

module.exports = router;


