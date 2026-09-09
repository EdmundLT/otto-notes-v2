"use client";
import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { findCategoryPair } from "@/data/categories";
import { client } from "apollo-client";
import { gql } from "@apollo/client";
import { createSlugPairs, findOtherLocaleSlug } from "util/slug";
import Link from "next/link";

const Banner = () => {
  const { locales, slug, cat } = useParams();
  const pathname = usePathname();
  const isEnglish = locales === "en";

  const [otherLocaleSlug, setOtherLocaleSlug] = useState<string>("/");

  useEffect(() => {
    document.documentElement.lang = isEnglish ? "en" : "zh-Hant-HK";
  }, [isEnglish]);

  useEffect(() => {
    fetchOtherLocaleSlug();
  }, [cat, locales, pathname, slug]);

  const fetchOtherLocaleSlug = async () => {
    if (pathname.startsWith("/tools/")) {
      setOtherLocaleSlug(`/en${pathname}`);
    } else if (pathname.startsWith("/en/tools/")) {
      setOtherLocaleSlug(pathname.replace(/^\/en/, ""));
    } else if (cat) {
      const pair = findCategoryPair(decodeURIComponent(cat as string));
      if (pair) {
        setOtherLocaleSlug(
          isEnglish
            ? `/category/${encodeURIComponent(pair.zh)}`
            : `/en/category/${encodeURIComponent(pair.en)}`,
        );
      } else {
        setOtherLocaleSlug(isEnglish ? "/" : "/en");
      }
    } else if (slug) {
      const decodedSlug = decodeURIComponent(slug as string);
      const newLocale = locales === "en" ? "en" : "zh-Hant-HK";
      try {
        const result = await client.query({
          query: gql`
            query Query {
              enBlogs: blogsCollection(locale: "en-US") {
                items {
                  slug
                }
              }
              zhHantHKBlogs: blogsCollection(locale: "zh-Hant-HK") {
                items {
                  slug
                }
              }
            }
          `,
        });
        const slugPairs = createSlugPairs(result);
        const otherSlug = findOtherLocaleSlug(
          newLocale,
          decodedSlug,
          slugPairs,
        );
        if (newLocale === "en") {
          setOtherLocaleSlug(`/post/${otherSlug}`);
        } else if (newLocale === "zh-Hant-HK") {
          setOtherLocaleSlug(`/en/post/${otherSlug}`);
        }
      } catch (error) {
        console.error("Error fetching other locale slug:", error);
        setOtherLocaleSlug("");
      }
    } else if (pathname === "/tools") {
      setOtherLocaleSlug("/en/tools");
    } else if (pathname === "/en/tools") {
      setOtherLocaleSlug("/tools");
    } else if (locales === "en") {
      setOtherLocaleSlug("/");
    } else {
      setOtherLocaleSlug("/en");
    }
  };

  const primaryLinks = [
    {
      label: isEnglish ? "Blog" : "網誌",
      href: isEnglish ? "/en" : "/",
      active: pathname === (isEnglish ? "/en" : "/"),
    },
    {
      label: isEnglish ? "Tools" : "工具",
      href: isEnglish ? "/en/tools" : "/tools",
      active: pathname.startsWith(isEnglish ? "/en/tools" : "/tools"),
    },
  ];

  return (
    <header className="mb-10 flex flex-col justify-between gap-6 px-4 py-5 font-bold text-black sm:px-8 lg:flex-row lg:items-end lg:gap-8">
      <Link href={isEnglish ? "/en" : "/"} className="select-none">
        <span className="block text-5xl font-light">Otto Notes</span>
        {isEnglish ? (
          <p className="mt-2">Life in Canada</p>
        ) : (
          <p className="mt-2">加拿大生活大小事</p>
        )}
      </Link>

      <nav
        aria-label={isEnglish ? "Main navigation" : "主要導覽"}
        className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm sm:text-base"
      >
        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={link.active ? "page" : undefined}
            className={`select-none rounded-full px-4 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FB2A5] focus-visible:ring-offset-2 ${
              link.active
                ? "bg-[#1FB2A5] text-white shadow-sm"
                : "bg-[#effaf8] text-[#16877e] hover:bg-[#d9f2ef]"
            }`}
          >
            {link.label}
          </Link>
        ))}

        <span
          className="hidden h-5 w-px bg-gray-200 sm:block"
          aria-hidden="true"
        />

        <Link
          href="/contact"
          className="select-none text-[#16877e] transition hover:text-black"
        >
          {isEnglish ? "Contact" : "聯絡我們"}
        </Link>
        <Link
          href={otherLocaleSlug}
          className="select-none transition hover:text-[#1FB2A5]"
        >
          {isEnglish ? "中文" : "EN"}
        </Link>
      </nav>
    </header>
  );
};

export default Banner;
