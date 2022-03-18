const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    userName: { type: String, unique: true, required: true },
    photoProfile: { type: String, default: "https://thispersondoesnotexist.com" },
    email: { type: String, unique: true },
    photoCover: { type: String, default: "defaultCoverPhoto.png" },
    biography: { type: String, default: "" },
    followers: [{ type: Schema.Types.ObjectId }],
    following: [{ type: Schema.Types.ObjectId }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    birthDate: Date,
    password: String,
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
