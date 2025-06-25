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
                disabled={loading}
              >
                Sign in
              </button>
            </div>
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
