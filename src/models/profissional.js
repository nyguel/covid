const mongoose = require("../database/index");
const ProfissionalSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
  },
  funcao: {
    type: String,
  },
  telefone: { type: String },
  nascimento: {
    type: String,
  },
});
const Profissional = mongoose.model("Profissional", ProfissionalSchema);
module.exports = Profissional;
