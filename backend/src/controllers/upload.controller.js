"use strict";

const multer = require("multer");

/** asd */
const storage = multer.diskStorage({
    /** */
  destination: function(req, file, cb) {
    cb(null, "uploads/"); // Directorio donde se almacenarán los archivos subidos
  },
  /** asd*/
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo subido
  },
});

/** asd */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // El archivo es de tipo PDF
  } else {
    cb(new Error("El archivo no es de tipo PDF"), false);
  }
};

const limits = {
  fileSize: 1024 * 1024, // Límite de 1 MB (1024 KB)
};

const getupload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = getupload;
