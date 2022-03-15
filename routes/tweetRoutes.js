const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");

tweetRouter.get("/tweets", tweetController.index);

// tweetRouter.get("/tweets/:id", tweetController.show)

tweetRouter.post("/tweets", tweetController.store);

tweetRouter.delete("/tweets/:id", tweetController.destroy);

tweetRouter.post("/like", tweetController.like);
tweetRouter.delete("/unlike", tweetController.unlike);
module.exports = tweetRouter;
