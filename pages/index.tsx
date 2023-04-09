import React, { useEffect, useState } from "react";
import { Client } from "@notionhq/client";
import { GET_PUBLISHED_BLOGS_CONFIG } from "../constants";
import { generateAssets } from "../scripts/generateAssets";
import { BlogCard, TextInput } from "../components";
import { usePlatform } from "../hooks";

export default function Home({ data }: Record<string, any>) {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<any>("");
  const isMobile = usePlatform();

  useEffect(() => {
    localStorage.setItem("@blogs-data", JSON.stringify(data));
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
    <div className="min-h-screen mx-40">
      <main className="flex justify-center">
        <div className="h-full pt-4 pb-16">
          <div className="flex items-center justify-between my-12">
            <h1 className="text-2xl text-gray-600">
              {searchResult.length > 0 ? "Search Results:" : "Recent articles"}
            </h1>

            {!isMobile && (
              <TextInput
                variant="input"
                placeholder="Search"
                onChange={(e: any) => handleSearch(e)}
              />
            )}
          </div>

          <div className="max-w-none grid gap-9 md:grid-cols-3">
            {searchResult.length > 0
              ? searchResult.map((post: any) => (
                  <BlogCard key={post.id} post={post} />
                ))
              : data.map((post: any) => <BlogCard key={post.id} post={post} />)}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allBlocks: any[] = [];
  const blogPromises: any[] = [];
  try {
    const notion = new Client({
      auth: process.env.NOTION_ACCESS_TOKEN,
    });

    // Get published blogs
    const publishedBlogs = await notion.databases.query(
      GET_PUBLISHED_BLOGS_CONFIG
    );

    // Get all blogs data for caching
    publishedBlogs.results.forEach(async (blog: any) => {
      const blocks: any = notion.blocks.children.list({
        block_id: blog.id,
      });

      blogPromises.push(blocks);
    });

    await Promise.all(blogPromises).then((res) => allBlocks.push(res));

    const data = generateAssets(publishedBlogs.results, allBlocks[0]);

    return {
      props: {
        data: data,
      },
    };
  } catch ({ message }) {
    throw new Error(`Error when get blogs data from notion: ${message}`);
  }
}
