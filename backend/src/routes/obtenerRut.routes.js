// usuario.route.js
"use strict";

const express = require('express');
const router = express.Router();
const obtenerRut = require('../controllers/obtenerRut.controller');

router.get('/obtenerRutPorEmail/:email', obtenerRut.obtenerRutPorEmail);

module.exports = router;