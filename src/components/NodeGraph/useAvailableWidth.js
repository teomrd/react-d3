import { useEffect, useState } from "react";

export const useAvailableWidth = (selector) => {
  const [width, setWidth] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      setWidth(document.querySelector(selector).parentNode.offsetWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [selector]);

  return width;
};
