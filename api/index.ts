import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { createInitialFeatureCategories } from "./db/createFeatureCategories";
import { createInitialProductStatuses } from "./db/createProductStatuses";
import swaggerSpec from "./utils/swaggerDoc";
import healthcheckRoutes from "./routes/healthcheck";
import authRoutes from "./routes/auth";
import productsRoutes from "./routes/products";
import { authTokenMiddleware } from "./middlewares/authToken";
import { isVerifyMiddleware } from "./middlewares/isVerifiy";

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

app.use(morgan(process.env.MORGAN_MODE || "dev")); // TODO: "dev" | "combined" | "common"

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/healthcheck", healthcheckRoutes);
app.use("/auth", authRoutes);
app.use("/products", authTokenMiddleware, isVerifyMiddleware, productsRoutes);

const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`⚡[API]: API is running at http://localhost:${PORT}`);
});
