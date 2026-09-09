import BlogArticle from "@/components/blog/BlogArticle";
import { getPost } from "@/lib/contentful";
import { absoluteUrl, safeJsonLd, siteConfig } from "@/lib/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

type LocalizedPostProps = {
  params: { locales: string; slug: string };
};

export async function generateMetadata({
  params,
}: LocalizedPostProps): Promise<Metadata> {
  if (decodeURIComponent(params.locales) !== "en") return {};

  const slug = decodeURIComponent(params.slug);
  const blog = await getPost("en-US", slug);
  if (!blog) return {};

  const path = `/en/post/${encodeURIComponent(slug)}`;
  const zhPath = `/post/${encodeURIComponent(blog.zhSlug)}`;
  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: path,
      languages: {
        "zh-Hant-HK": zhPath,
        "en-US": path,
        "x-default": zhPath,
      },
    },
    openGraph: {
      type: "article",
      url: path,
      locale: "en_CA",
      title: blog.title,
      description: blog.description,
      publishedTime: blog.createdAt,
      authors: [siteConfig.name],
      images: [{ url: blog.mainImage.url, alt: blog.mainImage.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.mainImage.url],
    },
  };
}

export default async function BlogPage({ params }: LocalizedPostProps) {
  if (decodeURIComponent(params.locales) !== "en") notFound();

  const slug = decodeURIComponent(params.slug);
  const blog = await getPost("en-US", slug);
  if (!blog) notFound();

  const questions = blog.questionAndAnswerCollection?.items ?? [];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: blog.title,
        description: blog.description,
        image: blog.mainImage.url,
        datePublished: blog.createdAt,
        inLanguage: "en-US",
        mainEntityOfPage: absoluteUrl(`/en/post/${encodeURIComponent(slug)}`),
        author: { "@type": "Organization", name: siteConfig.name },
        publisher: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Blog",
            item: absoluteUrl("/en"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: blog.title,
            item: absoluteUrl(`/en/post/${encodeURIComponent(slug)}`),
          },
        ],
      },
      ...(questions.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: questions.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
      />
      <BlogArticle locale="en-US" slug={slug} />
    </>
  );
}
