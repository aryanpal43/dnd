import express from "express";
import {
  AddNewProduct,
  getAllProducts,
  getSingleProduct,
  updateStock 
} from "../controllers/Product.contoller.js";

const router = express.Router();

router.post("/", AddNewProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/update-stock", updateStock);

export default router;
