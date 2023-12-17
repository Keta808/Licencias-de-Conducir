"use strict";

const User = require("../models/user.model.js");

async function obtenerRut(email) {
    try {
        const usuario = await User.findOne({ email });
        return usuario ? usuario.rut : null;
      } catch (error) {
        throw error;
      }
    }
    
    module.exports = {
        obtenerRut,
    };