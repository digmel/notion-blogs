import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Client } from "@notionhq/client";
import { GET_PUBLISHED_BLOGS_CONFIG } from "../../constants";
import { useRouter } from "next/router";
import Image from "next/image";

const Blog = () => {
  const router = useRouter();
  const [blog, setBlog] = useState<any>({});

  useEffect(() => {
    const resJSON = localStorage.getItem("@blogs-data");
    const cachedData = resJSON && JSON.parse(resJSON);

    const currentBlog = cachedData.find(
      (blog: any) => blog.slug === router.query.slug
    );

    setBlog(currentBlog);
  }, []);

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={blog.description}
        />
        <meta name={"og:title"} title={"og:title"} content={blog.title} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={blog.description}
        />
        <meta name={"og:image"} title={"og:image"} content={blog.cover} />
      </Head>

      <div className="min-h-screen mb-32 w-screen">
        <main className="flex flex-col justify-center items-center">
          <h1 className="mx-8 py-4 text-center max-w-[800px] font-bold text-primary md:text-2xl text-xl">
            {blog.title}
          </h1>

          <article className="max-w-[800px]">
            {blog?.blocks &&
              blog?.blocks.map((block: any) => {
                if (block.type === "paragraph") {
                  return (
                    <div className="py-1 mx-4" key={block.id}>
                      <p>{block.paragraph.text[0]?.plain_text}</p>
                    </div>
                  );
                }

                if (block.type === "heading_3") {
                  return (
                    <div className="py-1 mx-4" key={block.id}>
                      <a
                        href={block.heading_3.text[0]?.href}
                        className="text-blue-600 font-semibold hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {block.heading_3.text[0]?.plain_text}
                      </a>
                    </div>
                  );
                }

                if (block.type === "image") {
                  return (
                    <div
                      className="flex-shrink-0 py-8 mx-4 flex justify-center"
                      key={block.id}
                    >
                      <Image
                        className="object-fit max-w-3/5 max-h-[400px] rounded-lg"
                        src={`/assets/${block.id}.webp` ?? ""}
                        width={800}
                        height={600}
                        alt=""
                      />
                    </div>
                  );
                }
              })}
          </article>
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  // This empty function is required for getStaticPaths.
  return {
    props: {},
  };
};

export async function getStaticPaths() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_ACCESS_TOKEN,
    });

    const res = await notion.databases.query(GET_PUBLISHED_BLOGS_CONFIG);

    const paths = res.results.map((blog: any) => {
      return `/blog/${blog.properties.Slug.formula.string}`;
    });

    return {
      paths,
      fallback: false,
    };
  } catch ({ message }) {
    throw new Error(`Error when generate blog static paths: ${message}`);
  }
}

export default Blog;
