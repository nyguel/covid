const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  var authHeaders = req.body.confirmados;
  console.log(authHeaders);
  if (!authHeaders) {
    return res.status(401).send({ error: "Sem token fornecido" });
  }
  jwt.verify(authHeaders, authConfig.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ error: "Token inválido" });
    } else {
      req.userId = decoded.id;
      req.hash = authHeaders;
      return next();
    }
  });
};
