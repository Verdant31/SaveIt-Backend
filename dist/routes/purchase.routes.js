"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _express = require('express');
var _PurchaseController = require('../controllers/PurchaseController'); var purchaseController = _interopRequireWildcard(_PurchaseController);
var _authentication = require('../middlewares/authentication');

const purchaseRoutes = _express.Router.call(void 0, );

purchaseRoutes.post('/create', _authentication.authenticate, purchaseController.createPurchase);
purchaseRoutes.post('/list', purchaseController.getPurchases);

exports. default = purchaseRoutes;