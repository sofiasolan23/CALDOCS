// @ts-nocheck
const { DataTypes } = require('sequelize');
const pool = require('../config/database');

const Responsable = pool.define('responsable', {
  Id_Responsable: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Responsable: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = Responsable;
