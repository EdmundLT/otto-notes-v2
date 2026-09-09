export const siteConfig = {
  name: "Otto Notes",
  url: "https://otto-notes.com",
  email: "ottonotes0905@gmail.com",
  zhDescription:
    "香港情侶的加拿大生活筆記，分享多倫多生活、移民、工作、讀書資訊與實用計算工具。",
  enDescription:
    "Practical notes and tools about living, working, studying, and immigrating to Canada.",
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
