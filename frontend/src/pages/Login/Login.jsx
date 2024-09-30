import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice"; // Import the login thunk
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCartFromBackend } from "@/redux/cartReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();

      const cartResponse = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`,
        {
          withCredentials: true,
        }
      );

      dispatch(setCartFromBackend(cartResponse.data));

      console.log(cartResponse.data);

      navigate("/welcome");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="pt-20 bg-gray-200 h-screen flex justify-center items-center">
      <div className="h-full lg:h-3/5 min-w-96 w-1/2 bg-white shadow-md rounded-md">
        <div className="w-full max-w-[400px] mx-auto h-full  px-4 md:px-0">
          <form
            className="h-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              <div className="w-full flex flex-col justify-center gap-2 items-center">
                <CiMail className="h-6 w-6" />
                <h2 className="text-xl text-slate-700 font-semibold">
                  Login with your E-mail
                </h2>
              </div>

              <input
                type="email"
                placeholder="Enter your e-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full lg:w-[400px] p-4 border-2 focus:outline-none rounded-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full lg:w-[400px] p-4 border-2 focus:outline-none rounded-sm"
              />

              <Button className="w-full lg:w-[400px]">Login </Button>
            </div>
            <p className="mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-pink-500">
                signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
