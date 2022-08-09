import { RequestHandler } from 'express';
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient();
export const createUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userAlreadyExists = await client.user.findFirst({
      where: {email}
    })
    if (userAlreadyExists) {
      return res.status(400).json({message: 'Email já cadastrado no sistema.'})
    }
    const passwordHash = await hash(password, 8);
    await client.user.create({
      data: {
        email,
        password: passwordHash,
      }
    })
    res.status(200).json({message: "Seu usuário foi criado e você já pode logar na aplicação."})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar criar seu usuário, tente novamente mais tarde.'})
  }
}

export const autenticateUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userAlreadyExists = await client.user.findFirst({
      where: {email}
    })
    if (!userAlreadyExists) {
      return res.status(400).json({message: 'Usuário ou senha incorretos.'})
    }
    const passwordMatches = await compare(password, userAlreadyExists.password);

    if(!passwordMatches) {
      return res.status(400).json({message: 'Usuário ou senha incorretos.'})
    }
    const token = sign({userId: userAlreadyExists.id}, `${process.env.SECRET_TOKEN}`, {expiresIn: '1y'});

    const items = await client.purchase.findMany({
      where: {userId: userAlreadyExists.id},
      orderBy: {date: 'desc'},
    })

    res.status(200).json({token, user: userAlreadyExists, purchaseHistory: items})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar logar, tente novamente mais tarde.'})
  }
}

export const editBalance: RequestHandler = async (req, res) => {
  const {  newBalance, userId } = req.body;
  try { 
    await client.user.update({
      data: {
        balance: newBalance,
      },
      where: {id: userId}
    })
    res.status(200).json({message: "Saldo atualizado com sucesso!"})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar atualizar seu saldo, tente novamente mais tarde.'})
  }
}


export const validateUserToken: RequestHandler = async (req, res) => {
  const { token } = req.body;
  try { 
    const decoded = verify(token, `${process.env.SECRET_TOKEN}`);
    if(!decoded) {
      return res.status(401).json({ message: "Token expirado, realize um novo login." });
    }
    const userId = (decoded as any).userId;
    const user = await client.user.findFirst({where: {id: userId}});
    const newToken = sign({userId}, `${process.env.SECRET_TOKEN}`, {expiresIn: '1y'});

    const items = await client.purchase.findMany({
      where: {userId},
      orderBy: {date: 'desc'},
    })
    console.log('Token' + decoded)
    console.log('UserId' + userId)
    console.log('user' + user)
    console.log('Items' + items)
    res.status(200).json({message: "Informações devolvidas com sucesso.", user, newToken, items})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar atualizar seu usuario, tente novamente mais tarde.'})
  }
}

export const setRunToFalse: RequestHandler = async (req, res) => {
  const { userId } = req.body;
  try { 
    await client.user.update({
      data: {
        isFirstRun: false,
      },
      where: {id: userId}
    })
    res.status(200).json({message: "User atualizado com sucesso!"})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar atualizar seu usuario, tente novamente mais tarde.'})
  }
}