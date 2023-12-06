/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    domains: [
      {
        domain: "website.com",
        defaultLocale: "en",
      },
      {
        domain: "website.fr",
        defaultLocale: "fr",
      },
    ],
  },
};

export default config;
