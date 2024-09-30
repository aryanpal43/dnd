import React, { useState } from "react";

const SimplePriceRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(5000);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 100);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 100);
    setMaxPrice(value);
  };

  const handleSubmit = () => {
    console.log(`Selected price range: $${minPrice} - $${maxPrice}`);
    // Add your submit logic here
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-6">
        <label
          htmlFor="minPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Min Price: ${minPrice}
        </label>
        <input
          type="range"
          id="minPrice"
          min="100"
          max="10000"
          step="100"
          value={minPrice}
          onChange={handleMinChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="maxPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Max Price: ${maxPrice}
        </label>
        <input
          type="range"
          id="maxPrice"
          min="100"
          max="10000"
          step="100"
          value={maxPrice}
          onChange={handleMaxChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
  );
};

export default SimplePriceRangeSlider;
