/** @format */

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authContext } from "../../ContextProvider/ContextProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { CreatingUserWithEP, UpdateUserProfile } = useContext(authContext);
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    setRegistrationError("");
    console.log(data);
    CreatingUserWithEP(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Congratulations!!User Created Successfully.");
        const userInfo = {
          displayName: data.name,
        };
        UpdateUserProfile(userInfo)
          .then(() => {
            navigate("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setRegistrationError(error.message);
      });
  };
  return (
    <div className="hero mt-5">
      <div className="hero-content flex-col ">
        <div className="card  w-full shadow-2xl bg-base-100">
          <h1 className="text-5xl text-center font-bold">Sign Up</h1>
          <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type your Name"
                {...register("name", {
                  required: "Name is must be Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type your Email"
                {...register("email", {
                  required: "Email is must be Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Type your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters long",
                  },
                  //   pattern: {
                  //     value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  //     message:
                  //       "Password must have uppercase, number and special characters",
                  //   },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <label className="label">Register As :</label>
            <select
              {...register("userType")}
              className="input input-bordered w-full max-w-xs"
            >
              <option value="seller">Seller</option>
              <option value="buyer" selected>
                Buyer
              </option>
            </select>
            <label className=" label mt-3 px-2">
              Already Have an Account???{" "}
              <Link className="link-hover text-secondary" to="/login">
                Login Now
              </Link>
            </label>
            <div className="form-control mt-6">
              <input
                className="btn btn-accent w-full mt-4"
                value="Sign Up"
                type="submit"
              />
              {registrationError && (
                <p className="text-red-600">{registrationError}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
