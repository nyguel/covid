const Paciente = require("../models/paciente");

module.exports = {
  async index(request, response) {
    const token = request.hash;
    const suspeito = request.query.suspeito;
    const id = request.query.id;
    try {
      if (id) {
        const novo = await Paciente.findByIdAndUpdate(
          id,
          { suspeito: suspeito },
          { new: true }
        );
        const pacientes = await Paciente.find({ suspeito: true });
        return response.render("suspeitos.ejs", { pacientes, token });
      } else {
        const pacientes = await Paciente.find({ suspeito: true });
        return response.render("suspeitos.ejs", { pacientes, token });
      }
    } catch (error) {
      console.log(error);
      return response.status(400).send({ error });
    }
  },
  async put(request, response) {
    const token = request.hash;
    const { suspeitos, id } = request.body;

    try {
      const novo = await Paciente.findByIdAndUpdate(
        id,
        { suspeito: suspeitos },
        { new: true }
      );

      const pacientes = await Paciente.find({ suspeito: true });

      return response.render("suspeitos.ejs", { pacientes, token });
    } catch (error) {
      console.log(error);
      return response.status(400).send({ error });
    }
  },
};
