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
    const viagens = oldpacientes.viagens;
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
          viagens,
        },
        { new: true }
      );
      return response.render("viagens.ejs", { token, pacientes });
    } catch (error) {
      console.log(error);
    }
  },
};
