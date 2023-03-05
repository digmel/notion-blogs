import React from "react";
import { Logo, MenuIcon } from "../icons";

export const Header = () => {
  return (
    <div className="py-2 md:px-24 flex justify-between items-center border-primary border-b border-opacity-10">
      <div className="md:scale-100 scale-75">
        <Logo />
      </div>

      <div className="md:scale-100 scale-90 mt-2 mr-2 text-primary">
        <MenuIcon />
      </div>
    </div>
  );
};
