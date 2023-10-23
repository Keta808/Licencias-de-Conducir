"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");

const router = express.Router();

router.get("/", postulacionController.getPostulaciones);
router.post("/", postulacionController.createPostulaciones);
router.get("/:id", postulacionController.getPostulacionById);
router.delete("/:id", postulacionController.deletePostulacionById);
router.put("/:id", postulacionController.updatePostulacionById);

module.exports = router;
