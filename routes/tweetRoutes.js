const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");

tweetRouter.get("/tweets", tweetController.index);

tweetRouter.get("/tweets/:id", tweetController.show);

tweetRouter.post("/tweets", tweetController.store);

tweetRouter.delete("/tweets/:id", tweetController.destroy);

tweetRouter.patch("/like", tweetController.like);

module.exports = tweetRouter;
