interface BlogData {
    data: {
      zhHantHKBlogs: { items: Array<{ slug: string }> };
      enBlogs: { items: Array<{ slug: string }> };
    };
  }
  
  interface SlugPair {
    enSlug: string;
    zhSlug: string;
  }
  
  export function createSlugPairs(data: BlogData): SlugPair[] {
    const zhSlugs = data.data.zhHantHKBlogs.items.map(item => item.slug);
    const enSlugs = data.data.enBlogs.items.map(item => item.slug);
    
    // Assuming the order of slugs in both arrays corresponds to each other
    return enSlugs.map((enSlug, index) => ({
      enSlug,
      zhSlug: zhSlugs[index] || '' // Use empty string if no corresponding zh slug
    }));
  }
  export function findOtherLocaleSlug(currentLocale: string, slug: string, data: SlugPair[]): string | undefined {
    console.log("findOtherLocaleSlug", currentLocale, slug)
    for (const pair of data) {
      if (currentLocale === "en" && pair.enSlug === slug) {
        return pair.zhSlug;
      }
      if (currentLocale === "zh-Hant-HK" && pair.zhSlug === slug) {
        return pair.enSlug;
      }
    }
    return undefined; // Return undefined if no match is found
  }