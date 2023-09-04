import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerOptions";
import authRoutes from "./routes/auth";
import productsRoutes from "./routes/products";
import { createFeatureCategories } from "./db/createFeatureCategories";
import { createProductStatuses } from "./db/createProductStatuses";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error  connecting to MongoDB:", error);
  });

createFeatureCategories();
createProductStatuses();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${PORT}`);
});
