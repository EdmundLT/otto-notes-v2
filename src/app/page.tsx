import PostCollection from "@/components/PostCollection";
import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "zh-Hant-HK": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    url: "/",
    locale: "zh_HK",
    title: "Otto Notes｜加拿大生活、移民資訊與實用工具",
    description: siteConfig.zhDescription,
  },
};

export default function Home() {
  return <PostCollection locale="zh-Hant-HK" />;
}
