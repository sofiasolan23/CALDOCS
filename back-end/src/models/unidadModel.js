// @ts-nocheck
const { DataTypes } = require('sequelize');
const pool = require('../config/database.js');

const Area = require('../models/areaModel.js');

const Unidad = pool.define('unidad', {
  Id_Unidad: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Unidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Area: {
    type: DataTypes.INTEGER,
    references: {
      model: Area,
      key: 'Id_Area',
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

Area.hasMany(Unidad, { foreignKey: 'Id_Area' });
Unidad.belongsTo(Area, { foreignKey: 'Id_Area' });

module.exports = Unidad;
