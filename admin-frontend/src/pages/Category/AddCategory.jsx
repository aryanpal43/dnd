import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

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
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/categories`,
        {
          imgUrl,
          name,
        }
      );
      console.log(response);

      setImg(null);

      setName("");

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ml-[300px] p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
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
  );
};

export default AddCategory;
