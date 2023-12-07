"use client";
import { gql } from "@apollo/client";
import { client } from "apollo-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LocaleProps, BlogPost } from "types";

export default function Home({ params }: LocaleProps) {
  params.locales = decodeURIComponent(params.locales);
  const router = useRouter();
  const [blogsCollection, setBlogsCollection] = useState<BlogPost[]>([]);
  let userLocale: string;
  params.locales === "zh"
    ? (userLocale = "zh-Hant-HK")
    : (userLocale = "en-US");

  async function queryByLocales() {
    await client
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
              <a href={`/zh/blog/${blog.slug}`}>
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
                          className="mx-1 rounded-3xl bg-purple-300 px-3 text-center font-semibold shadow-lg"
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
}