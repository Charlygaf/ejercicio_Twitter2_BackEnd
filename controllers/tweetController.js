const { redirect } = require("express/lib/response");
const Tweet = require("../schemas/Tweet");
const User = require("../schemas/User");

async function store(req, res) {
  try {
    const tweet = await Tweet.create({
      content: req.body.content,
      user: req.user,
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { tweets: tweet } });
    res.redirect("/home");
  } catch (error) {
    console.log("ERROR:", error.message);
  }
}
async function destroy(req, res) {
  const { id } = req.body;
  await Tweet.findByIdAndRemove(id);
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { tweets: id },
  });
  res.redirect("back");
}

async function like(req, res) {
  const { id } = req.body;
  await Tweet.findByIdAndUpdate(id, {
    $push: { likes: req.user.id },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $push: { likes: id },
  });
  console.log(req.baseUrl);
  res.redirect("back");
}

async function unlike(req, res) {
  const { id } = req.body;
  await Tweet.findByIdAndUpdate(id, {
    $pull: { likes: req.user.id },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { likes: id },
  });
  res.redirect("back");
}

module.exports = {
  store,
  destroy,
  like,
  unlike,
};
