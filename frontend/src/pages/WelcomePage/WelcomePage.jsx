import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/auth/authSlice"; // Import the logout thunk
import { Button } from "@/components/ui/button";
import { resetCart } from "@/redux/cartReducer";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(resetCart());

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center max-w-[1000px] mx-auto pt-64 gap-2">
      <h1 className="text-gray-700 font-semibold text-3xl">
        {" "}
        Welcome to Ajax ClouthHouse
      </h1>
      <Link className="text-pink-500" to="/shop">
        Conitnue Shopping
      </Link>
      <Button onClick={handleLogout} className="logout-button">
        Logout
      </Button>
    </div>
  );
};

export default WelcomePage;
