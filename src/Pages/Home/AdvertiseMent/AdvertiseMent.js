/** @format */

import React, { useContext } from "react";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useAdvertisements from "../../../Hooks/useAdvertisements/useAdvertisements";
import Loading from "../../Loading/Loading";
import { MdFavoriteBorder } from "react-icons/md";
import { FaFontAwesomeFlag } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const AdvertiseMent = () => {
  const { user } = useContext(authContext);
  const [advertisements, isLoading] = useAdvertisements(user?.email);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      {advertisements.length === 0 ? (
        <></>
      ) : (
        <>
          <div>
            <div className="font-bold text-center text-green-600 text-3xl">
              <h3>HOT DEALS GET NOW</h3>
            </div>
            <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  ">
              {advertisements.map((advertise) => (
                <div
                  key={advertise._id}
                  className="w-5/6 mx-auto  car rounded-2xl shadow-2xl"
                >
                  <figure className="px-5 pt-5">
                    <img
                      src={advertise?.img}
                      alt={`advertise.name`}
                      className="rounded-xl"
                    />
                  </figure>
                  <div className="card-body items-center text-white text-center">
                    <div className="flex justify-evenly items-center">
                      <p className="mr-2 text-yellow-600">
                        Posted at:
                        {advertise?.timeOfPosting
                          ? advertise.timeOfPosting
                          : "not added"}
                      </p>
                    </div>
                    <h2 className="card-title text-white">{advertise?.name}</h2>
                    <p className="text-red-500">
                      Original Price : {advertise?.originalPrice}$
                    </p>
                    <p className="text-green-600 font-bold">
                      Resale Price : {advertise?.resalePrice}$ Only
                    </p>

                    <p className="text-green-600 font-bold">
                      Condition : {advertise?.condition}
                    </p>

                    <p>Used : {advertise?.usage}</p>
                    <div className="flex justify-between items-center">
                      {advertise.sellerStatus === "verified" && (
                        <p className="text-blue-600">
                          <MdVerified />
                        </p>
                      )}
                      <p className="ml-2">Seller : {advertise?.sellerName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvertiseMent;
