const passport = require("passport");
const express = require("express");
const knex = require("../database/connection");

module.exports = {
  showpage(request, response) {
    return response.render("login");
  },
  async index(request, response) {
    app.post("/login", passport.authenticate("local"), (request, response) => {
      return response.render("cadastroPaciente");
    });

    var erros = [];
    erros.push({ texto: "Usuário ou Senha incorretos" });
    return response.render("login", { erros: erros });
    // }
  },
};
