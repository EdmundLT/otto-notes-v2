import BlogArticle from "@/components/blog/BlogArticle";
import { getPost } from "@/lib/contentful";
import { absoluteUrl, safeJsonLd, siteConfig } from "@/lib/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Props } from "types";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug);
  const blog = await getPost("zh-Hant-HK", slug);
  if (!blog) return {};

  const path = `/post/${encodeURIComponent(slug)}`;
  const enPath = `/en/post/${encodeURIComponent(blog.enSlug)}`;
  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: path,
      languages: {
        "zh-Hant-HK": path,
        "en-US": enPath,
        "x-default": path,
      },
    },
    openGraph: {
      type: "article",
      url: path,
      locale: "zh_HK",
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

export default async function BlogPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);
  const blog = await getPost("zh-Hant-HK", slug);
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
        inLanguage: "zh-Hant-HK",
        mainEntityOfPage: absoluteUrl(`/post/${encodeURIComponent(slug)}`),
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
            name: "網誌",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: blog.title,
            item: absoluteUrl(`/post/${encodeURIComponent(slug)}`),
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
      <BlogArticle locale="zh-Hant-HK" slug={slug} />
    </>
  );
}
