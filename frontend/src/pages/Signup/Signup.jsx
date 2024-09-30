import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(signupUser({ email, password })).unwrap();

      navigate("/verify-email");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="pt-20 bg-gray-200 h-screen flex justify-center items-center">
      <div className="h-full lg:h-3/4 min-w-96 w-1/2 bg-white shadow-md rounded-md">
        <div className="w-full max-w-[400px] mx-auto h-full flex flex-col justify-center items-center px-4 md:px-0">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              <div className="w-full flex flex-col justify-center gap-2 items-center">
                <CiMail className="h-6 w-6" />
                <h2 className="text-xl text-slate-700 font-semibold">
                  Sign-up with your E-mail
                </h2>
              </div>

              <input
                type="email"
                placeholder="Enter your E-mail"
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
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full lg:w-[400px] p-4 border-2 focus:outline-none rounded-sm"
              />
              <Button
                className="w-full lg:w-[400px]"
                type="submit"
                disabled={loading}
              >
                Signup{" "}
              </Button>
            </div>
            <p className="mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-pink-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
