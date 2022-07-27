const express = require("express");
const Controller = require("../controllers/emprestimo.controller");

const router = express.Router();

router.post("/emprestimos", async (req, res, next) => {
  const data = req.body;
  console.log(req.body);
  try {
    const emprestimo = await Controller.Create(data);
    res.status(201).json(emprestimo);
  } catch (e) {
    next(e);
  }
});

router.post("/emprestimos/devolver", async (req, res, next) => {
  try {
    const multa = await Controller.Devolucao(req.body);
    res.status(200).json(multa);
  } catch (e) {
    console.log(e);
  }
});

router.get("/emprestimos/atrasados", async (req, res, next) => {
  try {
    const emprestimos_atrasados = await Controller.Get_Atrasados();
    res.status(200).json(emprestimos_atrasados);
  } catch (e) {
    console.log(e);
  }
});

router.get("/emprestimos/:codigo", async (req, res, next) => {
  try {
    const emprestimo = await Controller.Find_One(req.params.codigo);
    res.status(201).json(emprestimo);
  } catch (e) {
    next(e);
  }
});

router.get("/emprestimos/consulta/:codigo", async (req, res, next) => {
  try {
    const emprestimo = await Controller.Find_All_By_Associado(
      req.params.codigo
    );
    res.status(201).json(emprestimo);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
