
"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler");


async function createUser(user) {
    try {
    
      const { nombre, rut, email, password, roles } = user;
      
  
      // Verificar si el rut o el email ya existen
      const userRut = await User.findOne({ rut: user.rut });
      if (userRut) return [null, "El rut ya existe"];
      
      const userFound = await User.findOne({ email: user.email });
      if (userFound) return [null, "El usuario ya existe"];
  
      const rolesFound = await Role.find({ name: { $in: roles } });
      if (rolesFound.length === 0) return [null, "El rol no existe"];
      const myRole = rolesFound.map((role) => role._id);

      // Crear el nuevo usuario con el rol "user"
      const newUser = new User({
        nombre,
        rut,
        email,
        password: await User.encryptPassword(password),
        roles: myRole,
      });
      
      // Guardar el nuevo usuario en la base de datos
      await newUser.save();
  
      return [newUser, null];
    } catch (error) {
      handleError(error, "register.service -> createUser");
    }
  }

    module.exports= {
            createUser,
        };