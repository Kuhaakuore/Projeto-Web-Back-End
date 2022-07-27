const express = require("express");
const Controller = require("../controllers/reserva.controller");

const router = express.Router();

router.post("/reservas", async (req, res, next) => {
  const data = req.body;
  console.log(req.body);
  try {
    const reserva = await Controller.Create(data);
    res.status(201).json(reserva);
  } catch (e) {
    next(e);
  }
});

router.get("/reservas/:codigo", async (req, res, next) => {
  try {
    const reserva = await Controller.Find_One(req.params.codigo);
    res.status(201).json(reserva);
  } catch (e) {
    next(e);
  }
});

router.get("/reservas/consulta/:isbn", async (req, res, next) => {
  try {
    const reserva = await Controller.Find_All_By_ISBN(req.params.isbn);
    res.status(201).json(reserva);
  } catch (e) {
    next(e);
  }
});

module.exports = router;