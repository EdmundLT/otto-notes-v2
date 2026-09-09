export const blogCategories = [
  { zh: "生活", en: "Life" },
  { zh: "移民", en: "Immigrant" },
  { zh: "讀書", en: "Study" },
  { zh: "工作", en: "Working" },
] as const;

export function findCategoryPair(category: string) {
  return blogCategories.find(
    (item) =>
      item.zh === category || item.en.toLowerCase() === category.toLowerCase(),
  );
}
