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
};
