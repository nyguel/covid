const Paciente = require("../models/paciente");
const Viagens = require("../models/viagem");

module.exports = {
  async index(request, response) {
    const token = request.hash;

    const pacientes = await Paciente.findById(request.query.id).populate(
      "viagens"
    );
    //response.send(pacientes);
    return response.render("viagens.ejs", { token, pacientes });
  },
  async create(request, response) {
    const { destino, data, hora, id } = request.body;
    const oldpacientes = await Paciente.findById(id);
    const token = request.hash;

    const cpf = oldpacientes.cpf;
    const nome = oldpacientes.nome;
    const endereco = oldpacientes.endereco;
    const telefone = oldpacientes.telefone;
    const nascimento = oldpacientes.nascimento;
    const suspeito = oldpacientes.suspeito;
    const viagens = oldpacientes.viagens;
    const quarentena = oldpacientes.quarentena;
    const quarentena_inicio = oldpacientes.quarentena_inicio;
    const quarentena_fim = oldpacientes.quarentena_fim;
    try {
      const novaViagem = {
        destino: destino,
        data: data,
        hora: hora,
      };
      viagens.push(novaViagem);
      const pacientes = await Paciente.findByIdAndUpdate(
        id,
        {
          cpf,
          nome,
          endereco,
          telefone,
          nascimento,
          viagens,
          suspeito,
          quarentena,
          quarentena_inicio,
          quarentena_fim,
        },
        { new: true }
      );
      return response.render("viagens.ejs", { token, pacientes });
    } catch (error) {
      console.log(error);
    }
  },
};
