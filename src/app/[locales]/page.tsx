import PostCollection from "@/components/PostCollection";
import { siteConfig } from "@/lib/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleProps } from "types";

export const metadata: Metadata = {
  title: "Life in Canada",
  description: siteConfig.enDescription,
  alternates: {
    canonical: "/en",
    languages: {
      "zh-Hant-HK": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    url: "/en",
    locale: "en_CA",
    title: "Life in Canada | Otto Notes",
    description: siteConfig.enDescription,
  },
};

export default function Home({ params }: LocaleProps) {
  if (decodeURIComponent(params.locales) !== "en") notFound();

  return <PostCollection locale="en-US" />;
}
