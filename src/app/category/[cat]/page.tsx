import PostCollection from "@/components/PostCollection";
import { findCategoryPair } from "@/data/categories";
import { Metadata } from "next";

type CategoryPageProps = {
  params: { cat: string };
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = decodeURIComponent(params.cat);
  const path = `/category/${encodeURIComponent(category)}`;
  const pair = findCategoryPair(category);
  const enPath = pair
    ? `/en/category/${encodeURIComponent(pair.en)}`
    : undefined;

  return {
    title: `${category}文章`,
    description: `瀏覽 Otto Notes 的${category}相關文章與實用資訊。`,
    alternates: {
      canonical: path,
      ...(enPath && {
        languages: {
          "zh-Hant-HK": path,
          "en-US": enPath,
          "x-default": path,
        },
      }),
    },
    openGraph: {
      title: `${category}文章｜Otto Notes`,
      description: `瀏覽 Otto Notes 的${category}相關文章與實用資訊。`,
      url: path,
      locale: "zh_HK",
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <PostCollection
      locale="zh-Hant-HK"
      category={decodeURIComponent(params.cat)}
    />
  );
}
