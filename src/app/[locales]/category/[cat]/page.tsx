import PostCollection from "@/components/PostCollection";
import { findCategoryPair } from "@/data/categories";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: { locales: string; cat: string };
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  if (decodeURIComponent(params.locales) !== "en") return {};

  const category = decodeURIComponent(params.cat);
  const path = `/en/category/${encodeURIComponent(category)}`;
  const pair = findCategoryPair(category);
  const zhPath = pair ? `/category/${encodeURIComponent(pair.zh)}` : undefined;

  return {
    title: `${category} articles`,
    description: `Browse ${category.toLowerCase()} articles and practical information from Otto Notes.`,
    alternates: {
      canonical: path,
      ...(zhPath && {
        languages: {
          "zh-Hant-HK": zhPath,
          "en-US": path,
          "x-default": zhPath,
        },
      }),
    },
    openGraph: {
      title: `${category} articles | Otto Notes`,
      description: `Browse ${category.toLowerCase()} articles and practical information from Otto Notes.`,
      url: path,
      locale: "en_CA",
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  if (decodeURIComponent(params.locales) !== "en") notFound();

  return (
    <PostCollection locale="en-US" category={decodeURIComponent(params.cat)} />
  );
}
