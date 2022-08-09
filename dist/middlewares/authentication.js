"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _jsonwebtoken = require('jsonwebtoken');

 const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = authorization.split(" ");
  try {
    _jsonwebtoken.verify.call(void 0, token, `${process.env.SECRET_TOKEN}`)
    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma." });
  }
}; exports.authenticate = authenticate