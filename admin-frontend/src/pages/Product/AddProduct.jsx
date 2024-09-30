import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // State for stock
  const [stock, setStock] = useState({
    xs: 0,
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0,
  });

  const uploadFile = async (timestamp, signature) => {
    const folder = "images";

    const data = new FormData();
    data.append("file", img);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    data.append("folder", folder);

    try {
      let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      let resourceType = "image";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/sign-upload`,
        { folder }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { timestamp: imgTimeStamp, signature: imgSignature } =
        await getSignatureForUpload("images");

      const imgUrl = await uploadFile(imgTimeStamp, imgSignature);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/products`,
        {
          imgUrl,
          name,
          price,
          categoryId: selectedCategory,
          stock, // Sending the stock data with the request
          desc: description,
        }
      );
      console.log(response);

      // Reset form
      setImg(null);
      setPrice(0);
      setName("");
      setSelectedCategory("");
      setStock({
        xs: 0,
        s: 0,
        m: 0,
        l: 0,
        xl: 0,
        xxl: 0,
      });
      setDescription("");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setStock((prevStock) => ({
      ...prevStock,
      [name]: Number(value), // Convert input to number
    }));
  };

  return (
    <div className="ml-[300px] p-6 bg-white rounded-lg shadow-lg">
      <div className="mx-20">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500 p-2"
            />
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Select Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500 p-2"
            >
              <option value="" disabled>
                -- Select a Category --
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Field */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500 p-2"
            />
          </div>
          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500 p-2"
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label
              htmlFor="img"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="img"
              accept="image/*"
              onChange={(e) => setImg((prev) => e.target.files[0])}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500 p-2"
            />
          </div>

          {/* Stock Inputs for Each Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock for Sizes
            </label>
            <div className="grid grid-cols-3 gap-4 mt-1">
              {["xs", "s", "m", "l", "xl", "xxl"].map((size) => (
                <div key={size} className="flex flex-col">
                  <label
                    htmlFor={size}
                    className="text-sm font-medium text-gray-700"
                  >
                    {size.toUpperCase()} Stock
                  </label>
                  <input
                    type="number"
                    id={size}
                    name={size}
                    value={stock[size]}
                    onChange={handleStockChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500 p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200"
          >
            Upload
          </button>
        </form>
        {loading && (
          <h2 className="text-center text-pink-500 mt-4">Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
