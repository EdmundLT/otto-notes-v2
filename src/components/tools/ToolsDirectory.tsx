import { toolCategoryLabels, tools } from "@/data/tools";
import { absoluteUrl, safeJsonLd } from "@/lib/site";
import Link from "next/link";
import Script from "next/script";

type ToolsDirectoryProps = {
  locale: "en" | "zh";
};

export default function ToolsDirectory({ locale }: ToolsDirectoryProps) {
  const isEnglish = locale === "en";
  const basePath = isEnglish ? "/en/tools" : "/tools";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isEnglish ? "Tools" : "實用工具",
    url: absoluteUrl(basePath),
    inLanguage: isEnglish ? "en-US" : "zh-Hant-HK",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title[locale],
        url: absoluteUrl(`${basePath}/${tool.slug}`),
      })),
    },
  };

  return (
    <section className="px-4 pb-16 sm:px-8" aria-labelledby="tools-title">
      <Script
        id="tools-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
      />
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#16877e]">
          Otto Notes
        </p>
        <h1
          id="tools-title"
          className="font-sans text-3xl font-semibold text-gray-950 sm:text-4xl"
        >
          {isEnglish ? "Tools" : "實用工具"}
        </h1>
      </header>

      {tools.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-[#bde5e1] bg-[#effaf8] px-6 py-16 text-center sm:px-12">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#1FB2A5]/10" />
          <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[#1FB2A5]/10" />
          <div className="relative">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1FB2A5] text-2xl text-white shadow-lg shadow-[#1FB2A5]/20">
              ✦
            </span>
            <h2 className="mt-6 text-2xl font-semibold text-gray-950">
              {isEnglish ? "The toolbox is coming soon" : "工具箱準備中"}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-gray-600">
              {isEnglish
                ? "Automotive, finance, and math calculators will be added here."
                : "汽車、財務與數學計算器將會陸續加入。"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.slug}
              className="group flex rounded-2xl border border-gray-200 bg-white p-6 transition duration-200 focus-within:-translate-y-1 focus-within:shadow-xl hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`${isEnglish ? "/en" : ""}/tools/${tool.slug}`}
                className="flex w-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FB2A5] focus-visible:ring-offset-4"
              >
                <span className="w-fit rounded-full bg-[#effaf8] px-3 py-1 text-xs font-semibold text-[#16877e]">
                  {toolCategoryLabels[tool.category][locale]}
                </span>
                <h2 className="mt-5 text-xl font-semibold text-gray-950 group-hover:text-[#16877e]">
                  {tool.title[locale]}
                </h2>
                <p className="mt-3 flex-1 text-gray-600">
                  {tool.description[locale]}
                </p>
                <span className="mt-6 font-semibold text-[#16877e]">
                  {isEnglish ? "Open tool →" : "開啟工具 →"}
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
