const Paciente = require("../models/paciente");

module.exports = {
  async index(request, response) {
    const token = request.hash;
    const quarentena = request.query.quarentena;
    const id = request.query.id;
    try {
      if (id) {
        const novo = await Paciente.findByIdAndUpdate(
          id,
          { quarentena: quarentena },
          { new: true }
        );
        const pacientes = await Paciente.find({ quarentena: true });
        return response.render("quarentena.ejs", { pacientes, token });
      } else {
        const pacientes = await Paciente.find({ quarentena: true });
        return response.render("quarentena.ejs", { pacientes, token });
      }
    } catch (error) {
      console.log(error);
      return response.status(400).send({ error });
    }
  },
  async put(request, response) {
    const token = request.hash;
    const { quarentena, id, inicio, termino } = request.body;
    try {
      await Paciente.findByIdAndUpdate(
        id,
        {
          quarentena: quarentena,
          quarentena_inicio: inicio,
          quarentena_fim: termino,
        },
        { new: true }
      );
      const pacientes = await Paciente.find({ quarentena: true });

      return response.render("quarentena.ejs", { pacientes, token });
    } catch (error) {
      console.log(error);
      return response.status(400).send({ error });
    }
  },
};
