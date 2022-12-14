/** @format */

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../ContextProvider/ContextProvider";
import { FcGoogle } from "react-icons/fc";
import useToken from "../../Hooks/useToken/useToken";
import toast from "react-hot-toast";
import useTitle from "../../Hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { LoginWithEP, GoogleLogin } = useContext(authContext);
  const [loggedinUserEmail, setLoggedinUserEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  // custom hook
  const [token] = useToken(loggedinUserEmail);
  if (token) {
    navigate(from, { replace: true });
  }

  //  handle login submit
  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    LoginWithEP(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log("Email password user", user);
        setLoggedinUserEmail(data.email);
        // userInfoToDb(data.name, data.email, data.userType);
        toast.success("You successfully Logged In");
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  // google login
  const handleGoogleLogin = () => {
    GoogleLogin()
      .then((result) => {
        const user = result.user;
        // console.log("Google Logged in user :", user);
        fetch(
          `https://b612-used-products-resale-server-side-shariyer.vercel.app/users?email=${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            if (data.length === 1) {
              console.log("user found");
              setLoggedinUserEmail(user?.email);
            } else if (data.length > 1) {
              console.log(" Many users found ");
              // userInfoToDb(user?.displayName, user?.email, "buyer");
            } else {
              console.log("user not found");
            }
          })
          .catch((err) => console.log(err));
        userInfoToDb(user?.displayName, user?.email, "buyer");
        toast.success("You successfully Logged In");
      })
      .catch((err) => console.log(err));
  };
  const userInfoToDb = (name, email, userType) => {
    const user = {
      name,
      email,
      userType,
    };
    console.log("inside db", user);
    fetch(
      "https://b612-used-products-resale-server-side-shariyer.vercel.app/users",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setLoggedinUserEmail(email);
        }
      });
  };
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="card  w-full  shadow-2xl bg-base-100">
          <h1 className="text-5xl text-center font-bold">Login</h1>

          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type your Email"
                {...register("email", {
                  required: "Email Address must be required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Type your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {" "}
                <span className="label-text">Forget Password?</span>
              </label>
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </div>
            <div className="form-control mt-6">
              <input className="btn bg-secondary" type="submit" value="Login" />
            </div>
            <div>
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>
          </form>
          <div className="divider">OR</div>
          <h3 className="text-center">Continue With Google Login </h3>
          <div className="flex flex-col justify-center">
            <button
              onClick={handleGoogleLogin}
              className="flex justify-center items-center   m-4 rounded-lg bg-gradient-to-r from-secondary to-primary"
            >
              <h1 className="flex items-center px-5 py-4 font-bold text-white lg:text-accent md:text-accent">
                Google<FcGoogle></FcGoogle>
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
