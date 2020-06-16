const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const Boletim = require("../models/boletim");
const Paciente = require("../models/paciente");

router.post("/registrar", async (req, res) => {
  const token = req.hash;
  const { nome, privilegio, usuario, senha } = req.body;

  try {
    if (await User.findOne({ usuario }))
      return res.status(400).send({ error: "Usuário já existente" });

    const password = await bcrypt.hash(senha, 10);
    const body = {
      nome: nome,
      usuario: usuario,
      senha: password,
      privilegio: privilegio,
    };
    await User.create(body);
    const users = await User.find();
    return res.render("Usuarios.ejs", { users, token });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao registrar" });
  }
});
router.get("/login", function (req, res) {
  res.render("login.ejs", { message: "" });
});
router.get("/", async function (req, res) {
  const boletim = await Boletim.findOne();
  res.render("Raiz.ejs", { boletim });
});

router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;
  const user = await User.findOne({ usuario }).select("+senha");

  if (!user) {
    res.status(400).send({ error: "Usuário não encontrado" });
  } else if (!(await bcrypt.compare(senha, user.senha))) {
    res.status(400).send({ error: "Senha incorreta" });
  } else {
    user.senha = undefined;
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 36000,
    });
    const userid = user.id;
    const pacientes = await Paciente.find();
    res.render("Main.ejs", { userid, token });
  }
});

module.exports = (app) => app.use("/", router);
