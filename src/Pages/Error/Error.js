/** @format */

import { useRouteError } from "react-router-dom";
import pic1 from "../../assets/error Picture/errorSign.png";
import pic2 from "../../assets/error Picture/error1.jpg";

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h2 className="font-bold text-2xl text-red-700">
        Opps!!!! an Error Ocurred
      </h2>
      <br />
      {err && (
        <div>
          <img src={pic1} alt="" />
          <div className="text-xl text-green-600 text-center">
            <h3>{err.status}</h3>
            <h3>{err.statusText || err.message}</h3>
          </div>{" "}
          <img src={pic2} alt="" />
        </div>
      )}
    </div>
  );
};

export default Error;
