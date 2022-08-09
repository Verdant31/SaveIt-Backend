"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _bcryptjs = require('bcryptjs');
var _jsonwebtoken = require('jsonwebtoken');
var _client = require('../../prisma/client');



 const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userAlreadyExists = await _client.client.user.findFirst({
      where: {email}
    })
    if (userAlreadyExists) {
      return res.status(400).json({message: 'Email já cadastrado no sistema.'})
    }
    const passwordHash = await _bcryptjs.hash.call(void 0, password, 8);
    await _client.client.user.create({
      data: {
        email,
        password: passwordHash,
      }
    })
    res.status(200).json({message: "Seu usuário foi criado e você já pode logar na aplicação."})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar criar seu usuário, tente novamente mais tarde.'})
  }
}; exports.createUser = createUser

 const autenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userAlreadyExists = await _client.client.user.findFirst({
      where: {email}
    })
    if (!userAlreadyExists) {
      return res.status(400).json({message: 'Usuário ou senha incorretos.'})
    }
    const passwordMatches = await _bcryptjs.compare.call(void 0, password, userAlreadyExists.password);

    if(!passwordMatches) {
      return res.status(400).json({message: 'Usuário ou senha incorretos.'})
    }
    const token = _jsonwebtoken.sign.call(void 0, {userId: userAlreadyExists.id}, `${process.env.SECRET_TOKEN}`, {expiresIn: '1y'});

    const items = await _client.client.purchase.findMany({
      where: {userId: userAlreadyExists.id},
      orderBy: {date: 'desc'},
    })

    res.status(200).json({token, user: userAlreadyExists, purchaseHistory: items})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar logar, tente novamente mais tarde.'})
  }
}; exports.autenticateUser = autenticateUser

 const editBalance = async (req, res) => {
  const {  newBalance, userId } = req.body;
  try { 
    await _client.client.user.update({
      data: {
        balance: newBalance,
      },
      where: {id: userId}
    })
    res.status(200).json({message: "Saldo atualizado com sucesso!"})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar atualizar seu saldo, tente novamente mais tarde.'})
  }
}; exports.editBalance = editBalance


 const validateUserToken = async (req, res) => {
  const { token } = req.body;
  try { 
    const decoded = _jsonwebtoken.verify.call(void 0, token, `${process.env.SECRET_TOKEN}`);
    if(!decoded) {
      return res.status(401).json({ message: "Token expirado, realize um novo login." });
    }
    const userId = (decoded ).userId;
    const user = await _client.client.user.findFirst({where: {id: userId}});
    const newToken = _jsonwebtoken.sign.call(void 0, {userId}, `${process.env.SECRET_TOKEN}`, {expiresIn: '1y'});

    const items = await _client.client.purchase.findMany({
      where: {userId},
      orderBy: {date: 'desc'},
    })
    res.status(200).json({message: "Informações devolvidas com sucesso.", user, newToken, items})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar atualizar seu usuario, tente novamente mais tarde.'})
  }
}; exports.validateUserToken = validateUserToken

 const setRunToFalse = async (req, res) => {
  const { userId } = req.body;
  try { 
    await _client.client.user.update({
      data: {
        isFirstRun: false,
      },
      where: {id: userId}
    })
    res.status(200).json({message: "User atualizado com sucesso!"})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar atualizar seu usuario, tente novamente mais tarde.'})
  }
}; exports.setRunToFalse = setRunToFalse