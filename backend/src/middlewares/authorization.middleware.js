"use strict";
// Autorizacion - Comprobar el rol del usuario
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin" ) {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

/**
 * 
 * Comprueba si el usuario es funcionario
 * 
 */

async function isFuncionario(req, res, next) {

  try {
      const user = await User.findOne({ email: req.email });
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "funcionario" || roles[i].name === "admin") {
              next();
              return;
          }
      }
      return respondError(
          req,
          res,
          401,
          "Se requiere un rol de funcionario para realizar esta acción",
      );
  } catch (error) {
      handleError(error, "authorization.middleware -> isFuncionario");
  }
} 


module.exports = {
  isFuncionario,
  isAdmin
};


