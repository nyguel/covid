const express = require("express");
const PacienteController = require("./controllers/PacienteController");
const ProfissionalController = require("./controllers/ProfissionalController");
const SintomaController = require("./controllers/SintomaController");
const SintomaPacienteController = require("./controllers/SintomaPacienteController");
const ViagemPacienteController = require("./controllers/ViagemPacienteController");
const ViagemController = require("./controllers/ViagemController");
const LoginController = require("./controllers/LoginController");
const routes = express.Router();
const passport = require("passport");

module.exports = function (app, passport) {
  app.get("/viagens/:id?", ViagemController.index);
  app.post("/viagens", ViagemController.create);
  app.get("/cadastro_profissional", (request, response) => {
    msg = [];
    msg.push({ texto: "" });
    response.render("cadastroProfissional.ejs");
  });
  app.get("/profissionais", ProfissionalController.index);
  app.post("/profissionais", ProfissionalController.create);
  app.get("/pacientes", PacienteController.index);
  app.post("/pacientes", PacienteController.create);
  app.get("/cadastro_paciente", function (req, res) {
    msg = [];
    msg.push({ texto: "" });
    res.render("cadastroPaciente.ejs");
  });

  app.get("/", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/cadastro_paciente",
      failureRedirect: "/login",
      failureFlash: true,
    }),
    function (req, res) {
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  );

  app.get("/registrar", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/registrar",
      failureFlash: true,
    })
  );

  app.get("/profile", isLoggedIn, function (req, res) {
    res.render("profile.ejs", {
      user: req.user,
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}

module.exports = (app) => app.use("/auth", router);
