import { FunctionComponent } from "react";
import Link from "next/link";
import { BlogPost } from "../@types/schema";
import dayjs from "dayjs";
import { Text } from "./Text";
import { ClockIcon } from "../icons";
import Image from "next/image";

type BlogCardProps = {
  post: BlogPost;
};
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export const BlogCard: FunctionComponent<BlogCardProps> = ({ post }) => {
  function generateRandomNumber() {
    return Math.floor(Math.random() * 11) + 5;
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="transition duration-300 md:hover:scale-105">
        <div
          key={post.title}
          className="flex flex-col rounded-lg shadow-md overflow-hidden h-[500px] w-[400px]"
        >
          <div className="flex-shrink-0 relative h-[250px] w-[400px]">
            <Image fill src={post.cover} alt="" />
          </div>

          <div className="flex-1 bg-light pt-2 pb-4 px-6 flex flex-col justify-between min-h-[240px]">
            <div className="flex-1">
              <span className="block mt-2">
                <Text variant="title" className="text-gray-600">
                  {post.title}
                </Text>
              </span>

              <span className="flex flex-row mt-2 space-x-4">
                {post.tags.map((tag, index) => (
                  <>
                    {index < 3 && (
                      <Text
                        key={tag.id}
                        variant="label"
                        className="text-gray-400"
                      >
                        #{tag.name}
                      </Text>
                    )}
                  </>
                ))}
              </span>

              <span className="block mt-4">
                <Text variant="label" className="text-gray-500">
                  {post.description}
                </Text>
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex flex-row justify-center items-center mt-2">
                <ClockIcon />
                <Text variant="label" className="ml-1 text-gray-400">
                  {generateRandomNumber().toString()}m
                </Text>
              </span>

              <span className="block mt-2">
                <Text variant="label" className="text-gray-400">
                  {dayjs(post.date).format("LL")}
                </Text>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
