import { GetStaticProps, InferGetStaticPropsType } from "next";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import NotionService from "../../services/notionServices";
import style from "../../styles/markdown.module.css";
import { useEffect } from "react";
import { Client } from "@notionhq/client";

let slug = "";

const Post = ({
  post,
  markdown,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    const resJSON = localStorage.getItem("posts");
    const posts = resJSON && JSON.parse(resJSON);

    console.log("post", posts);
  }, []);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={post.description}
        />
        <meta name={"og:title"} title={"og:title"} content={post.title} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={post.description}
        />
        <meta name={"og:image"} title={"og:image"} content={post.cover} />
      </Head>

      <div className="min-h-screen">
        <main className="md:max-w-5xl md:mx-auto md:relative">
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-center font-bold self-center">{post.title}</h1>
            <article className="max-w-prose">
              <ReactMarkdown className={style.reactMarkDown}>
                {markdown}
              </ReactMarkdown>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const notion = new Client({
  //   auth: process.env.NOTION_ACCESS_TOKEN,
  // });

  // const database = process.env.NOTION_BLOG_DATABASE_ID ?? "";

  // slug = context.params?.slug as string;

  // const res = await notion.databases.query({
  //   database_id: database,
  //   filter: {
  //     property: "Slug",
  //     formula: {
  //       text: {
  //         equals: slug,
  //       },
  //     },
  //   },
  //   sorts: [
  //     {
  //       property: "Updated",
  //       direction: "descending",
  //     },
  //   ],
  // });

  // // console.log("first", res);

  // try {
  //   const response: any = await notion.blocks.children.list({
  //     block_id: res.results[0].id,
  //   });

  //   // console.log("firstttt", response.results[0].paragraph.text[0].plain_text);
  // } catch (error) {
  //   console.log("errr", error);
  // }

  const notionService = new NotionService();

  // @ts-ignore
  const p = await notionService.getSingleBlogPost(context.params?.slug);

  if (!p) {
    throw new Error("Error when fetching single blog post");
  }

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  const paths = posts.map((post) => {
    return `/post/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Post;
