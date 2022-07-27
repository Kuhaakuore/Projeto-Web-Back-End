const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Publicacao = require("./publicacao.model");

const Exemplar = sequelize.define(
  "exemplar",
  {
    numero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(12),
      primaryKey: true,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      defaultValue: null
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

Publicacao.hasMany(Exemplar, { foreignKey: "isbn" });
Exemplar.belongsTo(Publicacao, { foreignKey: "isbn", targetKey: "isbn" });
Exemplar.sync();

module.exports = Exemplar;
