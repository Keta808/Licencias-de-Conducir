"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);


router.get("/", authorizationMiddleware.isf,postulacionController.getPostulaciones);
router.post("/", postulacionController.createPostulaciones);
router.get("/:id", postulacionController.getPostulacionById);
router.delete("/:id", postulacionController.deletePostulacionById);
router.put("/:id", postulacionController.updatePostulacionById);

module.exports = router;
