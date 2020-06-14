const mongoose = require("../database/index");

const PacienteSchema = new mongoose.Schema({
  cpf: {
    type: String,
    unique: true,
  },
  nome: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
  },
  endereco: {
    type: String,
    required: true,
    uppercase: true,
  },
  telefone: {
    type: String,
  },
  nascimento: {
    type: String,
  },
  suspeito: {
    type: Boolean,
    default: false,
  },
  quarentena: {
    type: Boolean,
    default: false,
  },
  quarentena_inicio: {
    type: String,
    default: "",
  },
  quarentena_fim: {
    type: String,
    default: "",
  },
  viagens: [
    {
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
    },
  ],
});
const Paciente = mongoose.model("Paciente", PacienteSchema);

module.exports = Paciente;
