const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Publicacao = sequelize.define(
  "publicacao",
  {
    isbn: {
      type: DataTypes.STRING(12),
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    editora: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

Publicacao.sync();

module.exports = Publicacao;
