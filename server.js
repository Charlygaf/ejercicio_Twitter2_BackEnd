require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const cors = require("cors");

const mongoose = require("mongoose");
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

routes(app);

mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.connection
  .once("open", () => console.log("¡Conexión con la base de datos establecida!"))
  .on("error", (error) => console.log(error));

// dbInitialSetup();

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`),
);
