const Associado = require("../models/associado.model");

exports.Create = async function (data) {
  return Associado.create(data, { raw: true });
};

exports.Find_all = async function (codigo) {
  return Associado.findAll({ where: { codigo: codigo } }, { raw: true });
};

exports.Find_One = async function (codigo) {
  return Associado.findOne({ where: { codigo } });
};

exports.Update = async function (codigo, data) {
  return Associado.update(data, { where: { codigo } });
};

exports.Delete = async function (codigo) {
  return Associado.destroy({ where: { codigo } });
};

exports.Find_One_By_Email = async function (email) {
  return Associado.findOne({ where: { email } });
};

exports.Login = async function (data) {
  const email = data.email;
  const associado = await Associado.findOne({ where: { email } });
  if (!associado) throw new Error("Associado não cadastrado!");
  const senha = data.senha === associado.senha;
  if (!senha) throw new Error("Senha incorreta!");
  return "Bem-vindo " + data.nome;
};