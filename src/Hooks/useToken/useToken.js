/** @format */
import { useEffect, useState } from "react";

const useToken = (email) => {
  // console.log("inside usetoken", email);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(
        `https://b612-used-products-resale-server-side-shariyer.vercel.app/jwt?email=${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.accessToken) {
            // console.log(data.accessToken);
            localStorage.setItem("carsLobbyToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
