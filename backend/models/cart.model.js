import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Keep this for tracking the original product ID

      name: { type: String, required: true }, // Store the product name
      price: { type: Number, required: true }, // Store the product price
      imgUrl: { type: String, required: true }, // Store the product image URL
      category: { type: String, required: true }, // Store the product category
      quantity: { type: Number, required: true }, // Store the product quantity
      size: { type: String, required: true }, // Store the product quantity
    },
  ],
});

export const Cart = mongoose.model("Cart", cartSchema);
