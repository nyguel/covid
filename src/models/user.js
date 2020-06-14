const mongoose = require("../database/index");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
