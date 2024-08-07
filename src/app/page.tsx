"use client";
import { gql } from "@apollo/client";
import { client } from "apollo-client";
import { useEffect, useState } from "react";
import { BlogPost, LocaleProps } from "types";

export default function Home({ params }: LocaleProps) {
  params.locales = decodeURIComponent(params.locales);
  const [blogsCollection, setBlogsCollection] = useState<BlogPost[]>([]);
  let userLocale: string;
  params.locales === "en"
    ? (userLocale = "en-US")
    : (userLocale = "zh-Hant-HK");

  function queryByLocales() {
    client
      .query({
        query: gql`
          query ($locale: String) {
            blogsCollection(locale: $locale) {
              items {
                title
                slug
                categories
                mainImage {
                  url
                }
                description
                createdAt
              }
            }
          }
        `,
        variables: {
          locale: userLocale,
        },
      })
      .then((result: any) => {
        console.log(result.data.blogsCollection.items);
        setBlogsCollection(result.data.blogsCollection.items);
      });
  }

  useEffect(() => {
    queryByLocales();
  }, []);
  return (
    <>
      <h1 className="mb-12 text-center font-sans text-3xl font-semibold">
        Our Blog
      </h1>
      <div className="mx-auto grid max-w-screen-lg justify-center px-4 sm:grid-cols-2 sm:gap-4 sm:px-8 md:grid-cols-3"> 
        {blogsCollection.map((blog: BlogPost) => {
          return (
            <article
              key={blog.slug}
              className="mx-auto my-4 flex w-full flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white text-gray-900 transition hover:shadow-lg"
            >
              <a href={`/post/${blog.slug}`}>
                <img
                  className="h-56 w-full object-cover"
                  src={blog.mainImage.url}
                  alt={blog.title}
                />
                <div className="flex-auto px-3 py-5">
                  <div className="flex justify-start">
                    {blog.categories.map((category) => {
                      return (
                        <p
                          key={category}
                          className="mx-1 select-none rounded-3xl bg-[#1FB2A5] text-white  px-3 text-center font-semibold  shadow-lg"
                        >
                          {category}
                        </p>
                      );
                    })}
                  </div>
                  <h3 className="mb-3 mt-4 text-xl font-semibold xl:text-2xl">
                    {blog.title} 
                  </h3>
                  {blog.mainImage.title}
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
}
