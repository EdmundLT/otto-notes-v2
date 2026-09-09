import { gql } from "@apollo/client";
import { client } from "apollo-client";
import { cache } from "react";
import { BlogPost } from "types";

export type ContentLocale = "en-US" | "zh-Hant-HK";

export const getPosts = cache(
  async (locale: ContentLocale, category?: string): Promise<BlogPost[]> => {
    const response = await client.query({
      query: gql`
        query Posts($locale: String, $where: BlogsFilter, $limit: Int) {
          blogsCollection(locale: $locale, where: $where, limit: $limit) {
            items {
              title
              slug
              categories
              mainImage {
                url
                title
                width
                height
              }
              description
              createdAt
            }
          }
        }
      `,
      variables: {
        locale,
        limit: 100,
        where: category ? { categories_contains_some: category } : undefined,
      },
      fetchPolicy: "network-only",
    });

    return response.data.blogsCollection.items;
  },
);

export const getPost = cache(async (locale: ContentLocale, slug: string) => {
  const response = await client.query({
    query: gql`
      query Post($locale: String, $slug: String!, $limit: Int) {
        blogsCollection(
          locale: $locale
          where: { slug: $slug }
          limit: $limit
        ) {
          items {
            title
            body {
              json
              links {
                assets {
                  block {
                    title
                    description
                    url
                    width
                    height
                    sys {
                      id
                    }
                  }
                }
              }
            }
            slug
            enSlug: slug(locale: "en-US")
            zhSlug: slug(locale: "zh-Hant-HK")
            categories
            mainImage {
              url
              title
              width
              height
            }
            description
            createdAt
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
    variables: { locale, slug, limit: 1 },
    fetchPolicy: "network-only",
  });

  return response.data.blogsCollection.items[0] as BlogPost | undefined;
});
