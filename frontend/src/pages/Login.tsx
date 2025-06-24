import React, { useState } from "react";
import SignupForm from "../features/auth/forms/SignupForm";
import SigninForm from "../features/auth/forms/SigninForm";

const Login: React.FC = () => {
  const [openSignup, setOpenSignup] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen min-w-full ">
      <div className="container pb-8">
        <div className="flex flex-wrap justify-center align-items-center">
          <div className="w-full max-w-md px-6 mx-auto shrink-0 md:flex-1 ">
            {openSignup ? (
              <SignupForm setOpenSignup={setOpenSignup} />
            ) : (
              <SigninForm />
            )}

            <div className="text-xs font-bold text-center mt-4">
              {openSignup
                ? "Already have an account?"
                : "Don't have an account?"}
              <button
                onClick={() => setOpenSignup(!openSignup)}
                className="ml-2 text-blue-500 hover:underline cursor-pointer"
              >
                {openSignup ? "Log in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
