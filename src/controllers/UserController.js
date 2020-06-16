const User = require("../models/user");
const bcrypt = require("bcrypt");
module.exports = {
  async index(request, response) {
    const token = request.hash;
    try {
      const users = await User.find();
      return response.render("Usuarios.ejs", { users, token });
    } catch (error) {
      return response.status(400).send({ error });
    }
  },

  async create(request, response) {
    try {
      const {} = request.body;
      const user = await Paciente.create({});
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

      await User.findByIdAndDelete(request.params.id);
      const users = await User.find();
      return response.render("Usuarios.ejs", { users, token });
    } catch (error) {
      return response
        .status(400)
        .send({ error: "Erro ao tentar excluir o paciente" });
    }
  },
  async put(request, response) {
    try {
      const { senha, id } = request.body;
      const token = request.hash;
      const password = await bcrypt.hash(senha, 10);
      const user = await User.findByIdAndUpdate(
        id,
        { senha: password },
        { new: true }
      );
      console.log(user);
      const users = await User.find();
      return response.render("Usuarios.ejs", { users, token });
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .send({ error: "Erro ao atualizar o paciente" });
    }
  },
};
