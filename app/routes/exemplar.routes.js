const express = require("express");
const Controller = require("../controllers/exemplar.controller");

const router = express.Router();

router.post("/exemplares", async (req, res, next) => {
  const data = req.body;
  try {
    const newExemplar = await Controller.Create(data);
    res.status(201).json(newExemplar);
  } catch (e) {
    next(e);
  }
});

router.get("/exemplares/:codigo", async (req, res, next) => {
  try {
    const exemplar = await Controller.Find_One(req.params.numero, req.params.isbn);
    res.status(201).json(exemplar);
  } catch (e) {
    next(e);
  }
});

router.get("/exemplares/consulta/:isbn", async (req, res, next) => {
  try {
    const exemplar = await Controller.Find_All_By_ISBN(req.params.isbn);
    res.status(201).json(exemplar);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
