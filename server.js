const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(express.json());
app.use("/", require("./app/routes/associado.routes"));
app.use("/", require("./app/routes/emprestimo.routes"));
app.use("/", require("./app/routes/exemplar.routes"));
app.use("/", require("./app/routes/funcionario.routes"));
app.use("/", require("./app/routes/publicacao.routes"));
app.use("/", require("./app/routes/reserva.routes"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("API funcionando corretamente :)");
});