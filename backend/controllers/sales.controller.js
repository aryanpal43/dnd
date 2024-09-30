import { Sale } from "../models/sales.model.js";
import { Product } from "../models/Product.model.js";

export const createSale = async (req, res) => {
  const { productId, quantitySold, price } = req.body;

  try {
    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update stock
    for (let size in quantitySold) {
      if (product.stock[size] < quantitySold[size]) {
        return res.status(400).json({ message: `Not enough stock for size ${size}` });
      }
      product.stock[size] -= quantitySold[size]; // Deduct from stock
    }
    await product.save(); // Save updated stock

    // Record sale
    const sale = await Sale.create({
      product: productId,
      quantity: quantitySold,
      price,
    });

    res.status(201).json({
      success: true,
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const sales = await Sale.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate("product", "name");

    if (!sales.length) {
      return res.status(404).json({ message: "No sales found in the specified date range" });
    }

    res.json({
      success: true,
      sales,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
