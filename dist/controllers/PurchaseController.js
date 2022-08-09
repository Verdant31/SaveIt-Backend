"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _prisma = require('../prisma');
var _convertDate = require('../utils/convertDate');

 const createPurchase = async (req, res) => {
  const { name, price, userId } = req.body;
  try { 
    let purchase = await _prisma.client.purchase.create({
      data: {
        item: name,
        price,
        userId,
        date: _convertDate.convertDate.call(void 0, new Date())
      }
    })
    res.status(200).json({message: "Compra adicionada com êxito!", purchase})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar cadastrar sua compra, tente novamente mais tarde.'})
  }
}; exports.createPurchase = createPurchase
 const getPurchases = async (req, res) => {
  const { userId } = req.body;
  try {
    const items = await _prisma.client.purchase.findMany({
      where: {userId},
      orderBy: {date: 'desc'},
    })
    res.status(200).json({message: "Lista buscada com sucesso.", items: items})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar buscar sua lista, tente novamente mais tarde.'})
  }
}; exports.getPurchases = getPurchases
