const express = require("express");
const userController = require("../controllers/userController");
const publicController = require("../controllers/publicController");
const { checkDuplicateUsernameOrEmail } = require("../middlewares/checkDuplicateUsernameOrEmail");
const publicRouter = express.Router();

// Rutas del Públicas:

publicRouter.get("/", publicController.index);
//publicRouter.get("/registro", userController.create);
publicRouter.post("/user", userController.store);

module.exports = publicRouter;
