const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Associado = require("./associado.model");

const Emprestimo = sequelize.define(
  "emprestimo",
  {
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nro_exemplar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'indice_composto'
    },
    isbn: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: 'indice_composto'
    },
    codigo_assoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_emp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    data_devol: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
Emprestimo.belongsTo(Associado, {
  foreignKey: "codigo_assoc",
  targetKey: "codigo",
});
Emprestimo.sync();

module.exports = Emprestimo;
