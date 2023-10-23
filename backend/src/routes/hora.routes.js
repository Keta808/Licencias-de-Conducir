"use strict";

const express = require("express");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const horaController = require("../controllers/hora.controller.js");

const router = express.Router();   

router.use(authenticationMiddleware);


//define las rutas para las horas
router.get("/", authorizationMiddleware.isAdmin, horaController.getHoras);
router.get("/disponibles",horaController.getHorasDisponibles);
router.post("/", authorizationMiddleware.isAdmin, horaController.createHora);
router.get("/:id",authorizationMiddleware.isAdmin, horaController.getHoraById);
router.put("/:id",
authorizationMiddleware.isAdmin, 
horaController.updateHora
);
router.delete("/:id",
authorizationMiddleware.isAdmin,
horaController.deleteHora
);

module.exports = router;



