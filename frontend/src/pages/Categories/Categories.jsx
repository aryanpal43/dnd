import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";

const Categories = () => {
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
    <div className="pt-20 mb-10">
      <div className="max-w-[1150px] mx-auto">
        <h1 className="font-semibold text-2xl md:text-3xl mt-4  uppercase text-center md:mt-10 md:mb-12 ">
          Categories
        </h1>
        <div className="grid grid-cols-1 p-3 md:grid-cols-2 gap-10">
          {categories.map((category) => (
            <div
              key={category._id}
              className="rounded-2xl ring-2 border-b-8 border-black ring-black relative hover:cursor-pointer  md:h-[310px] md:w-[558px] group"
            >
              <Link>
                <img
                  src={category.imgUrl}
                  className="rounded-xl w-full h-full object-cover "
                />
                <div className="rounded-xl absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-60 transition-opacity duration-300"></div>
                <h2 className="-bottom-5 uppercase  absolute font-serif text-black text-3xl right-1/2 transform translate-x-1/2  translate-y-0 bg-white w-[300px] text-center py-2 border-black border-4 rounded-2xl">
                  {category.name}
                </h2>
                <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center transform translate-x-4 hover:translate-x-0 ">
                  <Button className="uppercase text-white text-md rounded-none p-5 bg-pink-500">
                    Discover now!
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
