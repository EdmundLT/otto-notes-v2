import ToolsDirectory from "@/components/tools/ToolsDirectory";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleProps } from "types";

export const metadata: Metadata = {
  title: "Tools",
  description: "Useful calculators and references for everyday life in Canada.",
  alternates: {
    canonical: "/en/tools",
    languages: {
      "zh-Hant-HK": "/tools",
      "en-US": "/en/tools",
      "x-default": "/tools",
    },
  },
  openGraph: {
    title: "Tools | Otto Notes",
    description:
      "Useful calculators and references for everyday life in Canada.",
    url: "/en/tools",
    locale: "en_CA",
  },
};

export default function ToolsPage({ params }: LocaleProps) {
  if (decodeURIComponent(params.locales) !== "en") notFound();

  return <ToolsDirectory locale="en" />;
}
