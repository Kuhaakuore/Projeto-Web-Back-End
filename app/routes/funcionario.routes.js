const express = require("express");
const Controller = require("../controllers/funcionario.controller");

const router = express.Router();

router.post("/funcionarios", async (req, res, next) => {
  const data = req.body;
  console.log(req.body);
  try {
    const newFuncionario = await Controller.Create(data);
    res.status(201).json(newFuncionario);
  } catch (e) {
    next(e);
  }
});

router.get("/funcionarios/:codigo", async (req, res, next) => {
  try {
    const funcionario = await Controller.Find_One(
      req.params.codigo
    );
    res.status(201).json(funcionario);
  } catch (e) {
    next(e);
  }
});

router.post("/funcionarios/login", async (req, res, next) => {
  const data = req.body;
  try {
    const token = await Controller.Login(data);
    res.status(200).json(token);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
