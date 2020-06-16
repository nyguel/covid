const mongoose = require("../database/index");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
  },
  usuario: {
    type: String,
    required: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  privilegio: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
