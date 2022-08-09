import { Router } from 'express';
import * as purchaseController from '../controllers/PurchaseController';
import { authenticate } from '../middlewares/authentication';

const purchaseRoutes = Router();

purchaseRoutes.post('/create', authenticate, purchaseController.createPurchase);
purchaseRoutes.post('/list', purchaseController.getPurchases);

export default purchaseRoutes;