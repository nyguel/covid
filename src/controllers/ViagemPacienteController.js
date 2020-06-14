const knex = require("../database/connection");

module.exports = {
  async index(request, response) {
    const pacientes = await knex("Paciente").select("*");
    return response.json(pacientes);
  },
};
