const express = require("express");
const Controller = require("../controllers/publicacao.controller");

const router = express.Router();

router.post("/publicacoes", async (req, res, next) => {
  const data = req.body;
  try {
    const publicacao = await Controller.Create(data);
    res.status(201).json(publicacao);
  } catch (e) {
    next(e);
  }
});

router.get("/publicacoes/:codigo", async (req, res, next) => {
  try {
    const publicacao = await Controller.Find_All_By_ISBN(req.params.codigo);
    res.status(201).json(publicacao);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
