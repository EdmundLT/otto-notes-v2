"use client";
import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
const BlogList = ({ blogList }: any) => {

  return (
    <>
      <div className="divider">Blog</div>
      <div className="grid grid-cols-1 gap-10 gap-y-16 px-10 md:grid-cols-2">
        {blogList.map((blog: any) => {
          <a href={"/post/" + blog.slug} key={blog.slug}>
            <div className="group flex cursor-pointer flex-col">
              <div className="relative h-80 w-full drop-shadow-xl transition-transform duration-200 ease-out group-hover:scale-105">
                <div className="flex flex-col items-center gap-y-2 md:flex-row md:gap-x-2">
                  {/* {blog.categories.map((category, idx) => (
                             <div
                               key={idx}
                               className="badge badge-lg badge-accent"
                             >
                               <p className="text-xs text-black">{category.category}</p>
                             </div>
                           ))} */}
                </div>
                <img
                  className="object-cover object-left lg:object-center"
                  src={blog.mainImage.url}
                  alt={blog.mainImage.url}
                />
                <div className="absolute right-0 top-0 flex flex-col items-center gap-y-2 p-4 md:flex-row md:gap-x-2">
                  {blog.categories.map((category: string) => (
                    <div key={category} className="badge badge-lg badge-accent">
                      <p className="text-sm text-white">{category}</p>
                    </div>
                  ))}
                </div>
                <div
                  className="absolute bottom-0 flex w-full
                     justify-between rounded bg-black bg-opacity-20 p-4 text-white drop-shadow-lg backdrop-blur-lg"
                >
                  <div>
                    <p className="font-ntsc w-full text-lg font-bold">
                      {blog.title} + {blog.mainImage}
                    </p>

                    {/* <p>
                               {new Date(post._createdAt).toLocaleDateString("en-US", {
                                 day: "numeric",
                                 month: "long",
                                 year: "numeric",
                               })}
                             </p> */}
                  </div>
                </div>
              </div>
              <div className="text-neutral mt-5 flex-1">
                {/* <p className="underline text-lg font-bold">{post.title}</p> */}
                <p className="line-clamp-2 text-gray-500">{blog.description}</p>
              </div>
              <p className="text-neutral mt-5 flex items-center font-bold group-hover:underline">
                {" "}
                Read Post
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </p>
            </div>
          </a>;
        })}
      </div>
    </>
  );
};

export default BlogList;
