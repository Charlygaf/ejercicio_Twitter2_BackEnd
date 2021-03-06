const publicRoutes = require("./publicRoutes");
const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  app.use(publicRoutes);
  app.use(tweetRoutes);
  app.use(userRoutes);
};
