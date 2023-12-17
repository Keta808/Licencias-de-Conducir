"use strict";

// usuario.controller.js
const usuarioService = require('../services/obtenerRut.service');

async function obtenerRutPorEmail(req, res) {
  try {
    const { email } = req.params;
    const rut = await usuarioService.obtenerRut(email);

    if (rut) {
      res.status(200).json({ rut });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en usuario.controller -> obtenerRutPorEmail:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  obtenerRutPorEmail,
};