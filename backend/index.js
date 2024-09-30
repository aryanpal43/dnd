import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import { errorHandler } from "./middlewares/error.js";
import productRoutes from "./routes/Product.routes.js";
import categoryRoutes from "./routes/Category.routes.js";
import Totalstock from "./routes/TotalStock.routes.js";
import salesRoutes from "./routes/salesRoutes.js";
import cartRoutes from "./routes/cart.routes.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5000",
    "http://localhost:5174",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/TotalStock", Totalstock);
app.use("/api/sales", salesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.post("/api/sign-upload", (req, res, next) => {
  const { folder } = req.body;
  if (!folder) {
    res.status(400);
    return next(new Error("folder name is required"));
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET
    );
    res.status(200).json({ timestamp, signature });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
});

app.use(errorHandler);

app.listen(5000, () => {
  connectDB();
  console.log("Server running");
});
