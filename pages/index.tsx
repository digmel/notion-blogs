import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import NotionService from "../services/notionServices";
import { BlogPost } from "../@types/schema";
import { Layout, BlogCard } from "../components";

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Home">
      <div className="min-h-screen">
        <main className="max-w-5xl mx-auto relative">
          <div className="h-full pt-4 pb-16 mx-auto">
            <div className="flex items-center justify-start">
              <h1 className="font-extrabold text-4xl text-black">Latest</h1>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
