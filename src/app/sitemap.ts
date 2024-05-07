import { gql } from "@apollo/client";
import { client } from "apollo-client";

export default async function sitemap() {
  const urls = [
    {
      url: "https://Halfwaynotes.com",
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
            url: `https://Halfwaynotes.com/post/${zhSlug}`,
            priority: 1,
          };
        },
      );
      console.log(zh);
      en = res.data.blogsCollection.items.map(({ slug }: { slug: string }) => {
        return {
          url: `https://Halfwaynotes.com/en/post/${slug}`,
          priority: 1,
        };
      });
      console.log(en);
    });

  return [...urls, ...zh, ...en];
}
