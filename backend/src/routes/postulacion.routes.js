"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");

const router = express.Router();

router.get("/", postulacionController.getPostulaciones);

module.exports = router;
