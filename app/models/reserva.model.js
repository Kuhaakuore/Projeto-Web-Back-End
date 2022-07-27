const { DataTypes } = require("sequelize");
const Associado = require("./associado.model");
const Publicacao = require("../models/publicacao.model");
const { sequelize } = require(".");

const Reserva = sequelize.define(
  "reserva",
  {
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isbn: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    codigo_assoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      defaultVlue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("Iniciado", "Avisado", "Anulado"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
Reserva.belongsTo(Publicacao, { foreignKey: "isbn", targetKey: "isbn" });
Reserva.belongsTo(Associado, { foreignKey: "codigo_assoc", targetKey: "codigo" });
Reserva.sync();

module.exports = Reserva;
