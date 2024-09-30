import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const Product = lazy(() => import("././pages/Product/Product"));
const Category = lazy(() => import("././pages/Category/Category"));
const Home = lazy(() => import("././pages/Home"));
const AddProduct = lazy(() => import("././pages/Product/AddProduct.jsx"));
const AddCategory = lazy(() => import("././pages/Category/AddCategory.jsx"));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-category" element={<AddCategory />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
