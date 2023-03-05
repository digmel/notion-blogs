import React from "react";
import { useRouter } from "next/router";
import { Logo, MenuIcon } from "../icons";

export const Header = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  const openMenu = () => {
    // TODO: Add open menu logic here
  };

  return (
    <div className="py-2 md:px-24 flex justify-between items-center border-primary border-b border-opacity-10 bg-light">
      <a className="md:scale-100 scale-75 -ml-3 md:-ml-0" onClick={goHome}>
        <Logo />
      </a>

      <a
        className="md:scale-100 scale-90 mt-2 mr-2 text-primary"
        onClick={openMenu}
      >
        <MenuIcon />
      </a>
    </div>
  );
};
