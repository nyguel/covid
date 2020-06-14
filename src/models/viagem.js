const mongoose = require("../database/index");

const ViagensSchema = new mongoose.Schema({
  destino: {
    type: String,
    uppercase: true,
  },
  data: {
    type: String,
  },
  hora: {
    type: String,
  },
});
const Viagens = mongoose.model("Viagens", ViagensSchema);

module.exports = Viagens;
