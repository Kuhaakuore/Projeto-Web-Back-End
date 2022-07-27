const Reserva = require("../models/reserva.model");
const associado_controller = require("../controllers/associado.controller");
const publicacao_controller = require("../controllers/publicacao.controller");
const emprestimo_controller = require("../controllers/emprestimo.controller");
const exemplar_controller = require("../controllers/exemplar.controller");

exports.Create = async function (data) {
  const emprestimos = await emprestimo_controller.Find_All_By_ISBN(data.isbn);
  const exemplares = await exemplar_controller.Find_All_By_ISBN(data.isbn);

  if (emprestimos.length < exemplares.length)
    throw new Error("Nenhum exemplar disponível!");

  return Reserva.create(data, { raw: true });
};

exports.Find_All_By_ISBN = async function (isbn) {
  return Reserva.findAll({ where: { isbn } });
};

exports.Find_One = async function (codigo) {
  return Reserva.findOne({ where: { codigo } });
};

exports.Update = async function (codigo, data) {
  return Reserva.update(data, { where: { codigo } });
};

exports.Delete = async function (codigo) {
  return Reserva.destroy({ where: { codigo } });
};

exports.Find_One_By_Primary_Keys = async function (isbn, codigo_assoc) {
  return Reserva.findOne({ where: { isbn, codigo_assoc } });
};

exports.Anular = async function (data) {
  const isbn = data.isbn;
  const codigo_assoc = data.codigo_assoc;
  const reserva = await Reserva.findOne({ where: { isbn, codigo_assoc } });

  if (reserva) {
    const status = {
      status: "Anulado",
    };
    return Reserva.update(status, { where: { codigo_assoc } });
  }

  throw "Reserva não cadastrada!";
};