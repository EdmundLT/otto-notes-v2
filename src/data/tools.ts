export type ToolCategory = "automotive" | "finance" | "math";

export type ToolDefinition = {
  slug: string;
  category: ToolCategory;
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
export const tools: ToolDefinition[] = [];

export const toolCategoryLabels: Record<
  ToolCategory,
  { en: string; zh: string }
> = {
  automotive: { en: "Automotive", zh: "汽車" },
  finance: { en: "Finance", zh: "財務" },
  math: { en: "Math", zh: "數學" },
};
