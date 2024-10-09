// @ts-nocheck
// models/formato.js
const { DataTypes } = require('sequelize');
const pool = require('../config/database.js')
const Responsable = require('../models/responsableModel.js')
const Procedimiento = require('../models/procedimientoModel.js')
const Unidad = require('../models/unidadModel.js')

const Formato = pool.define('Formato', {
  Id_Formato: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Cod_Formato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Fec_Actualizacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Ver_Formato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Est_Formato: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
  },
  Id_Responsable: {
    type: DataTypes.INTEGER,
    references: {
      model: Responsable,
      key: 'Id_Responsable',
    },
  },
  Nom_Formato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Nom_Magnetico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Procedimiento: {
    type: DataTypes.INTEGER,
    references: {
      model: Procedimiento,
      key: 'Id_Procedimiento',
    },
  },
  Id_Unidad: {
    type: DataTypes.INTEGER,
    references: {
      model: Unidad,
      key: 'Id_Unidad',
    },
  },
  Archivo_URL: {
    type: DataTypes.STRING,  // La ruta donde se guardará el archivo
    allowNull: true,         // Permitimos que sea null inicialmente
  },
}, {
  freezeTableName:true,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Responsable.hasMany(Formato, { foreignKey: 'Id_Responsable' });
Procedimiento.hasMany(Formato, { foreignKey: 'Id_Procedimiento' });
Unidad.hasMany(Formato, { foreignKey: 'Id_Unidad' });

Formato.belongsTo(Responsable, { foreignKey: 'Id_Responsable' });
Formato.belongsTo(Procedimiento, { foreignKey: 'Id_Procedimiento' });
Formato.belongsTo(Unidad, { foreignKey: 'Id_Unidad' });

module.exports = Formato;
