const Emprestimo = require("../models/emprestimo.model");
const associado_controller = require("../controllers/associado.controller");
const reserva_controller = require("../controllers/reserva.controller");

exports.Find_All = function () {
  return Emprestimo.findAll();
};

exports.Find_One = function (codigo) {
  return Emprestimo.findOne({ where: { codigo } });
};

exports.Update = function (codigo, newData) {
  return Emprestimo.update(newData, { where: { codigo } });
};

exports.Delete = function (codigo) {
  return Emprestimo.destroy({ where: { codigo } });
};

exports.Find_All_By_ISBN = function (isbn) {
  return Emprestimo.findAll({ where: { isbn } }, { raw: true });
};

exports.Find_All_By_Associado = function (codigo_assoc) {
  return Emprestimo.findAll({ where: { codigo_assoc } }, { raw: true });
};

exports.Create = async function (data) {
  const emprestimo_assoc = await associado_controller.Find_One(data.codigo_assoc);
  if (!emprestimo_assoc) throw new Error("Associado não cadastrado!");

  const reservas = await reserva_controller.Find_All_By_ISBN(data.isbn);

  let flag = false;
  let nova_reserva;

  (reservas || []).forEach((reserva) => {
    if (reserva.status !== "Anulado" && !flag) {
      nova_reserva = reserva;
      flag = true;
    }
  });

  if (nova_reserva && nova_reserva.codigo_assoc !== data.codigo_assoc)
    throw new Error("Já existem reversas na fila!");

  const associado = await associado_controller.Find_One(data.codigo_assoc);

  if (nova_reserva && nova_reserva.codigo_assoc === data.codigo_assoc) {
    if (associado) {
      const status = {
        status: "Anulado",
      };
      await reserva_controller.Update(nova_reserva.codigo, status);
    }
  }

  data.data_emp = moment();

  if (associado.status === "Grad")
    data.data_devol = moment().add(7, "d");
  else if (associado.status === "Posgrad") 
    data.data_devol = moment().add(10, "d");
  else
    data.data_devol = moment().add(14, "d");

  return Emprestimo.create(data, { raw: true });
};

exports.Get_Atrasados = async function () {
  const emprestimos = await Emprestimo.findAll();

  let atrasados = [];

  if (emprestimos.length) {
    const now = moment();
    emprestimos.forEach((emprestimo) => {
      if (now.diff(emprestimo.data_devol, "days") > 0) {
        atrasados.push({
          codigo_assoc: emprestimo.codigo_assoc,
          isbn: emprestimo.isbn,
        });
      }
    });
  }

  return atrasados;
};

exports.Devolucao = async function (data) {
  const isbn = data.isbn;
  const nro_exemplar = data.nro_exemplar;
  const codigo_assoc = data.codigo_assoc;
  
  const emprestimo = Emprestimo.findOne({
    where: { isbn, nro_exemplar, codigo_assoc },
    raw: true,
  });

  if (emprestimo) {
    const reservas = await reserva_controller.Find_All_By_ISBN(data.isbn);

    let flag = false;
    let nova_reserva;

    (reservas || []).forEach((reserva) => {
      if (reserva.status !== "Anulado" && !checkReserv) {
        nova_reserva = reserva;
        flag = true;
      }
    });

    if (nova_reserva) {
      const status = {
        status: "Avisado",
      };
      await reservaData.atualizarReserva(nova_reserva.codigo, status);
    }

    const codigo = emprestimo.codigo;
    await Emprestimo.destroy({ where: { codigo } });

    const now = moment();
    const diff = now.diff(emprestimo.data_devol, "days");
    return diff > 0 ? { multa: diff } : { multa: 0 };
  }
  throw "Emprestimo não cadastrado!";
};