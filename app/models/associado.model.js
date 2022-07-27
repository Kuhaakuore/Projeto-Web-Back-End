const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

const Associado = sequelize.define(
  "associado",
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
    endereco: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Grad", "Posgrad", "Prof"),
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
Associado.sync();

module.exports = Associado;
