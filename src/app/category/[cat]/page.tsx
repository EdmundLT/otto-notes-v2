"use client";
import { gql } from "@apollo/client";
import { client } from "apollo-client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BlogPost } from "types";

const Page = () => {
  const { locales, cat }:{locales: string, cat: string}  = useParams();
  const [blogsCollection, setBlogsCollection] = useState<BlogPost[]>([]);
  let userLocale: string;
  locales === "en"
    ? (userLocale = "en-US")
    : (userLocale = "zh-Hant-HK");

  function queryByLocalesAndCategory() {
    client
      .query({
        query: gql`
        query BlogsCollection($where: BlogsFilter, $locale: String) {
          blogsCollection(where: $where, locale: $locale) {
            items {
              categories
              description
              title
              mainImage {
                title
                url
              }
              slug
            }
          }
        }
        `,
        variables: {
          "where": {
            "categories_contains_some": decodeURIComponent(cat)
          },
          "locale": userLocale,
        },
      })
      .then((result: any) => {
        console.log(result.data.blogsCollection.items);
        setBlogsCollection(result.data.blogsCollection.items);
      });
  }

  useEffect(() => {
    queryByLocalesAndCategory();
  }, []);

  return (
    <>
      <h1 className="mb-12 text-center font-sans text-3xl font-semibold">
        Our Blog
      </h1>
      <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3">
        {/* <BlogList blogList={blogsCollection} /> */}
        {blogsCollection.map((blog: BlogPost) => {
          return (
            // <a>
            //   <p>{blog.title}</p>
            //   <p>{blog.description}</p>
            //   {blog.categories.map((category) => {
            //     return <p>{category}</p>;
            //   })}
            //   <p>{blog.createdAt}</p>
            // </a>
            <article
              key={blog.slug}
              className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:shadow-lg"
            >
              <a href={`/blog/${blog.slug}`}>
                <img
                  src={blog.mainImage.url}
                  className="h-56 w-full object-cover"
                  alt={blog.mainImage.title}
                />
                <div className="flex-auto px-3 py-5">
                  <div className="flex justify-start">
                    {blog.categories.map((category) => {
                      return (
                        <p
                          key={category}
                          className="mx-1 select-none rounded-3xl bg-[#1FB2A5] px-3 text-center font-semibold  shadow-lg text-white"
                        >
                          {category}
                        </p>
                      );
                    })}
                  </div>
                  <h3 className="mb-3 mt-4 text-xl font-semibold xl:text-2xl">
                    {blog.title}
                  </h3>
                  <p className="mb-4 text-base font-light">
                    {blog.description.substring(0, 100)}...
                  </p>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Page;
