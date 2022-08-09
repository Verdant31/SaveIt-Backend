import { Router } from 'express';
import * as userController from '../controllers/UserController';
import { authenticate } from '../middlewares/authentication';

const usersRoutes = Router();

usersRoutes.post('/create', userController.createUser);
usersRoutes.post('/autenticate', userController.autenticateUser);
usersRoutes.put('/editBalance', authenticate,  userController.editBalance);
usersRoutes.put('/setRunToFalse', authenticate,  userController.setRunToFalse);
usersRoutes.post('/validateToken',  userController.validateUserToken);

export default usersRoutes;