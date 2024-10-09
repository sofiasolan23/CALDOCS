// @ts-nocheck
const Responsable = require('../models/responsableModel.js'); // Ruta ajustada
const logger = require('../config/logger.js'); // Ruta ajustada

const getResponsables = async (req, res) => {
  try {
    const responsables = await Responsable.findAll();
    if (responsables.length === 0) {
      res.status(404).json({ message: 'No se encontraron responsables' });
    } else {
      res.json(responsables);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getResponsableById = async (req, res) => {
  try {
    const responsable = await Responsable.findByPk(req.params.Id_Responsable);
    if (!responsable) {
      res.status(404).json({ message: 'Responsable no encontrado' });
    } else {
      res.json(responsable);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createResponsable = async (req, res) => {
  try {
    const { Id_Responsable,Nom_Responsable, estado } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!Id_Responsable || !Nom_Responsable || !estado) {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }



    // Crear el responsable si todas las validaciones son correctas
    const responsable = await Responsable.create({Id_Responsable, Nom_Responsable, estado });
    return res.status(201).json(responsable);


  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    
    // Manejo de errores con un mensaje genérico
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Error en el procesamiento de datos' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateResponsable = async (req, res) => {
  try {
    const responsable = await Responsable.findByPk(req.params.Id_Responsable);

    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    const [updated] = await Responsable.update(req.body, {
      where: { Id_Responsable: req.params.Id_Responsable },
    });

    if (updated) {
      const updatedResponsable = await Responsable.findByPk(req.params.Id_Responsable);
      res.json(updatedResponsable);
    } else {
      res.status(404).json({ message: 'Responsable no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteResponsable = async (req, res) => {
  try {
    const responsable = await Responsable.findByPk(req.params.Id_Responsable);

    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    const deleted = await Responsable.destroy({
      where: { Id_Responsable: req.params.Id_Responsable },
    });

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Responsable no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable,
};
