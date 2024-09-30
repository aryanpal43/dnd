import React, { useState, useEffect } from "react";
("use client");
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import axios from "axios";
import { cn } from "@/lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SortingOptions = [
  {
    value: "popularity",
    label: "Popularity",
  },
  {
    value: "price: low to high",
    label: "Price: Low to High",
  },
  {
    value: "price: high to low",
    label: "Price: High to Low",
  },
  {
    value: "new arrivals",
    label: "New Arrivals",
  },
  {
    value: "best sellars",
    label: "Best Sellars",
  },
];

const sizes = ["XS", "S", "M", "L", "XL"];

const basicColors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#00FF00" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Gray", hex: "#808080" },
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
];
const Shop = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [ProductInfos, setProductInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProductInfos(response.data);
        setSortedProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching products.");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const sortByPrice = (order) => {
    const sorted = [...ProductInfos].sort((a, b) => {
      if (order === "price: low to high") {
        return a.price - b.price;
      } else if (order === "price: high to low") {
        return b.price - a.price;
      }
      return 0;
    });
    setSortedProducts(sorted);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="pt-20 mb-10">
      <div className="max-w-[1250px] mx-auto">
        <h1 className="font-semibold text-center text-3xl mt-10 mb-6 ">
          Shop Our Clothes
        </h1>
        <div className="w-full flex justify-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="flex w-[250px] justify-between text-md text-muted-foreground border-none hover:text-pink-400  overflow-hidden "
              >
                {value
                  ? "Sort By " +
                    SortingOptions.find(
                      (SortingOption) => SortingOption.value === value
                    )?.label
                  : "Sort By"}
                <IoIosArrowDown
                  className={`transform transition-transform duration-200 ${
                    open ? "-rotate-180" : "-rotate-0"
                  }`}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {SortingOptions.map((SortingOption) => (
                      <CommandItem
                        key={SortingOption.value}
                        value={SortingOption.value}
                        onSelect={(currentValue) => {
                          const selectedValue =
                            currentValue === value ? "" : currentValue;
                          setValue(selectedValue);

                          if (selectedValue.includes("price")) {
                            sortByPrice(selectedValue);
                          }

                          setOpen(false);
                        }}
                        className="text-md text-muted-foreground hover:text-pink-400"
                      >
                        {SortingOption.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="md:grid md:grid-cols-5">
          <div className="hidden md:block col-span-1 border-r-2 ">
            <div className="mb-10 border-b-2">
              <h2 className="text-2xl font-semibold border-b-2 w-[100px] pb-2 mb-4 border-b-pink-600  ">
                Collections
              </h2>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" className="h-4 w-4" />
                  <Label htmlFor="r1" className="text-lg">
                    Default
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mens" id="r2" className="h-4 w-4" />
                  <Label htmlFor="r2" className="text-lg">
                    Men's
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Womens" id="r3" className="h-4 w-4" />
                  <Label htmlFor="r3" className="text-lg">
                    Women's
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-10 border-b-2 pb-4">
              <h2 className="text-2xl font-semibold border-b-2 w-[100px] pb-2 mb-6 border-b-pink-600  ">
                Color
              </h2>
              <div className=" mb-1">
                {basicColors.map((color) => (
                  <button
                    key={color.name}
                    className={`rounded-full mx-1 h-5 w-5`}
                    style={{ backgroundColor: color.hex }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="border-b-2">
              <h2 className="text-2xl font-semibold border-b-2 w-[100px] pb-2 mb-4 border-b-pink-600  ">
                Size
              </h2>
              <div className="  gap-3 mb-1">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="mx-1 envborder-[1px] hover:bg-pink-500 transition-colors duration-300 hover:text-white hover:border-none text-xl  p-2 h-10 w-10 "
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:col-span-4 md:grid-cols-4 gap-2 md:gap-4 p-3">
            {sortedProducts.map((ProductInfo) => (
              <div key={ProductInfo._id} className="">
                <div className="rounded-lg relative hover:cursor-pointer overflow-hidden h-4/5 xl:h-[300px] xl:w-[240px] group">
                  <Link to={`/product/${ProductInfo._id}`}>
                    <img
                      src={ProductInfo.imgUrl}
                      className="w-full h-full rounded-lg object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>

                    <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center transform translate-x-4 hover:translate-x-0 ">
                      <IoMdHeartEmpty className="h-12 w-12 bg-white p-3 hover:bg-pink-500 hover:text-gray-100 transition-colors duration-300 rounded-full" />
                    </div>
                  </Link>
                </div>
                <Link
                  to={`/product/${ProductInfo.id}`}
                  className="inline-block"
                >
                  <h3 className="text-sm md:text-lg text-slate-700 mt-2 font-[500] hover:text-pink-500 transition-colors duration-300">
                    {ProductInfo.name}
                  </h3>
                </Link>
                <p className="text-sm md:text-base font-[500] text-slate-800">
                  ₹{ProductInfo.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
