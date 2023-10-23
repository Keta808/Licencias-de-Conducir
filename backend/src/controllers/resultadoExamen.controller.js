
const ResExamen = require("../models/resultadoExamen.model.js"); 


// Controlador para crear un nuevo resultado de examen 
exports.createResExamen = async (req, res) => {
  try {
    const nuevoResExamen = new ResExamen(req.body);
    const resExamenGuardado = await nuevoResExamen.save();
    res.status(201).json(resExamenGuardado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el resultado de examen." });
  }
}; 

// Controlador para obtener todos los resultados de examen
exports.getResExamen = async (req, res) => {
   try {
     const resExamenes = await ResExamen.find();
     res.json(resExamenes);
   } catch (error) {
     res.status(500).json({ error: "Error al obtener los resultados de examen." });
   }
}; 

// Controlador para obtener un resultado de examen por su id de resultado de examen 
exports.getResExamenById = async (req, res) => {
  try {
    const resExamen = await ResExamen.findById(req.params.idResExamen);
    res.json(resExamen);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el resultado de examen." });
  }
}; 
// controlador para obtener un resultado de examen por su rut de usuario 
exports.getResExamenByRut = async (req, res) => {
  try {
    const resExamen = await ResExamen.find({ rut: req.params.rut });
    res.json(resExamen);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el resultado de examen." });
  }
};

// Controlador para actualizar un resultado de examen por su id de resultado de examen 
exports.updateResExamenById = async (req, res) => {
  try {
    await ResExamen.findByIdAndUpdate(req.params.idResExamen, req.body);
    res.json({ mensaje: "El resultado de examen fue actualizado." });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el resultado de examen." });
  }
};

// Controlador para eliminar un resultado de examen por su id de resultado de examen
exports.deleteResExamenById = async (req, res) => {
  try {
    await ResExamen.findByIdAndDelete(req.params.idResExamen);
    res.json({ mensaje: "El resultado de examen fue eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el resultado de examen." });
  }
};
// Controlador para eliminar un resultado de examen por su rut de usuario
exports.deleteResExamenByRut = async (req, res) => {
  try {
    await ResExamen.findOneAndDelete({ rut: req.params.rut });
    res.json({ mensaje: "El resultado de examen fue eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el resultado de examen." });
  }
}; 
// Controlador para actualizar un resultado de examen por su rut de usuario 
exports.updateResExamenByRut = async (req, res) => { 
  try { 
    await ResExamen.findOneAndUpdate({ rut: req.params.rut }, req.body); 
    res.json({ mensaje: "El resultado de examen fue actualizado." }); 
  } catch (error) { 
    res.status(500).json({ error: "Error al actualizar el resultado de examen." }); 
  }
 };
// Controlador para obtener un resultado de examen por su rut de usuario  
exports.getResExamenByRut = async (req, res) => {
  try {
    const resExamen = await ResExamen.find({ rut: req.params.rut });
    res.json(resExamen);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el resultado de examen." });
  }   
}; 

// Controlador para obtener un resultado de examen por su rut de usuario 
exports.getResExamenByRut = async (req, res) => {
  try {
    const resExamen = await ResExamen.find({ rut: req.params.rut });
    res.json(resExamen);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el resultado de examen." });
  }
};


// Controlador para enviar por correo electronico un resultado de examen 
exports.enviarResExamen = async (req, res) => {
  
}; 

