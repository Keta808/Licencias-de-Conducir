"use strict";

const express = require("express");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const horaController = require("../controllers/hora.controller.js");

const router = express.Router();   

router.use(authenticationMiddleware);

// get todas las horas.
router.get("/", authorizationMiddleware.isAdmin, 
    authorizationMiddleware.isFuncionario, horaController.getHoras);
    
//get horas disponibles y se verifica con un rut    
router.get("/disponibles/:rut", horaController.getHorasDisponibles);

// post una hora. 
router.post("/", authorizationMiddleware.isAdmin, 
    authorizationMiddleware.isFuncionario, horaController.createHora);

// get una hora por id.
router.get("/:id", horaController.getHoraById);

// put una hora por id.
router.put("/:id",
authorizationMiddleware.isAdmin,
authorizationMiddleware.isFuncionario,
horaController.updateHora,
);

// delete una hora por id.
router.delete("/:id",
authorizationMiddleware.isAdmin,
authorizationMiddleware.isFuncionario,
horaController.deleteHora,
);

// ver las horas asociadas a un RUT
router.get("/ver/:rut", horaController.verHoras);

// put para asignar una hora a un usuario mediante el rut de la sesion
router.put("/asignar/:id", horaController.elegirHora);

router.put("/liberar/:id", horaController.liberarHora);
module.exports = router;


