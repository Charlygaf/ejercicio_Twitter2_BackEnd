const express = require("express");
const userController = require("../controllers/userController");
const publicController = require("../controllers/publicController");
const publicRouter = express.Router();

// Rutas del Públicas:

publicRouter.get("/", publicController.index);
publicRouter.get("/registro", userController.create);
publicRouter.post("/registro", userController.store);

module.exports = publicRouter;
