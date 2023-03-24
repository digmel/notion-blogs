import React, { useEffect, useState } from "react";
import { Client } from "@notionhq/client";
import { GET_PUBLISHED_BLOGS_CONFIG } from "../constants";
import { generateBlogCover } from "../helpers";
import { BlogCard } from "../components";

export default function Home({ blogs }: Record<string, any>) {
  const [blogCards, setBlogCards] = useState([]);

  useEffect(() => {
    const cards = blogs.map((blog: unknown) => {
      return generateBlogCover(blog);
    });

    setBlogCards(cards);
    localStorage.setItem("posts", JSON.stringify(blogs));
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <main className="max-w-4xl mx-auto relative">
          <div className="h-full pt-4 pb-16 mx-auto">
            <div className="flex items-center justify-start">
              <h1 className="text-2xl">Latest</h1>
            </div>
            <div className="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
              {blogCards.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_ACCESS_TOKEN,
    });

    const res = await notion.databases.query(GET_PUBLISHED_BLOGS_CONFIG);

    return {
      props: {
        blogs: res.results,
      },
    };
  } catch ({ message }) {
    throw new Error(`Error when get blogs data from notion: ${message}`);
  }
}
