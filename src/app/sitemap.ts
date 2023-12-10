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
      url: "https://otto-notes.com/category/生活",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/en/category/Life",
      priority: 1,
    },
    {
      url: "https://otto-notes.comcategory/移民",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/en/category/Immigrant",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/category/讀書",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/en/category/Study",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/category/工作",
      priority: 1,
    },
    {
      url: "https://otto-notes.com/en/category/Working",
      priority: 1,
    },
  ];
  let zh: any = [];
  let en: any = [];
  await client
    .query({
      query: gql`
      query Query($locale: String, $limit: Int) {
        blogsCollection(limit: $limit) {
          items {
            zhSlug: slug(locale: $locale)
            slug
          }
        }
      }
      `,
      variables: {
        locale: "zh-Hant-HK",
        limit: 100
      },
    })
    .then((res) => {
      zh = res.data.blogsCollection.items.map(
        ({ zhSlug }: { zhSlug: string }) => {
          return {
            url: `https://otto-notes.com/blog/${zhSlug}`,
            priority: 1,
          };
        },
      );
      console.log(zh);
      en = res.data.blogsCollection.items.map(({ slug }: { slug: string }) => {
        return {
          url: `https://otto-notes.com/en/blog/${slug}`,
          priority: 1,
        };
      });
      console.log(en);
    });

  return [...urls, ...zh, ...en];
}
