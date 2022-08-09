"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _express = require('express');
var _UserController = require('../controllers/UserController'); var userController = _interopRequireWildcard(_UserController);
var _authentication = require('../middlewares/authentication');

const usersRoutes = _express.Router.call(void 0, );

usersRoutes.post('/create', userController.createUser);
usersRoutes.post('/autenticate', userController.autenticateUser);
usersRoutes.put('/editBalance', _authentication.authenticate,  userController.editBalance);
usersRoutes.put('/setRunToFalse', _authentication.authenticate,  userController.setRunToFalse);
usersRoutes.post('/validateToken',  userController.validateUserToken);

exports. default = usersRoutes;