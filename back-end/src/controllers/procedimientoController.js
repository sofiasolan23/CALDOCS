// @ts-nocheck
const Procedimiento = require('../models/procedimientoModel.js');
const logger = require('../config/logger.js');

const getProcedimientos = async (req, res) => {
  try {
    const procedimientos = await Procedimiento.findAll();
    if (procedimientos.length === 0) {
      res.status(404).json({ message: 'No se encontraron procedimientos' });
    } else {
      res.json(procedimientos);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getProcedimientoById = async (req, res) => {
  try {
    const procedimiento = await Procedimiento.findByPk(req.params.Id_Procedimiento);
    if (procedimiento) {
      res.json(procedimiento);
    } else {
      res.status(404).json({ message: 'Procedimiento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createProcedimiento = async (req, res) => {
  try {
    const { Nom_Procedimiento, Id_Proceso, estado } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!Nom_Procedimiento || !Id_Proceso || !estado) {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }

    // Validar que el estado sea 'Sí' o 'No'
    if (estado !== 'Sí' && estado !== 'No') {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    // Crear el procedimiento si todas las validaciones son correctas
    const procedimiento = await Procedimiento.create({ Nom_Procedimiento, Id_Proceso, estado });
    res.status(201).json(procedimiento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });

    // Manejo de errores con un mensaje genérico
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Error en el procesamiento de datos' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateProcedimiento = async (req, res) => {
  try {
    const [updated] = await Procedimiento.update(req.body, {
      where: { Id_Procedimiento: req.params.Id_Procedimiento },
    });

    if (updated) {
      const updatedProcedimiento = await Procedimiento.findByPk(req.params.Id_Procedimiento);
      res.json(updatedProcedimiento);
    } else {
      res.status(404).json({ message: 'Procedimiento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteProcedimiento = async (req, res) => {
  try {
    const deleted = await Procedimiento.destroy({
      where: { Id_Procedimiento: req.params.Id_Procedimiento },
    });

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Procedimiento no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
};
