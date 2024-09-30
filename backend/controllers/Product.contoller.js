import { Category } from "../models/Category.model.js";
import { Product } from "../models/Product.model.js";

export const AddNewProduct = async (req, res, next) => {
  const { imgUrl, name, price, categoryId, stock, desc } = req.body;
  if (!imgUrl || !name || !price || !categoryId) {
    res.status(400);
    return next(new Error("imgUrl is required"));
  }
  try {
    const product = await Product.create({
      imgUrl,
      name,
      price,
      category: categoryId,
      stock,
      desc,
    });

    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404);
      return next(new Error("Category not found"));
    }

    category.products.push(product._id);
    await category.save();

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    ); // Populate category name
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTotalStockRate = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    let totalStockValue = 0;

    products.forEach((product) => {
      const { price, stock } = product;
      const totalProductStock =
        stock.xs + stock.s + stock.m + stock.l + stock.xl + stock.xxl; // Sum of all sizes
      totalStockValue += totalProductStock * price; // Calculate the total stock value for each product
    });

    res.json({
      success: true,
      totalStockValue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const updateStock = async (req, res) => {
  const { productId, stockUpdate } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update stock based on the provided size quantities
    for (let size in stockUpdate) {
      product.stock[size] += stockUpdate[size];
    }

    await product.save();

    res.json({
      success: true,
      message: "Stock updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
