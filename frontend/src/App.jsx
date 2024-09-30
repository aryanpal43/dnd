import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Cart from "./pages/Cart/Cart";

const Home = lazy(() => import("././pages/Home/Home"));
const Product = lazy(() => import("././pages/Product/Product"));
const Categories = lazy(() => import("././pages/Categories/Categories.jsx"));
const Shop = lazy(() => import("././pages/Shop/Shop.jsx"));
const Search = lazy(() => import("././pages/Search/Search.jsx"));
const Login = lazy(() => import("././pages/Login/Login.jsx"));
const Signup = lazy(() => import("././pages/Signup/Signup.jsx"));
const WelcomePage = lazy(() => import("././pages/WelcomePage/WelcomePage.jsx"));
const EmailVerification = lazy(() =>
  import("././pages/EmailVerification/EmailVerification.jsx")
);

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
        <Toaster />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
