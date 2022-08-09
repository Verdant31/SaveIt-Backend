import { RequestHandler } from 'express';
import { client } from '../prisma';

export const editUserItemsList: RequestHandler = async (req, res) => {
  const { items, userId } = req.body;
  try {
    await client.user.update({
      data: {
        mostPurchasedItems: items
      }, where: {id: userId}
   })    
    res.status(200).json({message: "Lista editada com sucesso."})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar editar sua lista, tente novamente mais tarde.'})
  }
}

export const getUserList: RequestHandler = async (req, res) => {
  const { userId } = req.body;
  try {
    const items = await client.user.findFirst(({where: {id: userId}}))
    res.status(200).json({message: "Lista buscada com sucesso."})
  }catch(err) {
    console.log(err)
    res.status(500).json({message: 'Houve um erro ao tentar buscar sua lista, tente novamente mais tarde.'})
  }
}
