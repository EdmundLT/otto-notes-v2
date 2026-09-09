import { ToolDefinition } from "@/data/tools";
import { Metadata } from "next";

export function createToolMetadata(
  tool: ToolDefinition,
  locale: "en" | "zh",
): Metadata {
  const isEnglish = locale === "en";
  const path = `${isEnglish ? "/en" : ""}/tools/${tool.slug}`;
  const alternatePath = `${isEnglish ? "" : "/en"}/tools/${tool.slug}`;

  return {
    title: tool.title[locale],
    description: tool.description[locale],
    alternates: {
      canonical: path,
      languages: {
        "zh-Hant-HK": isEnglish ? alternatePath : path,
        "en-US": isEnglish ? path : alternatePath,
        "x-default": isEnglish ? alternatePath : path,
      },
    },
    openGraph: {
      type: "website",
      url: path,
      locale: isEnglish ? "en_CA" : "zh_HK",
      title: `${tool.title[locale]} | Otto Notes`,
      description: tool.description[locale],
    },
  };
}
