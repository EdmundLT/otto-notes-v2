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
      zh: "香港養車費用計算機2026：搜尋車款及年份，自動估算牌費、油費、充電、保險、停車及保養的每月與每年開支。",
      en: "Estimate monthly and annual car ownership costs in Hong Kong by model and year, including licence, fuel, charging, insurance, parking and maintenance.",
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
