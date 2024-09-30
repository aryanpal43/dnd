import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

const Product = () => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setLoading(false);
        console.log("Fetched products:", response.data);
      } catch (err) {
        setError("An error occurred while fetching products.");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className=" w-screen h-screen">
      <div className="ml-[300px] py-20 pr-10 h-full">
        <div className="flex flex-col border-[2px] rounded-md h-[95%] p-6">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col">
              <h1 className="text-2xl text-gray-800">Product</h1>
              <p>
                Product you have been added before anybody can check and visit
                on this
              </p>
            </div>
            <Link to="/add-product">
              <Button className="bg-orange-900 text-white flex justify-center items-center">
                + Add
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-9 bg-orange-900 mt-10 p-4 font-semibold text-white text-center">
            <h2 className="col-span-1">Image</h2>
            <h2 className="col-span-2 flex items-center justify-center">
              Category
            </h2>
            <h2 className="col-span-2 flex items-center justify-center">
              Title
            </h2>
            <h2 className="col-span-1 flex items-center justify-center">
              Price
            </h2>
            <h2 className="col-span-1 flex items-center justify-center">
              Stocks
            </h2>
            <h2 className="col-span-1 flex items-center justify-center">
              Status
            </h2>
            <h2 className="col-span-1 flex items-center justify-center">
              Active
            </h2>
          </div>
          <div className="overflow-y-scroll">
            {Products.map((Product) => (
              <div
                key={Product._id}
                className="grid grid-cols-9 px-4 py-1 text-center w-full"
              >
                <img
                  className="col-span-1 h-14 w-12 ml-8"
                  src={Product.imgUrl}
                />
                <p className="col-span-2 flex items-center justify-center">
                  {Product.category.name}
                </p>
                <p className="col-span-2 flex items-center justify-center">
                  {Product.name}
                </p>
                <p className="col-span-1 flex items-center justify-center ml-6 ">
                  {Product.price} inr
                </p>
                <p className="ml-7 col-span-1 flex items-center justify-center">
                  Stocks
                </p>
                <button className="ml-9  bg-green-600  text-white rounded-md col-span-1 my-2 items-center justify-center">
                  Active
                </button>
                <div className="ml-10 col-span-1 flex items-center justify-center gap-2">
                  <button className="bg-orange-900 p-3 rounded-md text-white">
                    <CiEdit />
                  </button>
                  <button className="bg-orange-900 p-3 rounded-md text-white">
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
