import express from "express";
import { Cart } from "../models/cart.model.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Fetch Cart
router.get("/", verifyToken, async (req, res) => {
  try {
    // Fetch the cart without needing to populate the product details
    const cart = await Cart.findOne({ userId: req.userId });

    if (cart) {
      console.log(cart);
      res.status(200).json(cart); // Send the cart with full product details already stored
    } else {
      res.status(200).json({ products: [] }); // Return an empty cart if none exists
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
});

// Save or update the cart
// Ensure this route is saving products correctly in the cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const { products } = req.body;

    if (
      !products ||
      products.some(
        (product) => !product.productId || !product.name || !product.price
      )
    ) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    // Perform an atomic update using findOneAndUpdate
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.userId }, // Find the cart by userId
      { $set: { products: products } }, // Update the products array
      { new: true, upsert: true } // Return the updated document and create if not exists
    );

    console.log("Cart updated successfully:", updatedCart);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Failed to update cart", error });
  }
});

export default router;
