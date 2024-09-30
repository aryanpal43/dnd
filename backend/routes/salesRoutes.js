import express from "express";
import { createSale, getSalesReport } from "../controllers/sales.controller.js";

const router = express.Router();

// Record a new sale
router.post("/sales", createSale);

// Get sales report between two dates
router.get("/sales-report", getSalesReport);

export default router;
