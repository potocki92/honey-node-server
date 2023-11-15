import express, { Application } from "express";
import cors from "cors";
import { json } from "body-parser";
import { productRouter } from "./routes/products.routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const app: Application = express();
app.use(json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);
mongoose.connection.on("error", (error: any) => {
  console.error("Database connection error:", error);
  process.exit(1);
});
mongoose.connection.once("open", () => {
  console.log("Database connection successful");
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Honey API Documentation",
      description: "Honey API Documentation",
      contact: {
        name: "Mateusz Potocki",
      },
      version: "1.0.0",
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/*.ts"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/products", productRouter);

export default app;
