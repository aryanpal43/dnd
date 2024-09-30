import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { FaSearch, FaRegUser } from "react-icons/fa";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SlHandbag } from "react-icons/sl";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [showInput, setShowInput] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const [totalProductsCount, setTotalProductsCount] = useState(0);

  useEffect(() => {
    const total = products.reduce((acc, item) => acc + item.quantity, 0);
    setTotalProductsCount(total);
  }, [products]);

  return (
    <div className="fixed z-20 bg-stone-100 w-full h-[4.4rem] shadow-md">
      <div className="flex h-full justify-between items-center px-3 lg:px-6 relative">
        <div className="flex items-center w-1/2 justify-between h-full">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="gray"
                className="w-7 h-7"
              >
                <line
                  x1="4"
                  y1="6"
                  x2="20"
                  y2="6"
                  stroke="gray"
                  strokeWidth="2"
                />
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  stroke="gray"
                  strokeWidth="2"
                />
                <line
                  x1="4"
                  y1="18"
                  x2="20"
                  y2="18"
                  stroke="gray"
                  strokeWidth="2"
                />
              </svg>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Logo</SheetTitle>
                <SheetDescription>Welcome to our store</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col py-2 gap-2">
                <Link className="text-xl text-slate-700 " to="/">
                  Home
                </Link>
                <hr className="border-t-2 border-gray-300" />
                <Link className="text-xl text-slate-700 " to="/shop">
                  Shop
                </Link>{" "}
                <hr className="border-t-2 border-gray-300" />
                <Link className="text-xl text-slate-700 " to="/category">
                  Category
                </Link>{" "}
                <hr className="border-t-2 border-gray-300" />
                <Link className="text-xl text-slate-700 " to="/about-us">
                  About us
                </Link>{" "}
                <hr className="border-t-2 border-gray-300" />
                <Link className="text-xl text-slate-700 " to="/login">
                  My Account
                </Link>{" "}
                <hr className="border-t-2 border-gray-300" />
              </div>
            </SheetContent>
          </Sheet>
          <div className="text-stone-900 text-2xl left-1/2 absolute transform -translate-x-1/2 lg:left-0 lg:relative lg:translate-x-0">
            <img src="logo.png" alt="" />
          </div>

          {/* Center the links */}
          <div className=" h-full hidden lg:block ">
            <div className="h-full items-center flex justify-center text-stone-900 font-[500] text-xl gap-1 mr-24">
              <div className="hover:text-pink-500 h-full flex items-center justify-center hover:border-b-4 hover:border-b-pink-500 p-6">
                <Link to="/" className="uppercase text-lg ">
                  Home
                </Link>
              </div>
              <div className="hover:text-pink-500 h-full flex items-center justify-center hover:border-b-4 hover:border-b-pink-500 p-6">
                <Link
                  to="/shop"
                  className="uppercase text-lg hover:text-pink-500"
                >
                  Shop
                </Link>
              </div>
              <div className="hover:text-pink-500 h-full flex items-center justify-center hover:border-b-4 hover:border-b-pink-500 p-6">
                <Link
                  to="/category"
                  className="uppercase text-lg hover:text-pink-500"
                >
                  Category
                </Link>
              </div>
              <div className="hover:text-pink-500 h-full flex items-center justify-center hover:border-b-4 hover:border-b-pink-500 p-6">
                <Link
                  to="/about-us"
                  className="flex gap-2 flex-row uppercase text-lg hover:text-pink-500"
                >
                  <span>About </span>
                  <span>us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Icons on the right */}
        <div className="flex items-center justify-between">
          <div className="hidden md:block">
            <div className="relative w-[400px] mr-10">
              {/* Input field */}
              <input
                type="text"
                placeholder="Search for items"
                className="input-with-icon text-sm bg-slate-100 w-full p-2 pl-10  rounded-md focus:outline-none focus:bg-white border border-slate-300"
              />

              <FaSearch className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="relative flex justify-between items-center gap-2 lg:gap-6 lg:mr-4">
            <button>
              <FaSearch className="md:hidden h-6 w-6 text-slate-800" />
            </button>
            <Link to="/login">
              <FaRegUser className="hidden lg:block h-7 w-7 text-slate-800" />
            </Link>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/cart" className="relative">
                    <SlHandbag className="h-6 w-6 lg:h-7 lg:w-7" />
                    <div className="flex justify-center items-center absolute bg-pink-500 h-4 w-4 -top-1 -right-1 lg:top-0 lg:right-0 rounded-full text-white text-xs">
                      {totalProductsCount}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-lg">Go to Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Link to="/">
              <IoHeartOutline className="h-6 w-6 lg:h-7 lg:w-7" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
