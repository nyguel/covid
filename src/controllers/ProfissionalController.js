const knex = require("../database/connection");

module.exports = {
  async index(request, response) {
    const profissional = await knex("profissional").select("*");
    return response.render("profissionais.ejs", { dados: profissional });
  },

  async create(request, response) {
    msg = [];

    const { nome, funcao, telefone } = request.body;
    const profissional = {
      profissional_nome: nome,
      profissional_funcao: funcao,
      profissional_fone: telefone,
    };
    await knex("profissional").insert(profissional);
    msg.push({ texto: "Profissional cadastrado com sucesso" });
    return response.render("cadastroProfissional", { msg: msg });
  },
};
