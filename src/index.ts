import express, { Application } from 'express';
import Router from './routes/userroute';
import connectToDatabase from './config/dbconnection';
import cors from 'cors'
import { config } from 'dotenv';

config();

const app: Application = express();
const port: string | number = process.env.PORT || '';

app.use(cors())

app.use(express.json());
connectToDatabase();
app.use(Router);

app.listen(port, () => console.log(`your app is listening on ${port}`));

