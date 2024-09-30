import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
// import { ProductInfos } from "@/Products";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Recent = () => {
  const [ProductInfos, setProductInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProductInfos(response.data);
        setLoading(false);
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
    <div className="mt-6 md:mt-20 w-full mb-10 ">
      <div className="xl:max-w-[1250px] lg:mx-auto flex flex-col items-center justify-center  mx-6 ">
        <h2 className="text-center font-sans text-2xl md:text-3xl font-bold md:uppercase text-slate-800 md:mb-2">
          Ajax T-shirts
        </h2>
        <p className="text-center mb-6 lg:mb-16 text-lg md:text-xl text-slate-600">
          Get brand new deals and offers
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full "
        >
          <CarouselContent>
            {ProductInfos.map((ProductInfo) => (
              <CarouselItem
                key={ProductInfo._id}
                className="md:basis-1/3 lg:basis-1/4"
              >
                <div className=" relative hover:cursor-pointer overflow-hidden h-3/4 xl:h-[440px] xl:w-[300px] group">
                  <Link to={`/product/${ProductInfo._id}`}>
                    <img
                      src={ProductInfo.imgUrl}
                      className="w-full h-full border-[3px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>

                    <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center transform translate-x-4 hover:translate-x-0 ">
                      <IoMdHeartEmpty className="h-12 w-12 bg-white p-3 hover:bg-pink-500 hover:text-gray-100 transition-colors duration-300 rounded-full" />
                    </div>
                  </Link>
                </div>
                <Link
                  to={`/product/${ProductInfo._id}`}
                  className=" flex justify-center"
                >
                  <h3 className="text-lg  md:text-xl  text-center text-slate-700 mt-3 font-normal  hover:text-pink-500 transition-colors duration-300">
                    {ProductInfo.name}
                  </h3>
                </Link>
                <p className="text-2xl text-center md:text-3xl font-[500] text-pink-500">
                  ₹ {ProductInfo.price}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Recent;
