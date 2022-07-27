const Exemplar = require("../models/exemplar.model");
const publicacao_controller = require("../controllers/publicacao.controller");

exports.Create = async function (data) {
  const exemplar = await publicacao_controller.Find_One(data.isbn);
  if (!exemplar) throw new Error("Publicacão não cadastrada!");

  return Exemplar.create(data, { raw: true });
};

exports.Find_One = async function (numero, isbn) {
  return Exemplar.findOne({ where: { numero, isbn } });
};

exports.Update = async function (numero, isbn, data) {
  return Exemplar.update(data, { where: { numero: numero, isbn: isbn } });
};

exports.Delete = async function (numero, isbn) {
  return Exemplar.destroy({ where: { numero, isbn } });
};

exports.Find_All_By_Primary_Keys = async function (numero, isbn) {
  return Exemplar.findAll(
    { where: { numero: numero, isbn: isbn } },
    { raw: true }
  );
};

exports.Find_All_By_ISBN = async function (isbn) {
  return Exemplar.findAll({ where: { isbn } }, { raw: true });
};

exports.Get_Exemplares_Disponiveis = async function (isbn) {
  const exemplares = await Exemplar.findAll({ where: { isbn } }, { raw: true });
  const emprestimos = await publicacao_controller.Find_All_By_ISBN(isbn);

  let exemplares_disponiveis = [];

  exemplares.forEach((exemplar) => {
    let flag = true;
    emprestimos.forEach((emprestimo) => {
      if (exemplar.numero === emprestimo.nro_exemplar) {
        flag = false;
      }
    });
    if (check) {
      exemplares_disponiveis.push(exemplar);
    }
  });

  return exemplares_disponiveis;
};
