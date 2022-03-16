const User = require("../schemas/User");
const Tweet = require("../schemas/Tweet");
const formidable = require("formidable");

async function index(req, res) {
  const users = await User.find().populate("tweets");
  res.status(200).json(users);
}

async function show(req, res) {
  const { username } = req.params;
  const user = await User.findOne({ userName: `${username}` });
  const tweets = await Tweet.find()
    .where({ user: user })
    .sort({ createdAt: "descending" })
    .populate("user")
    .limit(20);
  res.status(200).json({ user, tweets });
}

async function store(req, res) {
  try {
    const user = await User.create(req.body);
    req.login(user, (error) => {
      if (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
      res.redirect("/");
    });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
}

async function update(req, res) {
  /*   await User.findByIdAndUpdate(req.user.id, req.body);
  res.redirect("back");
 */
  const form = formidable({
    multiples: true,
    uploadDir: `${__dirname}/../public/img`,
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        firstname: fields.firstname,
        lastname: fields.lastname,
        userName: fields.userName,
        email: fields.email,
        photoProfile: files.photoProfile.newFilename,
        photoCover: files.photoCover.newFilename,
        birthDate: fields.birthDate,
        password: fields.password,
      },
    });
    res.status(206).json({ message: "The profile was updated successfully" });
  });
}

async function follow(req, res) {
  await User.findByIdAndUpdate(req.user.id, {
    $push: { following: req.body.objectId },
    function(err, result) {
      if (req.user.id === req.body.objectId) {
        res.json(err);
      } else {
        res.json(result);
      }
    },
  });
  await User.findByIdAndUpdate(req.body.objectId, {
    $push: { followers: req.user.id },
    function(err, result) {
      if (req.user.id === req.body.objectId) {
        res.status(409).json(err);
      } else {
        res.status(200).json(result);
      }
    },
  });
  res.json({ message: "The person was added on followings successfully" });
}

/* Habría que agregar a el unfollow con el follow, supongo que con un if o algo de eso (soy facu) */

// async function unfollow(req, res) {
//   await User.findByIdAndUpdate(req.user.id, {
//     $pull: { following: req.body.objectId },
//   });
//   await User.findByIdAndUpdate(req.body.objectId, {
//     $pull: { followers: req.user.id },
//   });
//   res.redirect("back");
// }

async function logout(req, res) {
  try {
    req.logout();
    res.status(418).json({ message: "I'm a teapot" });
  } catch (error) {
    res.status(400);
  }
}

module.exports = {
  index,
  show,
  update,
  follow,
  // unfollow,
  store,
  logout,
};
