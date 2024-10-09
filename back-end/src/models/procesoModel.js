// @ts-nocheck
const { DataTypes } = require('sequelize');
const pool = require('../config/database');
const Responsable = require('..//models/responsableModel.js');

const Proceso = pool.define('proceso', {
  Id_Proceso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Proceso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Responsable: {
    type: DataTypes.INTEGER,
    references: {
      model: Responsable,
      key: 'Id_Responsable',
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

Responsable.hasMany(Proceso, { foreignKey: 'Id_Responsable' });
Proceso.belongsTo(Responsable, { foreignKey: 'Id_Responsable' });

module.exports = Proceso;
