const Boletim = require("../models/boletim");

module.exports = {
  async put(request, response) {
    const token = request.hash;
    try {
      const { curados, suspeitos, resultado, confirmados } = request.body;
      const paciente = await Boletim.create({
        curados,
        suspeitos,
        resultado,
        confirmados,
      });
      await Boletim.updateOne(
        { nome: "boletim" },
        { curados, suspeitos, resultado, confirmados }
      );
      response.render("Main.ejs", { token });
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .send({ error: "Erro ao atualizar o boletim" });
    }
  },
};
