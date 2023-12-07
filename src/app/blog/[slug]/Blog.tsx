"use client";
import { gql } from "@apollo/client";
import { client } from "apollo-client";
import React, { useEffect, useState } from "react";
import { BlogPost, Props } from "types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


const Blog = ({ params }: Props) => {
    const [blog, setBlog] = useState<BlogPost>();
    async function getBlog() {
      params.slug = decodeURIComponent(params.slug);
      await client
        .query({
          query: gql`
            query ($preview: Boolean, $slug: String!) {
              blogsCollection(preview: $preview, where: { slug: $slug }) {
                items {
                  questionAndAnswerCollection {
                    items {
                      question
                      answer
                    }
                  }
                  title
                  body {
                    json
                  }
                  slug
                  categories
                  mainImage {
                    url
                    title
                  }
                  description
                  createdAt
                }
              }
            }
          `,
          variables: {
            slug: params.slug,
          },
        })
        .then((res) => {
          console.log(res.data.blogsCollection.items[0]);
          setBlog(res.data.blogsCollection.items[0]);
        });
    }
  
    useEffect(() => {
      getBlog();
    }, []);
  
    const Heading1 = ({ children }: any) => (
      <h1 className="py-1 text-3xl">{children}</h1>
    );
    const Heading2 = ({ children }: any) => (
      <h2 className="text-2xl">{children}</h2>
    );
    const Heading3 = ({ children }: any) => (
      <h3 className="py-1 text-xl font-medium">{children}</h3>
    );
    const Text = ({ children }: any) => <p className="text-lg">{children}</p>;
    const OrderedList = ({ children }: any) => (
      <ol className="list-disc pl-4">{children}</ol>
    );
    const ListItem = ({ children }: any) => <li className="py-1">{children}</li>;
    const Link = ({ children, href }: any) => (
      <a className="text-blue-700 underline hover:text-blue-950" href={href}>
        {children}
      </a>
    );
  
    const RichTextoptions = {
      renderNode: {
        [BLOCKS.HEADING_1]: (node: any, children: any) => (
          <Heading1>{children}</Heading1>
        ),
        [BLOCKS.HEADING_2]: (node: any, children: any) => (
          <Heading2>{children}</Heading2>
        ),
        [BLOCKS.HEADING_3]: (node: any, children: any) => (
          <Heading3>{children}</Heading3>
        ),
        [BLOCKS.PARAGRAPH]: (node: any, children: any) => <Text>{children}</Text>,
        [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
          <ListItem>{children}</ListItem>
        ),
        [INLINES.HYPERLINK]: (node: any, children: any) => (
          <Link href={node.data.uri}>{children}</Link>
        ),
      },
  
      renderText: (text: any) => text.replace("!", "?"),
    };
  
    return (
      <main>
        <article>
          <header className="mx-auto max-w-screen-xl pt-10 text-center">
            <p className="text-gray-500">
              Published{" "}
              {new Date(blog?.createdAt!).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              {blog?.title}
            </h1>
            <p className="mt-6 text-lg text-gray-700">{blog?.description}</p>
            <div
              className="mt-6 flex flex-wrap justify-center gap-2"
              aria-label="Tags"
            >
              {blog?.categories.map((category) => {
                return (
                  <button
                    key={category}
                    className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200"
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <img
              className="mt-5 w-full object-contain sm:h-[34rem]"
              src={blog?.mainImage.url}
              alt={blog?.mainImage.title}
            />
          </header>
  
          {blog ? (
          <div className="mx-auto mt-5 max-w-screen-md space-y-12 px-4 py-5 text-lg tracking-wide text-gray-700">
            {documentToReactComponents(blog.body.json, RichTextoptions)}
          </div>
        ) : (
          <div></div>
        )}
        </article>
      </main>
    );
  };
  
  export default Blog;