const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const Boletim = require("../models/boletim");

router.post("/registrar", async (req, res) => {
  const nome = req.body.nome;
  try {
    if (await User.findOne({ nome }))
      return res.status(400).send({ error: "Usuário já existente" });

    const senha = await bcrypt.hash(req.body.senha, 10);
    const body = {
      nome: req.body.nome,
      senha: senha,
    };
    const user = await User.create(body);
    user.senha = undefined;
    return res.send(user);
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
  const { nome, senha } = req.body;
  const user = await User.findOne({ nome }).select("+senha");

  if (!user) {
    res.status(400).send({ error: "Usuário não encontrado" });
  } else if (!(await bcrypt.compare(senha, user.senha))) {
    res.status(400).send({ error: "Senha incorreta" });
  } else {
    user.senha = undefined;
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 3600,
    });
    const userid = user.id;
    res.render("Main.ejs", { userid, token });
  }
});

module.exports = (app) => app.use("/", router);
