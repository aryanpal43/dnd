import express from "express";
import {
  addNewCategory,
  getAllCategories,
} from "../controllers/Category.controller.js";

const router = express.Router();

router.post("/", addNewCategory);
router.get("/", getAllCategories);

export default router;
