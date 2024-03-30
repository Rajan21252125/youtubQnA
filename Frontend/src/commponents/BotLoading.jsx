import { useState, useEffect } from "react";

const BotLoading = () => {
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prevAnimation) => {
        switch (prevAnimation) {
          case "":
            return ".";
          case ".":
            return "..";
          case "..":
            return "...";
          default:
            return "";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div className="loading">Loading{animation}</div>;
};

export default BotLoading;
