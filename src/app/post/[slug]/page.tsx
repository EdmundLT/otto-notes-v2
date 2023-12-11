
import { gql } from "@apollo/client";
import { client } from "apollo-client";
import React from "react";
import type { Props } from "types";
import Blog from "./Blog";
import { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";
import { getMainEntityFromCollection } from "util/JsonLdMainEntity";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  params.slug = decodeURIComponent(params.slug);
  const blogMetadata = await client
    .query({
      query: gql`
        query ($preview: Boolean, $slug: String!, $locale: String) {
          blogsCollection(
            preview: $preview
            where: { slug: $slug }
            locale: $locale
          ) {
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
        locale: "zh-Hant-HK",
      },
    })
    .then((res) => res.data.blogsCollection.items[0]);

  return {
    title: blogMetadata.title,
    description: blogMetadata.description,
  };
}

const BlogPage = async ({ params }: Props) => {
  params.slug = decodeURIComponent(params.slug);
  const blogQuestionAndAnswer = await client
    .query({
      query: gql`
        query ($preview: Boolean, $slug: String!, $locale: String) {
          blogsCollection(
            preview: $preview
            where: { slug: $slug }
            locale: $locale
          ) {
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
        locale: "zh-Hant-HK",
      },
    })
    .then(
      (res) => res.data.blogsCollection.items[0].questionAndAnswerCollection,
    );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getMainEntityFromCollection(blogQuestionAndAnswer),
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
