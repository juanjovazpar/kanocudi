import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { createInitialFeatureCategories } from "./db/createFeatureCategories";
import { createInitialProductStatuses } from "./db/createProductStatuses";
import swaggerSpec from "./utils/swaggerDoc";
import authRoutes from "./routes/auth";
import productsRoutes from "./routes/products";
import healthCheckRoutes from "./routes/healthCheck";

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

    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error  connecting to MongoDB:", error);
  });

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/* app.get("/docs.json", (_: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
}); */

app.use("/healthcheck", healthCheckRoutes);
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`⚡[API]: API is running at http://localhost:${PORT}`);
});
