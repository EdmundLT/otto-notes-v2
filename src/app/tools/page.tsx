import ToolsDirectory from "@/components/tools/ToolsDirectory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "實用工具",
  description: "免費實用線上工具與計算器。",
  alternates: {
    canonical: "/tools",
    languages: {
      "zh-Hant-HK": "/tools",
      "en-US": "/en/tools",
      "x-default": "/tools",
    },
  },
  openGraph: {
    title: "實用工具｜Otto Notes",
    description: "免費實用線上工具與計算器。",
    url: "/tools",
    locale: "zh_HK",
  },
};

export default function ToolsPage() {
  return <ToolsDirectory locale="zh" />;
}
