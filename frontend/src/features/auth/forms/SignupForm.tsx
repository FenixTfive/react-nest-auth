import React, { useState } from "react";
import { SignupFormProps } from "../interfaces";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiConnectorContext } from "../../../ApiContext/ApiConnectorContext";
import { AuthSDK } from "../../../ApiConnectorSDK";
import { toast } from "react-toastify";

const SignupForm: React.FC<SignupFormProps> = ({ setOpenSignup }) => {
  const [loading, setLoading] = useState(false);
  const apiConnector = useApiConnectorContext();

  const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    nickName: yup.string().required("Nickname is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .matches(/^\S+@\S+$/i, "Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .max(80, "Max password size 80"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });

  type SignupFormData = yup.InferType<typeof schema>;

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
      firstName: "",
      lastName: "",
      nickName: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      const response = await AuthSDK.AuthSignUp(apiConnector, {
        email: data.email,
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        nickName: data.nickName,
        password: data.password,
      });

      if (response) {
        toast.success("Account created successfully!");
        setOpenSignup(false);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Failed to create account.");
    } finally {
      setLoading(false);
    }
  };
  console.log(loading);
  console.log(errors);

  return (
    <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl lg:pb-4 rounded-2xl bg-clip-border">
      <div className="text-center border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6">
        <h5>Create your account</h5>
      </div>
      <div className="flex-auto p-12 pt-0 pb-6 text-center">
        <div className="flex-auto p-1 text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="text-sm focus:shadow-primary-outline placeholder:text-gray-500 leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                aria-label="First Name"
                aria-describedby="first-name-addon"
                {...register("firstName")}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Last Name"
                className="text-sm focus:shadow-primary-outline placeholder:text-gray-500 leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                aria-label="Last Name"
                aria-describedby="last-name-addon"
                {...register("lastName")}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nickname"
                className="text-sm focus:shadow-primary-outline placeholder:text-gray-500 leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                aria-label="Nickname"
                aria-describedby="nickname-addon"
                {...register("nickName")}
              />
              {errors.nickName && (
                <p className="text-left mt-2 text-red-500 text-xs">
                  {errors.nickName.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="text-sm focus:shadow-primary-outline placeholder:text-gray-500 leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                aria-label="Email"
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
                className="text-sm focus:shadow-primary-outline placeholder:text-gray-500 leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="password-addon"
                {...register("password")}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="text-sm focus:shadow-primary-outline placeholder:text-gray-500 leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="confirm-password-addon"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-left mt-2 text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="block min-h-6 pl-7">
              <input
                id="terms"
                className="w-5 h-5 ease -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-blue-500 checked:to-violet-500 after:text-xxs after:font-awesome after:duration-250 after:ease-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                type="checkbox"
              />
              <label
                className="mb-2 text-sm font-normal text-left cursor-pointer select-none text-slate-700"
                htmlFor="terms"
              >
                I agree the{" "}
                <a href="/" className="font-bold text-slate-700">
                  Terms&nbsp;and&nbsp;Conditions
                </a>
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-block w-full px-5 py-2.5 mt-6 mb-2 text-sm font-bold text-center text-white align-middle transition-all ease-in bg-transparent border-0 rounded-lg shadow-md cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal tracking-tight-rem bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
