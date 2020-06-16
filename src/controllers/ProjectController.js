const express = require("express");
const PacienteController = require("./PacienteController");
const Paciente = require("../models/paciente");
const BoletimController = require("./BoletimController");
const ViagemController = require("./ViagemController");
const router = express.Router();
const authMiddleware = require("../midlewares/auth");
const { Router } = require("express");
const User = require("../models/user");
const SuspeitosController = require("./SuspeitosController");
const QuarentenaController = require("./QuarentenaController");
const UserController = require("./UserController");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
//router.use(authMiddleware);
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
router.get("/excluir_paciente", PacienteController.delete);
router.post("/atualizar_paciente", PacienteController.put);
router.get("/usuarios", UserController.index);
router.get("/usuarios/:id", UserController.delete);
router.post("/usuarios", UserController.put);
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

router.get("/cadastro_usuario", function (req, res) {
  msg = [];

  const token = req.hash;

  msg.push({ texto: "" });
  res.render("cadastroUsuario.ejs", { token });
});
router.get("/main", async function (req, res) {
  const token = req.hash;
  const privilegio = "admin";
  const pacientes = await Paciente.find();
  res.render("Main.ejs", { pacientes, token, privilegio });
});
router.post("/pdf", async function (req, res) {
  const token = req.hash;
  const privilegio = "admin";
  const pacientes = await Paciente.find();
  ejs.renderFile(
    path.join(__dirname, "../../Views/pdfFile.ejs"),
    { pacientes, token, privilegio },
    (err, html) => {
      if (err) {
        console.log(err);
      } else {
        pdf.create(html, {}).toFile("./pdfname.pdf", function (err, res) {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  );
});

module.exports = (app) => app.use("/", router);
