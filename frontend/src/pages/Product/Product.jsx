import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartReducer";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Product = () => {
  const [size, setSize] = useState("");
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.products);

  const syncCartWithBackend = async (cartItems) => {
    try {
      console.log("Syncing cart with backend:", cartItems); // Log what is being sent
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`,
        { products: cartItems }, // Send the products array to the backend
        { withCredentials: true }
      );
      console.log("Cart synced to backend:", response.data);
    } catch (error) {
      console.error("Error syncing cart to backend:", error);
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      console.log("Syncing cart with backend", cartItems);
      syncCartWithBackend(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_BASEURL
          }/api/products/${productId}`
        );
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        const stockEntries = Object.entries(fetchedProduct.stock);
        const firstNonZeroStock = stockEntries.find(
          ([key, value]) => value > 0
        );

        if (firstNonZeroStock) {
          const [firstNonZeroKey] = firstNonZeroStock;
          setSize(firstNonZeroKey);
        } else {
          console.log("No non-zero stock found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Add dependencies like productId if needed

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const changeSizeHandler = (e) => {
    setSize(e.target.value);
  };

  return (
    <div className="pt-16 md:pt-32 max-w-[1300px] mx-auto ">
      <div className="flex flex-col md:grid md:grid-cols-8 md:gap-4">
        <div className="hidden h-full w-full  col-span-1 md:flex flex-col gap-2">
          <div className="relative hover: h-[135px] w-[105px] ">
            <img
              src={product.imgUrl}
              className="rounded-md w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="relative hover: h-[135px] w-[105px] ">
            <img
              src={product.imgUrl}
              className="rounded-md w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="relative hover: h-[135px] w-[105px] ">
            <img
              src={product.imgUrl}
              className="rounded-md w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-10 md:col-span-7">
          <div className="relative md:h-[450px] md:w-[350px] ">
            <img
              src={product.imgUrl}
              className="md:rounded-md w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="mx-6  flex flex-col">
            <h1 className="text-xl md:text-3xl font-semibold tracking-wide leading-tight">
              {product.name}
            </h1>

            <p className="text-base md:text-lg text-stone-800 ">
              <span className="text-muted-foreground">Category: </span>
              <span className="font-semibold">{product.category.name}</span>
            </p>
            <Separator className="my-2 md:my-4 " />
            <p className="text-pink-500 font-[500] text-xl md:text-2xl">
              ₹{product.price}
            </p>
            <p className="text-xs mb-2 md:mb-4 text-gray-500">
              MRP incl. of all taxes
            </p>
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
                Select a Size:
              </h2>
              <div className={`flex flex-row gap-2 md:gap-3 mb-1`}>
                {Object.entries(product.stock).map(([key, value]) => (
                  <button
                    key={key}
                    className={`uppercase text-lg md:text-xl bg-gray-100 p-2 h-8 w-8 md:h-10 md:w-10 flex items-center justify-center ${
                      value === 0
                        ? "text-muted-foreground opacity-50 cursor-not-allowed"
                        : "text-black"
                    } ${
                      size === key
                        ? "text-pink-500 border-pink-500 border-[1px] md:border-2"
                        : ""
                    }`}
                    disabled={value === 0}
                    onClick={(e) => changeSizeHandler(e)}
                    value={key}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 md:mb-2">
              Quantity:
            </h2>
            <div className="mt-2 flex gap-3">
              <div className="flex gap-2 items-center">
                <Button
                  variant="ghost"
                  className="bg-gray-100 text-base md:text-lg text-muted-foreground flex items-center justify-center"
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  <FaMinus />
                </Button>
                <p className="text-2xl">{quantity}</p>
                <Button
                  variant="ghost"
                  className="bg-gray-100 text-base md:text-lg text-muted-foreground"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <FaPlus />
                </Button>
              </div>
              <Button
                className="text-xl bg-pink-500 rounded-none"
                onClick={() => {
                  // Define the new item being added to the cart
                  const newItem = {
                    id: product._id + size,
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    imgUrl: product.imgUrl,
                    category: product.category.name,
                    quantity,
                    size: size,
                  };

                  // Dispatch the action to add the product to the Redux cart
                  dispatch(addToCart(newItem));

                  // Sync the cart with the backend immediately with the updated cartItems
                  syncCartWithBackend([...cartItems, newItem]);

                  // Reset the quantity
                  setQuantity(1);

                  // Show a toast notification
                  toast("Item added to cart", {
                    description: `${product.name} X ${quantity}`,
                    action: {
                      label: "Go to Cart",
                      onClick: () => navigate("/cart"),
                    },
                  });
                }}
              >
                Add to Cart
              </Button>
            </div>
            <Button className="w-[280px] text-xl mt-5 rounded-none">
              Wishlist
            </Button>
            <Separator className="my-2 md:my-4 " />
            <div className="mt-2 gap-1 flex flex-col">
              <p>100% Original Products</p>
              <p>Pay on delivery might be available</p>
              <p>Easy 14 days returns and exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
