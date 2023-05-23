import React from "react";
import { usePlatform } from "../hooks";
import { LinkedinIcon, Logo, TwitterIcon } from "../icons";
import { Text } from "./Text";

export const Footer = () => {
  const isMobile = usePlatform();

  return (
    <div className="py-8 md:px-40 px-6 flex items-start md:justify-between border-t border-gray-100 bg-gray-50 border-opacity-50 flex-col md:flex-row">
      <div className="flex flex-col">
        {!isMobile && (
          <div className="pb-2">
            <Logo />
          </div>
        )}
        <Text variant="label" className="text-gray-500">
          2023 © All Rights Reserved.
        </Text>
      </div>

      {!isMobile && (
        <div className="flex flex-row w-full justify-evenly">
          <div className="gap-4 flex flex-col">
            <a href={"/"} rel="noreferrer">
              <Text variant="link" className="text-gray-500">
                Home
              </Text>
            </a>

            <a href={"/contact"} rel="noreferrer">
              <Text variant="link" className="text-gray-500">
                Contact
              </Text>
            </a>
          </div>

          <div className="gap-4 flex flex-col">
            <a
              href={"/"}
              rel="noreferrer"
              target="_blank"
              className="flex flex-row gap-2"
            >
              <TwitterIcon />
              <Text variant="link" className="text-gray-500">
                Twitter
              </Text>
            </a>

            <a
              href={"https://www.linkedin.com/company/smugglebuy/"}
              rel="noreferrer"
              target="_blank"
              className="flex flex-row gap-2"
            >
              <LinkedinIcon />
              <Text variant="link" className="text-gray-500">
                Linkedin
              </Text>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
