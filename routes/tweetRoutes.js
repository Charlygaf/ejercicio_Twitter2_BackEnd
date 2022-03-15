const express = require("express");
const tweetRouter = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const tweetController = require("../controllers/tweetController");

tweetRouter.post("/new-tweet", authenticateUser, tweetController.store);

tweetRouter.delete("/delete-tweet", authenticateUser, tweetController.destroy);

tweetRouter.post("/like", authenticateUser, tweetController.like);
tweetRouter.delete("/unlike", authenticateUser, tweetController.unlike);
module.exports = tweetRouter;
