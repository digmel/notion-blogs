import React, { useEffect } from "react";
import { Client } from "@notionhq/client";
import { GET_PUBLISHED_BLOGS_CONFIG } from "../constants";
import { generateAssets } from "../scripts/generateAssets";
import { BlogCard } from "../components";

export default function Home({ data }: Record<string, any>) {
  useEffect(() => {
    localStorage.setItem("@blogs-data", JSON.stringify(data));
  }, []);

  return (
    <div className="min-h-screen mx-40">
      <main className="flex justify-center">
        <div className="h-full pt-4 pb-16">
          <div className="flex items-center justify-start mb-4">
            <h1 className="text-2xl">Latest</h1>
          </div>

          <div className=" max-w-none grid gap-9 md:grid-cols-3">
            {data.map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
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
