/* eslint-disable max-len */
"use strict";
// Importa el modulo 'path' para obtener la ruta absoluta del archivo .env
const path = require("path");

/**  Obtiene la ruta absoluta del archivo .env. */
const envFilePath = path.resolve(__dirname, ".env");

// Carga las variables de entorno desde el archivo .env
require("dotenv").config({ path: envFilePath });

/** Puerto del servidor */
const PORT = process.env.PORT;
/** Host del servidor */
const HOST = process.env.HOST;
/** URL de la base de datos */
const DB_URL = process.env.DB_URL;
/** Secreto para el token de acceso */
const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Secreto para el token de refresco */
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;   
// Envío de correo
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY; 
const EMAIL_USER = process.env.EMAIL_USER; 
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;  

module.exports = { PORT, HOST, DB_URL, ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, SENDGRID_API_KEY, EMAIL_USER, EMAIL_PASSWORD, EMAIL_SERVICE };
