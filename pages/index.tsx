import { GetServerSideProps } from "next";
import NotionService from "../services/notionServices";
import { BlogPost } from "../@types/schema";
import { BlogCard } from "../components";

export const getServerSideProps: GetServerSideProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }: any) {
  return (
    <>
      <div className="min-h-screen">
        <main className="max-w-4xl mx-auto relative">
          <div className="h-full pt-4 pb-16 mx-auto">
            <div className="flex items-center justify-start">
              <h1 className="text-2xl">Latest</h1>
            </div>
            <div className="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
              {posts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
