import { blogCategories } from "@/data/categories";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/lib/site";
import { gql } from "@apollo/client";
import { client } from "apollo-client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/en"), changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/tools"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/en/tools"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.4 },
    {
      url: absoluteUrl("/privacy-policy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = blogCategories.flatMap(
    ({ zh, en }) => [
      {
        url: absoluteUrl(`/category/${encodeURIComponent(zh)}`),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      {
        url: absoluteUrl(`/en/category/${encodeURIComponent(en)}`),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
    ],
  );

  const response = await client.query({
    query: gql`
      query SitemapPosts($limit: Int) {
        blogsCollection(limit: $limit) {
          items {
            enSlug: slug(locale: "en-US")
            zhSlug: slug(locale: "zh-Hant-HK")
            createdAt
          }
        }
      }
    `,
    variables: { limit: 100 },
    fetchPolicy: "network-only",
  });

  const postPages: MetadataRoute.Sitemap =
    response.data.blogsCollection.items.flatMap(
      (post: { enSlug: string; zhSlug: string; createdAt: string }) => [
        {
          url: absoluteUrl(`/post/${encodeURIComponent(post.zhSlug)}`),
          lastModified: new Date(post.createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        },
        {
          url: absoluteUrl(`/en/post/${encodeURIComponent(post.enSlug)}`),
          lastModified: new Date(post.createdAt),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        },
      ],
    );

  const toolPages: MetadataRoute.Sitemap = tools.flatMap((tool) => [
    {
      url: absoluteUrl(`/tools/${tool.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl(`/en/tools/${tool.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  return [...staticPages, ...categoryPages, ...postPages, ...toolPages];
}
