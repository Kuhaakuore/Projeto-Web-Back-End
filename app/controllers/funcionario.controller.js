const Funcionario = require("../models/funcionario.model");

exports.Create = async function (data) {
  return Funcionario.create(data, { raw: true });
};

exports.Find_All = async function () {
  return Funcionario.findAll({ where: { codigo: codigo } }, { raw: true });
};

exports.Find_One = async function (codigo) {
  return Funcionario.findOne({ where: { codigo } });
};

exports.Update = async function (codigo, data) {
  return Funcionario.update(data, { where: { codigo } });
};

exports.Delete = async function (codigo) {
  return Funcionario.destroy({ where: { codigo } });
};

exports.Find_All_By_Email = async function (email) {
  return Funcionario.findOne({ where: { email } });
};

exports.Login = async function (data) {
  const email = data.email;
  const funcionario = await Funcionario.findOne({ where: { email } });
  if (!funcionario) throw new Error("Funcionário não cadastrado!");
  const senha = data.senha === funcionario.senha;
  if (!senha) throw new Error("Senha incorreta!");
  return "Bem vindo " + funcionario.nome;
};