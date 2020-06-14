const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  var authHeaders = req.query.token;
  if (!authHeaders) {
    authHeaders = req.body.token;
  }
  if (!authHeaders) {
    return res.status(401).send({ error: "Sem token fornecido" });
  }
  jwt.verify(authHeaders, authConfig.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ error: "Token inválido" });
    }
    req.userId = decoded.id;
    req.hash = authHeaders;
    return next();
  });
};
