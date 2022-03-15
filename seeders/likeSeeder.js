const { faker } = require("@faker-js/faker");
const Tweet = require("../schemas/Tweet");
const User = require("../schemas/User");

faker.locale = "es";

module.exports = async () => {
  for (let i = 0; i < 3000; i++) {
    const randomTweet = faker.datatype.number({ min: 0, max: 199 });
    const randomUser = faker.datatype.number({ min: 0, max: 199 });
    const tweet = await Tweet.findOne().skip(randomTweet);
    const user = await User.findOne().skip(randomUser);
    if (!tweet.likes.includes(user)) {
      await Tweet.findByIdAndUpdate(tweet, {
        $push: { likes: user },
      });
      await User.findByIdAndUpdate(user, {
        $push: { likes: tweet },
      });
    }
  }
  console.log("[Database] Se corrió el seeder de Likes.");
};
