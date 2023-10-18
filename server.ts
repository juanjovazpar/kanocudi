import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

import apiRoutes from './api/routes/api';
import db from './api/db/conn';

dotenv.config();

const API_URL = process.env.API_URL || 'http://localhost';
const PORT = process.env.API_PORT || 8080;
const app = express();

db.connect();

app.use(cors()); // TODO: Adjust policy with environment

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡[Kanocudi]: Kanocudi is running at ${API_URL}:${PORT}`);
});