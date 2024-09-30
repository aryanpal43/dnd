import React from "react";

const BannerTwo = () => {
  return (
    <div className="max-w-[1250px] mt-20 mx-6 lg:mx-auto">
      <div className="flex flex-col md:flex-row w-full  md:px-0 md:h-[270px] gap-10">
        <div className="relative h-full w-full">
          <img
            src="/mens-hoodie.jpg"
            alt=""
            className=" object-cover h-full w-full"
          />
          <div className="inset-0 flex flex-col  md:justify-center absolute ">
            <div className="md:ml-12 flex flex-col md:gap-2">
              <h2 className="mt-2 md:mt-0 uppercase text-center md:text-left text-xl md:text-5xl text-gray-100 font-bold">
                Deal of the day
              </h2>
              <p className=" text-gray-100 text-center md:text-left text-base md:text-xl">
                Get your Clothes at minimum prices
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="/womens-hoodie.jpg"
            alt=""
            className=" object-cover h-full w-full"
          />
          <div className="inset-0 flex flex-col  md:justify-center absolute ">
            <div className="md:ml-12 flex flex-col md:gap-2">
              <h2 className="mt-2 md:mt-0 uppercase text-center md:text-left text-xl md:text-5xl text-gray-800 font-bold">
                New arrivals
              </h2>
              <p className=" text-gray-800 text-center md:text-left text-base md:text-xl">
                Fashion bags
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTwo;
