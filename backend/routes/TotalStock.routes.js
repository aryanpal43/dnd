import express from "express";
import {
  getTotalStockRate,
} from "../controllers/Product.contoller.js";

const router = express.Router();

router.get("/getTotalStockRate",getTotalStockRate);


export default router;
