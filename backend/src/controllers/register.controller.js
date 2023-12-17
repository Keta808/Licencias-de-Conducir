"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const register = require("../services/register.service");
const { userBodySchema, userIdSchema } = require("../schema/user.schema");
const { handleError } = require("../utils/errorHandler");

//CREAR USUARIO CON ROL USER
async function createUser(req, res) {

    try {
      const { body } = req;
      const { error: bodyError } = userBodySchema.validate(body);
      if (bodyError) return respondError(req, res, 400, bodyError.message);
        
      const [newUser, userError] = await register.createUser(body);
  
      if (userError) return respondError(req, res, 400, userError);
      if (!newUser) {
        return respondError(req, res, 400, "No se creo el usuario");
      }
  
      respondSuccess(req, res, 201, newUser);
    } catch (error) {
      handleError(error, "REGISTER.controller -> createUser");
      respondError(req, res, 500, "No se creo el usuario");
    }
  }

  module.exports= {
        createUser,
    };
