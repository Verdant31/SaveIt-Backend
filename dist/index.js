"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _usersroutes = require('./routes/users.routes'); var _usersroutes2 = _interopRequireDefault(_usersroutes);
var _itemroutes = require('./routes/item.routes'); var _itemroutes2 = _interopRequireDefault(_itemroutes);
var _purchaseroutes = require('./routes/purchase.routes'); var _purchaseroutes2 = _interopRequireDefault(_purchaseroutes);

_dotenv2.default.config();
const app = _express2.default.call(void 0, );
app.use(_cors2.default.call(void 0, ));
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());

app.use('/user', _usersroutes2.default);
app.use('/item', _itemroutes2.default);
app.use('/purchase', _purchaseroutes2.default);


app.listen(process.env.PORT || 8080, () => console.log(`Server running on ${process.env.PORT}`));
