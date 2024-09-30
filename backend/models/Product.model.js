import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    stock: {
      xs: { type: Number, required: true },
      s: { type: Number, required: true },
      m: { type: Number, required: true },
      l: { type: Number, required: true },
      xl: { type: Number, required: true },
      xxl: { type: Number, required: true },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
