const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/users", userController.index);

userRouter.get("/users/:username", userController.show);

userRouter.post("/follow", userController.follow);

userRouter.delete("/unfollow", userController.unfollow);

userRouter.delete("/logout", userController.logout);

userRouter.post("/edit-profile", userController.update);

module.exports = userRouter;
