import { Separator } from "@/components/ui/separator";

import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from "axios";
import {
  AddItemCart,
  removeItem,
  RemoveItemCart,
  resetCart,
} from "@/redux/cartReducer";
import { useEffect } from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.products);

  const syncCartWithBackend = async (cartItems) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`,
        { products: cartItems }, // Send the products array to the backend
        { withCredentials: true } // Include credentials for authentication
      );
      console.log("Cart synced to backend:", response.data);
    } catch (error) {
      console.error("Error syncing cart to backend:", error);
    }
  };
  useEffect(() => {
    console.log("Syncing cart with backend", cartItems);
    syncCartWithBackend(cartItems);
  }, [cartItems]);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  return (
    <div className="pt-20">
      <div className="max-w-[1250px] mx-auto">
        <h1 className="font-semibold md:font-bold text-3xl mt-10 uppercase text-gray-700">
          Shopping bag
        </h1>
        <Separator className="my-4 mt-20 hidden lg:block" />
        <div className="hidden lg:grid grid-cols-6">
          <h2 className="text-lg text-muted-foreground uppercase font-semibold">
            Product
          </h2>
          <h2 className="text-lg text-muted-foreground uppercase font-semibold col-span-2">
            Name
          </h2>
          <h2 className="text-lg text-muted-foreground uppercase font-semibold">
            Unit Price
          </h2>
          <h2 className="text-lg text-muted-foreground uppercase font-semibold">
            Quantity
          </h2>
          <h2 className="text-lg text-muted-foreground uppercase font-semibold">
            Total
          </h2>
        </div>
        <Separator className="my-4 " />
        {products.map((product) => (
          <div key={product.id + product.size} className="hidden lg:block">
            <div className="grid  grid-cols-6 ">
              <div className="h-[180px] w-[140px]">
                <img
                  src={product.imgUrl}
                  className="w-full h-full object-cover "
                />
              </div>

              <div className="col-span-2 flex flex-col justify-center ">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-lg">Category: {product.category}</p>
                <p className="text-lg">
                  Size: <span className="uppercase">{product.size}</span>
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xl font-semibold">₹{product.price}</p>
              </div>
              <div className="flex flex-row items-center">
                <Button
                  variant="ghost"
                  className=" hover:bg-transparent hover:text-pink-400 flex items-center justify-center"
                  onClick={() => {
                    dispatch(
                      RemoveItemCart({
                        id: product.id,
                      })
                    );

                    // Sync cart with backend after removing an item
                    syncCartWithBackend([...products]);
                  }}
                >
                  <FaMinus />
                </Button>
                <p className="text-2xl">{product.quantity}</p>
                <Button
                  variant="ghost"
                  className=" hover:bg-transparent hover:text-pink-400"
                  onClick={() => {
                    dispatch(
                      AddItemCart({
                        id: product.id,
                      })
                    );

                    syncCartWithBackend([...products]);
                  }}
                >
                  <FaPlus />
                </Button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <p className="text-xl font-semibold">
                  ₹{product.price * product.quantity}
                </p>
                <button>
                  <FaRegTrashCan
                    className="h-6 w-6 text-destructive"
                    onClick={() => {
                      dispatch(
                        removeItem({
                          id: product.id,
                        })
                      );

                      // Sync cart with backend after deleting an item
                      syncCartWithBackend([...products]);
                    }}
                  />
                </button>
              </div>
            </div>
            <Separator className="my-4 " />
          </div>
        ))}
        {products.map((product) => (
          <div key={product.id + product.size} className="lg:hidden">
            <div className="grid grid-cols-3 my-4 gap-6">
              <div className="col-span-1 h-[150px]">
                <img
                  src={product.imgUrl}
                  className="w-full h-full object-cover ml-3"
                />
              </div>
              <div className="col-span-2">
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-lg">Category: {product.category}</p>
                  <p className="text-gray-600 text-base">
                    Size: <span className="uppercase">{product.size}</span>
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-base font-semibold">₹{product.price}</p>
                    <div className="flex flex-row items-center">
                      <Button
                        variant="ghost"
                        className="text-xs hover:bg-transparent hover:text-pink-400 flex items-center justify-center"
                        onClick={() => {
                          dispatch(
                            RemoveItemCart({
                              id: product.id,
                            })
                          );

                          // Sync cart with backend after removing an item
                          syncCartWithBackend([...products]);
                        }}
                      >
                        <FaMinus />
                      </Button>
                      <p className="text-lg">{product.quantity}</p>
                      <Button
                        variant="ghost"
                        className="text-xs hover:bg-transparent hover:text-pink-400"
                        onClick={() => {
                          dispatch(
                            AddItemCart({
                              id: product.id,
                            })
                          );

                          // Sync cart with backend after removing an item
                          syncCartWithBackend([...products]);
                        }}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-base font-semibold">
                      Total Price: ₹{product.price * product.quantity}
                    </p>
                    <button>
                      <FaRegTrashCan
                        className="h-4 w-4 text-destructive mr-6"
                        onClick={() => {
                          dispatch(
                            removeItem({
                              id: product.id,
                            })
                          );

                          // Sync cart with backend after deleting an item
                          syncCartWithBackend([...products]);
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4 " />
          </div>
        ))}
        <div className="flex justify-between mb-10">
          <Button
            className="rounded-none text-md leading-tight p-2 px-4 uppercase"
            onClick={() => {
              dispatch(resetCart());
              syncCartWithBackend([...products]);
            }}
          >
            Reset Cart
          </Button>
          <Button className="rounded-none text-md leading-tight bg-pink-500 hover:bg-white hover:text-stone-900 hover:border hover:border-stone-800 p-2 px-4 uppercase">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
