import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './routes/users.routes';
import itemRoutes from './routes/item.routes';
import purchaseRoutes from './routes/purchase.routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', usersRoutes);
app.use('/item', itemRoutes);
app.use('/purchase', purchaseRoutes);


app.listen(process.env.PORT || 8080, () => console.log(`Server running on ${process.env.PORT}`));
