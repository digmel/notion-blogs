import React, { useEffect } from "react";
import { Client } from "@notionhq/client";
import { GET_PUBLISHED_BLOGS_CONFIG } from "../constants";
import { formatBlogsData } from "../helpers";
import { BlogCard } from "../components";

export default function Home({ data }: Record<string, any>) {
  useEffect(() => {
    localStorage.setItem("@blogs-data", JSON.stringify(data));
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
              {data.map((post: any) => (
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

    const data = formatBlogsData(publishedBlogs.results, allBlocks[0]);

    return {
      props: {
        blogs: publishedBlogs.results,
        data: data,
      },
    };
  } catch ({ message }) {
    throw new Error(`Error when get blogs data from notion: ${message}`);
  }
}
