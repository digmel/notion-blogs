import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Logo, SearchIcon } from "../icons";
import { BlogCard } from "./BlogCard";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<any>("");
  const [data, setData] = useState([]);
  const router = useRouter();

  const goHome = () => {
    setIsOpen(false);
    router.push("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setSearchResult([]);
  };

  useEffect(() => {
    const resJSON = localStorage.getItem("@blogs-data");
    const cachedData = resJSON && JSON.parse(resJSON);
    setData(cachedData);
  }, []);

  function handleSearch(e: any) {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);

    if (searchInput.length > 1) {
      setSearchResult(
        data.filter(
          (post: any) =>
            post?.title.includes(searchTerm) ||
            post?.description.includes(searchTerm) ||
            post?.tags.includes(searchTerm)
        )
      );
    } else {
      setSearchResult([]);
    }
  }

  return (
    <>
      <div className="py-2 md:px-40 flex justify-between items-center border-primary border-b border-opacity-10 bg-light ">
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
        <div className="bg-light flex flex-col justify-start items-center pt-8 px-8 h-screen">
          <input
            placeholder="Search..."
            onSubmit={toggleMenu}
            onChange={(e: any) => handleSearch(e)}
            autoFocus
            className={`h-10 w-80 md:h-16 md:w-96 border-b outline-none border-b-primary border-opacity-30 focus:border-b-primary bg-transparent px-4`}
          />

          <div className="overflow-x-scroll w-screen flex justify-center px-4 mb-24">
            {searchResult.length > 0 && (
              <div className="mt-8 md:mt-12 max-w-4xl grid gap-9 md:grid-cols-2">
                {searchResult.map((post: any) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
