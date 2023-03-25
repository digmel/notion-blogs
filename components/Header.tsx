import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Logo, SearchIcon } from "../icons";
import * as JsSearch from "js-search";
import { BlogCard } from "./BlogCard";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<any>("");
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

  const search = new JsSearch.Search("isbn");
  search.addIndex("title");
  search.addIndex("description");
  search.addIndex("tags");

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyboardEvent);
    }

    const resJSON = localStorage.getItem("@blogs-data");
    const cachedData = resJSON && JSON.parse(resJSON);

    search.addDocuments(cachedData);

    const _searchResult = search.search(searchInput);
    if (_searchResult.length > 0 && searchInput.length > 0) {
      setSearchResult(_searchResult);
    } else {
      setSearchResult([]);
    }
  }, [searchInput]);

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
        <div className="bg-light flex flex-col justify-start items-center min-h-screen py-8 px-8">
          <input
            placeholder="Search..."
            onSubmit={toggleMenu}
            onChange={(e: any) => setSearchInput(e.target.value)}
            autoFocus
            className={`h-10 w-80 md:h-16 md:w-96 border-b outline-none border-b-primary border-opacity-30 focus:border-b-primary bg-transparent px-4`}
          />

          {searchResult.length > 0 && (
            <div className="mt-8 md:mt-12 max-w-4xl grid gap-5 lg:grid-cols-2">
              {searchResult.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
