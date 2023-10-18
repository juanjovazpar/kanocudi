import mongoose from 'mongoose';
import { createInitialFeatureCategories } from './createFeatureCategories';
import { createInitialProductStatuses } from './createProductStatuses';

const db = {
  connect: () => {
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
        console.error('Error connecting to MongoDB:', error);
      });
  },
};

export default db;
