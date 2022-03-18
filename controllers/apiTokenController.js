const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userRouter = require("../routes/userRoutes");

async function getToken(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    res.json({ accessToken: token, user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  getToken,
};
