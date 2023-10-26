"use strict";

const express = require("express");

const validacionPosController = require("../controllers/validacionPos.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authorizationMiddleware.isFuncionario, authorizationMiddleware.isAdmin,
validacionPosController.getValidacionPos);
router.post("/", authorizationMiddleware.isFuncionario, authorizationMiddleware.isAdmin,
validacionPosController.createValidacionPos);
router.get("/:id", authorizationMiddleware.isFuncionario, authorizationMiddleware.isAdmin,
validacionPosController.getValidacionPosById);
router.delete("/:id", authorizationMiddleware.isFuncionario, authorizationMiddleware.isAdmin,
validacionPosController.deleteValidacionPosById);
router.put("/:id", authorizationMiddleware.isFuncionario, authorizationMiddleware.isAdmin,
validacionPosController.updateValidacionPosById);

module.exports = router;
