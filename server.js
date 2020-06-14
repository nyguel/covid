const express = require("express");
const authMiddleware = require("./src/midlewares/auth");

const usersRouter = require("./src/controllers/authController");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.listen(3333);
require("./src/controllers/authController")(app);
require("./src/controllers/ProjectController")(app);
