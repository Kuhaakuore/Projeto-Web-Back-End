const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Funcionario = sequelize.define(
  "funcionario",
  {
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    funcao: {
      type: DataTypes.ENUM("gerente", "funcionario"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
Funcionario.sync();

module.exports = Funcionario;
