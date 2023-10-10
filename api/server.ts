import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';

import { createInitialFeatureCategories } from './db/createFeatureCategories';
import { createInitialProductStatuses } from './db/createProductStatuses';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    createInitialFeatureCategories();
    createInitialProductStatuses();

    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error  connecting to MongoDB:', error);
  });

app.use(express.static(path.join(__dirname, '..')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`⚡[API]: API is running at http://localhost:${PORT}`);
});
