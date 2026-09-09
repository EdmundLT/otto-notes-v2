import { toolCategoryLabels, ToolCategory } from "@/data/tools";
import { absoluteUrl, safeJsonLd, siteConfig } from "@/lib/site";
import Link from "next/link";
import Script from "next/script";
import { ReactNode } from "react";

type ToolPageShellProps = {
  category: ToolCategory;
  children: ReactNode;
  description: string;
  locale: "en" | "zh";
  slug: string;
  title: string;
};

export default function ToolPageShell({
  category,
  children,
  description,
  locale,
  slug,
  title,
}: ToolPageShellProps) {
  const isEnglish = locale === "en";
  const toolsPath = isEnglish ? "/en/tools" : "/tools";
  const toolPath = `${toolsPath}/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: title,
        description,
        url: absoluteUrl(toolPath),
        applicationCategory: toolCategoryLabels[category].en,
        operatingSystem: "Any",
        inLanguage: isEnglish ? "en-US" : "zh-Hant-HK",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
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
            name: isEnglish ? "Tools" : "實用工具",
            item: absoluteUrl(toolsPath),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: absoluteUrl(toolPath),
          },
        ],
      },
    ],
  };

  return (
    <article className="px-4 pb-16 sm:px-8">
      <Script
        id="tool-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
      />
      <header className="mx-auto max-w-3xl text-center">
        <Link
          href={toolsPath}
          className="text-sm font-semibold text-[#16877e] hover:text-black"
        >
          {isEnglish ? "← All tools" : "← 所有工具"}
        </Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#16877e]">
          {toolCategoryLabels[category][locale]}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          {description}
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        {children}
      </div>
    </article>
  );
}
