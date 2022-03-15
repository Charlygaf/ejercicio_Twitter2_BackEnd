const { faker } = require("@faker-js/faker");
const Tweet = require("../schemas/Tweet");
const User = require("../schemas/User");

faker.locale = "es";

module.exports = async () => {
  const tweets = [];
  for (let i = 0; i < 200; i++) {
    const random = faker.datatype.number({ min: 0, max: 3 });
    const user = await User.findOne().skip(random);
    const tweet = new Tweet({
      content: faker.lorem.paragraphs(2),
      user: user,
      createdAt: faker.date.recent(),
    });
    user.tweets.push(tweet);
    user.save();
    tweets.push(tweet);
  }
  await Tweet.create(tweets);
  console.log("[Database] Se corrió el seeder de Tweets.");
};
