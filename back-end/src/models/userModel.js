const { DataTypes } = require('sequelize');
const pool = require('../config/database.js');

const User = pool.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reset_Token:{
    type:DataTypes.STRING(255),
    allowNull:true
  },
  reset_token_expiry:{
    type : DataTypes.TIME,
    allowNull: true
  } 
}, {
    freezeTableName : true,
    timestamps: true
});

module.exports = User;
