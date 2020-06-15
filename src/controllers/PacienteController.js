const knex = require("../database/connection");
const Paciente = require("../models/paciente");
const Viagens = require("../models/viagem");

module.exports = {
  async index(request, response) {
    const token = request.hash;
    try {
      const pacientes = await Paciente.find().populate("viagens");
      //return response.send({ pacientes });
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
        telefone,
        nascimento,
        attsuspeito,
      } = request.body;
      var suspeito;
      if (attsuspeito === "on") {
        suspeito = true;
      }

      const paciente = await Paciente.create({
        cpf,
        nome,
        endereco,
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
      await Paciente.findByIdAndDelete(request.params.id);
      response.send({ Mensagem: "Paciente excluído com sucesso" });
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
        telefone,
        nascimento,
        suspeito,
        viagens,
        quarentena,
        quarentena_inicio,
        quarentena_fim,
      } = request.body;

      const paciente = await Paciente.findByIdAndUpdate(
        request.params.id,
        {
          cpf,
          nome,
          endereco,
          telefone,
          nascimento,
          suspeito,
          quarentena,
          quarentena_inicio,
          quarentena_fim,
        },
        { new: true }
      );
      paciente.viagens = [];
      await Viagens.remove({ paciente: paciente._id });
      await Promise.all(
        viagens.map(async (viagem) => {
          const novaViagem = new Viagens({ ...viagem, paciente: paciente._id });
          await novaViagem.save();
          paciente.viagens.push(novaViagem);
        })
      );
      await paciente.save();
      response.send({ Mensagem: "Paciente atualizado com sucesso" });
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .send({ error: "Erro ao atualizar o paciente" });
    }
  },
};
