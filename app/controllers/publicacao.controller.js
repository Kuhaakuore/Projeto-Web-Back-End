const Publicacao = require("../models/publicacao.model");

exports.Create = async function (data) {
  return Publicacao.create(data, { raw: true });
};

exports.Find_All_By_ISBN = async function (isbn) {
  return Publicacao.findAll({ where: { isbn: isbn } }, { raw: true });
};

exports.Find_All_By_Titulo = async function (titulo) {
  return Publicacao.findAll({ where: { titulo: titulo } }, { raw: true });
};

exports.Find_One = async function (isbn) {
  return Publicacao.findOne({ where: { isbn } });
};

exports.Update = async function (isbn, data) {
  return Publicacao.update(data, { where: { isbn } });
};

exports.Delete = async function (isbn) {
  return Publicacao.destroy({ where: { isbn } });
};
