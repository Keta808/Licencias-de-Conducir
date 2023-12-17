"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
const createUserController = require("../controllers/register.controller.js");

const router = express.Router();

router.post("/", createUserController.createUser);

module.exports = router;