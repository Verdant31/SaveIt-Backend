import { RequestHandler } from 'express';
import { client } from '../../prisma/client';
import { convertDate } from '../utils/convertDate';

export const createPurchase: RequestHandler = async (req, res) => {
  const { name, price, userId } = req.body;
  try { 
    let purchase = await client.purchase.create({
      data: {
        item: name,
        price,
        userId,
        date: convertDate(new Date())
      }
    })
    res.status(200).json({message: "Compra adicionada com êxito!", purchase})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar cadastrar sua compra, tente novamente mais tarde.'})
  }
}
export const getPurchases: RequestHandler = async (req, res) => {
  const { userId } = req.body;
  try {
    const items = await client.purchase.findMany({
      where: {userId},
      orderBy: {date: 'desc'},
    })
    res.status(200).json({message: "Lista buscada com sucesso.", items: items})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar buscar sua lista, tente novamente mais tarde.'})
  }
}
