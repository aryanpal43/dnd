import { Category } from "../models/Category.model.js";

export const addNewCategory = async (req, res, next) => {
  const { name, imgUrl } = req.body;
  if (!name) {
    res.status(400);
    return next(new Error("Category name is required"));
  }

  try {
    const newCategory = await Category.create({ name, imgUrl });

    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("products");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};
