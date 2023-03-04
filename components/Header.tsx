import React from "react";
import { Logo } from "../icons";

export const Header = () => {
  return (
    <div className="pt-4 pb-2 px-6 md:px-24 flex justify-between  border-zinc-800 border-b border-opacity-10 ">
      <Logo />
    </div>
  );
};
