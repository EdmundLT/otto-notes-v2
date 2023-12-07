import { gql } from "@apollo/client";
import { client } from "apollo-client";

export default async function sitemap() {
  const urls = [
    {
      url: "https://otto-notes.com",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/zh",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/category/Life",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/zh/category/Life",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/category/Immigrant",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/zh/category/Immigrant",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/category/Study",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/zh/category/Study",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/category/Working",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/zh/category/Working",
      priority: 1,
    },
  ];
  let zh: any = [];
  let en: any = [];
  await client
    .query({
      query: gql`
        query Query($locale: String) {
          blogsCollection {
            items {
              zhSlug: slug(locale: $locale)
              slug
            }
          }
        }
      `,
      variables: {
        locale: "zh-Hant-HK",
      },
    })
    .then((res) => {
      zh = res.data.blogsCollection.items.map(
        ({ zhSlug }: { zhSlug: string }) => {
          return {
            url: `https://otto-notes.com/zh/blog/${zhSlug}`,
            priority: 1,
          };
        },
      );
      console.log(zh);
      en = res.data.blogsCollection.items.map(({ slug }: { slug: string }) => {
        return {
          url: `https://otto-notes.com/blog/${slug}`,
          priority: 1,
        };
      });
      console.log(en);
    });

  return [...urls, ...zh, ...en];
}
