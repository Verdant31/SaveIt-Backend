"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _prisma = require('../prisma');

 const editUserItemsList = async (req, res) => {
  const { items, userId } = req.body;
  try {
    await _prisma.client.user.update({
      data: {
        mostPurchasedItems: items
      }, where: {id: userId}
   })    
    res.status(200).json({message: "Lista editada com sucesso."})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar editar sua lista, tente novamente mais tarde.'})
  }
}; exports.editUserItemsList = editUserItemsList

 const getUserList = async (req, res) => {
  const { userId } = req.body;
  try {
    const items = await _prisma.client.user.findFirst(({where: {id: userId}}))
    res.status(200).json({message: "Lista buscada com sucesso."})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar buscar sua lista, tente novamente mais tarde.'})
  }
}; exports.getUserList = getUserList
