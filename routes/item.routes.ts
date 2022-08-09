import { Router } from 'express';
import * as ItemController from '../controllers/ItemController';
import { authenticate } from '../middlewares/authentication';

const itemRoutes = Router();

itemRoutes.put('/editList', authenticate, ItemController.editUserItemsList);

export default itemRoutes;