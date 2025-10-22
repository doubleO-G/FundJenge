import { useState, useEffect } from "react";

export const useHashLocation = (): [string, (to: string) => void] => {
  const [loc, setLoc] = useState(window.location.hash.replace(/^#/, "") || "/");

  useEffect(() => {
    const handler = () => setLoc(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [loc, navigate];
};
