import { gql } from "@apollo/client";
import { client } from "apollo-client";
import React from "react";
import { Props } from "types";
import Blog from "./Blog";
import { Metadata } from "next";
import Script from "next/script";
import { getMainEntityFromCollection } from "util/JsonLdMainEntity";
export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const blogMetadata = await client
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
              slug
              description
            }
          }
        }
      `,
      variables: {
        slug: params.slug,
      },
    })
    .then((res) => res.data.blogsCollection.items[0]);

  return {
    title: blogMetadata.title,
    description: blogMetadata.description,
  };
}

const BlogPage = async ({ params }: Props) => {
  const blogQuestionAndAnswer = await client
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
            }
          }
        }
      `,
      variables: {
        slug: params.slug,
      },
    })
    .then(
      (res) =>
        res.data.blogsCollection.items[0].questionAndAnswerCollection,
    );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getMainEntityFromCollection(blogQuestionAndAnswer)
  };

  return (
    <section>
      
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Blog params={params} />
    </section>
  );
};

export default BlogPage;