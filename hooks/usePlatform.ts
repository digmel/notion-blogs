import { useEffect, useState } from "react";

export const usePlatform = function (): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.screen.width < 768 ? setIsMobile(true) : setIsMobile(false);
  }, []);

  return isMobile;
};
