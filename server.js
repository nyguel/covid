const express = require("express");
var jwt = require("jwt-simple");
const authMiddleware = require("./src/midlewares/auth");

const usersRouter = require("./src/controllers/authController");
const app = express();
app.set("jwtTokenSecret", "andressa");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.listen(3333);
require("./src/controllers/authController")(app);
require("./src/controllers/ProjectController")(app);
