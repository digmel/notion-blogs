import Link from "next/link";
import React, { useState } from "react";
import { Logo, MenuCloseIcon, MenuIcon } from "../icons";
import { Text } from "./Text";
import { usePlatform } from "../hooks";
import { useRouter } from "next/router";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = usePlatform();
  const router = useRouter();

  const goHome = () => {
    router.push("/");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className="bg-light py-5 px-6 flex justify-between items-center shadow-sm">
            <a className="flex hover:opacity-70" onClick={goHome}>
              <Logo />
            </a>
            <a className="flex" onClick={toggleMenu}>
              {isOpen ? <MenuCloseIcon /> : <MenuIcon />}
            </a>
          </div>

          {isOpen && (
            <div className="bg-light justify-start items-start md:justify-center min-h-screen py-8 px-8">
              <div className="flex flex-col mt-12 gap-12">
                <Link
                  href="#services-section"
                  className="hover:opacity-70"
                  onClick={() => setIsOpen(false)}
                >
                  <Text variant="label">Home</Text>
                </Link>

                <Link
                  href="#about-section"
                  className="hover:opacity-70"
                  onClick={() => setIsOpen(false)}
                >
                  <Text variant="label">Contact</Text>
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-light py-3 px-40 flex justify-between items-center shadow-sm">
          <a className="flex hover:opacity-70" onClick={goHome}>
            <Logo />
          </a>

          <div className="md:flex flex-row items-center gap-12">
            <Link href="/" className="hover:opacity-70">
              <Text variant="title" className="text-gray-600">
                Home
              </Text>
            </Link>

            <Link href="/contact" className="hover:opacity-70">
              <Text variant="body" className="text-gray-600">
                Contact
              </Text>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
