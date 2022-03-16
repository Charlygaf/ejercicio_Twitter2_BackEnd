const Tweet = require("../schemas/Tweet");
const User = require("../schemas/User");

async function index(req, res) {
  const tweets = await Tweet.find().populate("user");
  res.json(tweets);
}

async function show(req, res) {
  const { id } = req.params;
  const tweet = await Tweet.findOne({ id: id }).populate("user");
  res.json(tweet);
}

async function store(req, res) {
  try {
    const tweet = await Tweet.create({
      content: req.body.content,
      user: req.user,
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { tweets: tweet } });
    res.status(200).json({ message: "The tweet was uploaded successfully" });
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
  res.status(200).json({ message: "The tweet was removed successfully" });
}

async function like(req, res) {
  const { id } = req.body;

  await Tweet.findByIdAndUpdate(id, {
    $push: { likes: req.user.id },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $push: { likes: id },
  });
  res.redirect({ message: "The like was added on tweet successfully" });
}

/* Habría que agregar a el unlike con el like, supongo que con un if o algo de eso (soy facu) */

// async function unlike(req, res) {
//   const { id } = req.body;
//   await Tweet.findByIdAndUpdate(id, {
//     $pull: { likes: req.user.id },
//   });
//   await User.findByIdAndUpdate(req.user.id, {
//     $pull: { likes: id },
//   });
//   res.redirect("back");
// }

module.exports = {
  show,
  index,
  store,
  destroy,
  like,
  // unlike,
};
