/*const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://gndqwqzgsfrbtc:d66f28feb069e196ba6016188dd52950875c92a111b66456dcfe5766d2c345cd@ec2-52-20-166-21.compute-1.amazonaws.com:5432/d21dqu7j6lim17",
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;*/

module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "root",
  DB: "Projeto_Final",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
