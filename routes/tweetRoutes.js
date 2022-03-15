const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");

tweetRouter.post("/new-tweet", tweetController.store);

tweetRouter.delete("/delete-tweet", tweetController.destroy);

tweetRouter.post("/like", tweetController.like);
tweetRouter.delete("/unlike", tweetController.unlike);
module.exports = tweetRouter;
