import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/categories`
        );
        setCategories(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError("An error occurred while fetching categories.");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    fetchCategories();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className=" w-screen h-screen">
      <div className="ml-[300px] py-20 pr-10 h-full">
        <div className="flex flex-col border-[2px] rounded-md h-[95%] p-6">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col">
              <h1 className="text-2xl text-gray-800">Categories</h1>
              <p>Categories you have added before</p>
            </div>
            <Link to="/add-category">
              <Button className="bg-orange-900 text-white flex justify-center items-center">
                + Add
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-9 bg-orange-900 mt-10 p-4 font-semibold text-white text-center">
            <h2 className="col-span-2 flex items-center ml-10 text-center">
              Image
            </h2>

            <h2 className="col-span-4 flex items-center text-left">Title</h2>

            <h2 className="col-span-1 flex items-center justify-center">
              Products
            </h2>
            <h2 className="col-span-1 flex items-center justify-center">
              Status
            </h2>
            <h2 className="col-span-1 flex items-center justify-center">
              Action
            </h2>
          </div>
          <div className="overflow-y-scroll">
            {categories.map((category) => (
              <div
                key={category._id}
                className="grid grid-cols-9 px-4 py-1 text-center w-full"
              >
                <img
                  className="col-span-2 h-14 w-16 ml-8 flex items-center justify-center"
                  src={category.imgUrl}
                />
                <p className="col-span-4 flex items-center ">{category.name}</p>
                <p className="col-span-1 flex items-center justify-center">
                  {category.products.length}
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

export default Category;
