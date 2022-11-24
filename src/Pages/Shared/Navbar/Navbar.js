/** @format */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../../ContextProvider/ContextProvider";

const Navbar = () => {
  const { user, LogOut } = useContext(authContext);
  const handleLogOut = () => {
    LogOut()
      .then(() => {
        localStorage.removeItem("carsLobbyToken");
      })
      .catch((err) => console.log(err));
  };
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/about">About us</Link>
      </li>
      <li>
        <Link to="/myorders">My orders</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>

        <Link to="/dashboard">Dashboard</Link>

        {user?.uid ? (
          <>
            <button
              className="btn btn-outline text-primary rounded-2xl"
              onClick={handleLogOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Sign Up</Link>

            <Link to="/login">Login</Link>
          </>
        )}
      </li>
    </>
  );
  return (
    <div className="navbar bg-slate-800 text-white font-semibold">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={1} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case text-xl lg:text-2xl">
          Cars Lobby
        </Link>
      </div>
      <div className="navbar-right hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className=" flex-1 justify-end">
        <label
          htmlFor="dashboard-drawer"
          tabIndex={2}
          className="btn btn-ghost lg:hidden "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
