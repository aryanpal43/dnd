import { User } from "../models/user.model.js";
import { Product } from "../models/Product.model.js";

// Get the current user's cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get cart", error });
  }
};

// Add an item to the cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity += quantity; // Update quantity if product already in cart
    } else {
      user.cart.push({ product: productId, quantity }); // Add new item to cart
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add to cart", error });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    cartItem.quantity = quantity; // Update quantity
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Cart updated", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update cart", error });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove from cart", error });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.cart = []; // Clear the cart
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Cart cleared", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to clear cart", error });
  }
};
