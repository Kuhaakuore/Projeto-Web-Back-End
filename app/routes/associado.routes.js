const express = require("express");
const Controller = require("../controllers/associado.controller");

const router = express.Router();

router.post("/associados", async (req, res, next) => {
  const data = req.body;
  console.log(req.body);
  try {
    const associado = await Controller.Create(data);
    res.status(201).json(associado);
  } catch (e) {
    next(e);
  }
});

router.get("/associados/:codigo", async (req, res, next) => {
  try {
    const associado = await Controller.Find_One(req.params.codigo);
    res.status(201).json(associado);
  } catch (e) {
    next(e);
  }
});

router.post("/associados/login", async (req, res, next) => {
  const data = req.body;
  console.log(data.senha);
  try {
    const token = await Controller.Login(data);
    res.status(200).json(token);
  } catch (e) {
    next(e);
  }
});

module.exports = router;