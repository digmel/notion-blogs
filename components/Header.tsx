import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Logo, SearchIcon } from "../icons";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const goHome = () => {
    setIsOpen(false);
    router.push("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyboardEvent = (event: any) => {
    if (event.key === "Enter") {
      // TODO: Add Search logic here
      toggleMenu();
    }

    if (event.key === "Escape") {
      toggleMenu();
    }

    return event;
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyboardEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="py-2 md:px-24 flex justify-between items-center border-primary border-b border-opacity-10 bg-light">
        <a
          className="md:scale-100 scale-75 -ml-3 md:-ml-0 hover:opacity-70"
          onClick={goHome}
        >
          <Logo />
        </a>

        <a
          className="md:scale-100 scale-90 mt-1 md:mt-0 mr-4 text-primary hover:opacity-70"
          onClick={toggleMenu}
        >
          <SearchIcon />
        </a>
      </div>
      {isOpen && (
        <div className="bg-light flex justify-start items-start md:justify-center min-h-screen py-8 px-8">
          <input
            placeholder="Search..."
            onSubmit={toggleMenu}
            autoFocus
            className={`h-10 w-80 md:h-16 md:w-96 border-b outline-none border-b-primary border-opacity-30 focus:border-b-primary bg-transparent z-0 px-4`}
          />
        </div>
      )}
    </>
  );
};
