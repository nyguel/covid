const mongoose = require("../database/index");

const BoletimSchema = new mongoose.Schema({
  nome: {
    type: String,
    default: "boletim",
  },
  confirmados: {
    type: Number,
  },
  curados: {
    type: Number,
  },
  suspeitos: {
    type: Number,
  },
  resultado: {
    type: Number,
  },
});
const Boletim = mongoose.model("Boletim", BoletimSchema);

module.exports = Boletim;
