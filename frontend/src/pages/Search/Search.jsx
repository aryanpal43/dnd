import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { FaSearch, FaRegUser } from "react-icons/fa";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SlHandbag } from "react-icons/sl";
import { useSelector } from "react-redux";

const Search = () => {
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(!showInput);
  };

  const products = useSelector((state) => state.cart.products);

  const [totalProductsCount, setTotalProductsCount] = useState(0);

  useEffect(() => {
    const total = products.reduce((acc, item) => acc + item.quantity, 0);
    setTotalProductsCount(total);
  }, [products]);

  return (
    <div className="fixed z-20 bg-stone-100 w-full h-[5rem] shadow-md">
      <div className="flex h-full justify-between items-center px-3 lg:px-6 relative">
        <div className="text-stone-900 text-2xl left-1/2 absolute transform -translate-x-1/2 lg:left-0 lg:relative lg:translate-x-0">
          Pogo
        </div>

        {/* Center the links */}
        <div className="h-full flex justify-center items-center  left-1/2 absolute transform -translate-x-1/2">
          <form>
            <input
              type="text"
              className="p-4 rounded-full bg-slate-200 w-[300px]"
              placeholder="Search for an item..."
            />
          </form>
        </div>

        {/* Icons on the right */}

        <div className="relative flex justify-between items-center gap-2 lg:gap-6 lg:mr-4">
          <Link to="/search">
            <FaSearch className="h-6 w-6 lg:h-7 lg:w-7 text-muted-foreground" />
          </Link>

          <button>
            <FaRegUser className="hidden lg:block h-7 w-7 text-slate-800" />
          </button>

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
  );
};

export default Search;
