"use strict";

const express = require("express");

const postulacionController = require("../controllers/postulacion.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
// const { uploadFile } = require("../controllers/archivos.controller.js");

const router = express.Router();

router.use(authenticationMiddleware);


router.get("/", authorizationMiddleware.isFuncionario, authorizationMiddleware.isAdmin,
postulacionController.getPostulaciones);
router.post("/",
 postulacionController.createPostulaciones);
router.get("/:id", authorizationMiddleware.isFuncionario, authorizationMiddleware.isAdmin, 
postulacionController.getPostulacionById);
router.delete("/:id",  
postulacionController.deletePostulacionById);
router.put("/:id", authorizationMiddleware.isFuncionario, authorizationMiddleware.isAdmin, 
postulacionController.updatePostulacionById);


module.exports = router;
