export type ToolCategory = "automotive" | "finance" | "math";

export type ToolDefinition = {
  slug: string;
  category: ToolCategory;
  image?: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
};

// Add a registry entry here after creating the tool's own pages at:
// src/app/tools/[tool-slug]/page.tsx
// src/app/[locales]/tools/[tool-slug]/page.tsx
// Each page can use ToolPageShell for responsive layout and createToolMetadata
// for canonical URLs, language alternates, and social sharing metadata.
export const tools: ToolDefinition[] = [
  {
    slug: "car-ownership-cost-calculator",
    category: "automotive",
    image: "/images/tools/car-ownership-cost-calculator.png",
    title: {
      zh: "養車費用計算機2026",
      en: "Car ownership cost calculator",
    },
    description: {
      zh: "香港養車費用計算機2026：按車款、年份及油耗計算每月油費、牌費、保險、停車、保養及全年養車開支。",
      en: "Hong Kong car ownership cost calculator: estimate monthly fuel, licence, insurance, parking, maintenance and annual running costs by model and year.",
    },
  },
];

export const toolCategoryLabels: Record<
  ToolCategory,
  { en: string; zh: string }
> = {
  automotive: { en: "Automotive", zh: "汽車" },
  finance: { en: "Finance", zh: "財務" },
  math: { en: "Math", zh: "數學" },
};
