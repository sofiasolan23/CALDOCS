// @ts-nocheck
const { DataTypes } = require('sequelize');
const pool = require('../config/database');
const Proceso = require('../models/procesoModel.js');


const Procedimiento = pool.define('procedimiento', {
  Id_Procedimiento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Procedimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Proceso: {
    type: DataTypes.INTEGER,
    references: {
      model: Proceso,
      key: 'Id_Proceso',
    },
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false,
  },
}, {
  freezeTableName:true,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Proceso.hasMany(Procedimiento, { foreignKey: 'Id_Proceso' });
Procedimiento.belongsTo(Proceso, { foreignKey: 'Id_Proceso' });

module.exports = Procedimiento;
