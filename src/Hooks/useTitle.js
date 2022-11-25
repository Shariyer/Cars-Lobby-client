/** @format */

import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Cars Lobby - ${title}`;
  }, [title]);
};

export default useTitle;
