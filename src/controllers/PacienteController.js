const Paciente = require("../models/paciente");
const Viagens = require("../models/viagem");

module.exports = {
  async index(request, response) {
    const token = request.hash;
    try {
      const pacientes = await Paciente.find();
      return response.render("pacientes.ejs", { pacientes, token });
    } catch (error) {
      return response.status(400).send({ error });
    }
  },

  async create(request, response) {
    try {
      const {
        cpf,
        nome,
        endereco,
        bairro,
        telefone,
        nascimento,
        attsuspeito,
      } = request.body;

      var suspeito;
      if (attsuspeito === "on") {
        suspeito = true;
      }

      await Paciente.create({
        cpf,
        nome,
        endereco,
        bairro,
        telefone,
        nascimento,
        suspeito,
      });
      const token = request.hash;
      return response.render("cadastroPaciente.ejs", { token });
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .send({ error: "Erro ao tentar criar o registro" });
    }
  },
  async delete(request, response) {
    try {
      const token = request.hash;
      await Paciente.findByIdAndDelete(request.query.id);
      const pacientes = await Paciente.find();
      return response.render("pacientes.ejs", { pacientes, token });
    } catch (error) {
      return response
        .status(400)
        .send({ error: "Erro ao tentar excluir o paciente" });
    }
  },
  async put(request, response) {
    try {
      const {
        cpf,
        nome,
        endereco,
        bairro,
        telefone,
        nascimento,
        id,
      } = request.body;
      const token = request.hash;
      await Paciente.findByIdAndUpdate(
        id,
        {
          cpf,
          nome,
          endereco,
          telefone,
          nascimento,
          bairro,
        },
        { new: true }
      );
      const pacientes = await Paciente.find();
      return response.render("pacientes.ejs", { pacientes, token });
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .send({ error: "Erro ao atualizar o paciente" });
    }
  },
};
