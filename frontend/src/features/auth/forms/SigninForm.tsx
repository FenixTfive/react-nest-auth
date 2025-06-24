import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiConnectorContext } from "../../../ApiContext/ApiConnectorContext";
import { useAuth } from "../../../ApiContext/AuthenticationContext";
import { AuthSDK } from "../../../ApiConnectorSDK";
import { toast } from "react-toastify";

const SigninForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const apiConnector = useApiConnectorContext();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .matches(/^\S+@\S+$/i, "Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .max(80, "Max password size 80"),
  });

  type LoginFormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const response = await AuthSDK.AuthSignIn(apiConnector, {
        email: data.email,
        password: data.password,
      });
      if (response) {
        const accessToken = apiConnector.getToken();
        login({ accessToken, user: null });
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log("Error during form submission:", error);
      toast.error("Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
      <div className="text-center border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6">
        <h5 className="mt-2 mb-4">Sign in</h5>
      </div>
      <div className="flex-auto p-12 pt-0 pb-6 text-center">
        <div className="flex-auto p-1 text-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            // onFocus={() => {
            //   setApiError(null);
            //   setApiSuccess(false);
            // }}
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email"
                className={`text-sm focus:shadow-primary-outline placeholder:text-gray-500 leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow aria-label="Email"`}
                aria-describedby="email-addon"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-left mt-2 text-red-500 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                className={`text-sm focus:shadow-primary-outline placeholder:text-gray-500 leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow`}
                placeholder="Password"
                aria-label="Password"
                aria-describedby="password-addon"
                {...register("password", {})}
              />
              {errors.password && (
                <p className={` text-left mt-2 text-red-500 text-xs`}>
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* <p
            className={` ${
              apiError
                ? apiSuccess
                  ? "text-green-500"
                  : "text-red-500"
                : "text-white"
            } text-left text-xs mt-0 mb-2`}
          >
            {apiError ?? "."}
          </p> */}

            <div className="text-center">
              <button
                id="submitLogin"
                type="submit"
                className="inline-block w-full px-5 py-2.5 mt-6 mb-2 text-sm font-bold text-center text-white align-middle transition-all ease-in border-0 rounded-lg shadow-md cursor-pointer active:-translate-y-px active:hover:text-white active:text-black hover:-translate-y-px hover:shadow-xs leading-normal tracking-tight-rem bg-150 bg-x-25 bg-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-65 disabled:hover:bg-none disabled:active:bg-none"
                // disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-0"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75 "
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Sign in
              </button>
            </div>
            {/* <div className="relative w-full max-w-full px-3 mb-2 text-center shrink-0">
              <p className="inline mb-2 px-4 text-slate-400 bg-white z-2 text-sm leading-normal font-semibold before:bg-gradient-to-r before:from-transparent before:via-neutral-500/40 before:to-neutral-500/40 before:right-2 before:-ml-1/2 before:content-[''] before:inline-block before:w-3/10 before:h-px before:relative before:align-middle after:left-2 after:-mr-1/2 after:bg-gradient-to-r after:from-neutral-500/40 after:via-neutral-500/40 after:to-transparent after:content-[''] after:inline-block after:w-3/10 after:h-px after:relative after:align-middle">
                or
              </p>
            </div>
            <div className="text-center">
              <Link to="/sign-up" 
                className="inline-block w-full px-5 py-2.5 mt-2 mb-6 text-sm font-bold text-center text-white align-middle transition-all ease-in bg-transparent border-0 rounded-lg shadow-md cursor-pointer active:-translate-y-px hover:-translate-y-px hover:shadow-xs leading-normal tracking-tight-rem bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
              >
                Sign up
              </Link>
            </div> */}
          </form>
        </div>

        <div className="min-h-6 mb-0.5 block text-center">
          <Link
            to="/forgot-password"
            className="ml-1 text-sm font-normal cursor-pointer select-none text-slate-700 hover:text-blue-500"
          >
            Forgot your Password?
          </Link>
        </div>
        <div className="min-h-6 mb-0.5 block text-center mt-2">
          <Link
            to="/privacy-policy"
            className="ml-1 text-sm font-normal cursor-pointer select-none text-slate-700 hover:text-blue-500"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
