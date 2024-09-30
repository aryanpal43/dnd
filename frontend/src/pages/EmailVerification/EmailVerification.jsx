import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useVerifyEmailMutation } from "@/features/auth/authApi";

const EmailVerification = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    const codeAsString = String(code);

    try {
      const result = await verifyEmail(codeAsString).unwrap();

      dispatch({ type: "auth/verificationSuccess", payload: result });

      navigate("/welcome");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="pt-20 bg-gray-200 h-screen flex justify-center items-center">
      <div className="h-full lg:h-1/2 min-w-96 w-1/2 bg-white shadow-md rounded-md">
        <div className="w-full max-w-[400px] mx-auto h-full flex flex-col justify-center items-center px-4 md:px-0">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleVerify}
          >
            <div className="flex flex-col gap-6">
              <div className="w-full flex flex-col justify-center gap-2 items-center">
                <h2 className="text-lg text-slate-700 font-semibold">
                  Enter the Code send to your e-mail
                </h2>
              </div>

              <input
                type="text"
                placeholder="6 digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full lg:w-[400px] p-4 border-2 focus:outline-none rounded-sm"
              />

              <Button
                className="w-full lg:w-[400px]"
                type="submit"
                disabled={isLoading}
              >
                Verify Your Account{" "}
              </Button>
            </div>
            <p className="mt-2">
              Didn't recieve a code?{" "}
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

export default EmailVerification;
