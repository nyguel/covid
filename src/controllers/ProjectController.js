const express = require("express");
const PacienteController = require("./PacienteController");
const BoletimController = require("./BoletimController");
const ViagemController = require("./ViagemController");
const router = express.Router();
const authMiddleware = require("../midlewares/auth");
const { Router } = require("express");
//router.use(authMiddleware);
const User = require("../models/user");
const SuspeitosController = require("./SuspeitosController");
const QuarentenaController = require("./QuarentenaController");
const UserController = require("./UserController");

router.get("/", (req, res) => {
  res.send({ ok: true });
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
    res.render("Main.ejs", { user, token });
  }
});

router.get("/pacientes", PacienteController.index);
router.post("/pacientes", PacienteController.create);
router.delete("/pacientes/:id", PacienteController.delete);
router.put("/pacientes/:id", PacienteController.put);
router.get("/user", UserController.index);

router.get("/suspeitos", SuspeitosController.index);
router.post("/suspeitos", SuspeitosController.put);
router.get("/quarentena", QuarentenaController.index);
router.post("/quarentena", QuarentenaController.put);
router.get("/viagens/:id?", ViagemController.index);
router.post("/viagens", ViagemController.create);
router.post("/boletim", BoletimController.put);
router.get("/cadastro_paciente", function (req, res) {
  msg = [];
  const token = req.hash;
  msg.push({ texto: "" });
  res.render("cadastroPaciente.ejs", { token });
});
router.get("/main:id?", async function (req, res) {
  msg = [];
  const token = req.hash;
  console.log(token);
  msg.push({ texto: "" });
  var id = req.userId;
  if (req.userId) {
    res.render("Main.ejs", { token, id });
  } else {
    id = req.query.id;
    res.render("Main.ejs", { token, id });
  }
});

module.exports = (app) => app.use("/", router);
