"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { category } from "types";
import { AiOutlineGlobal } from "react-icons/ai";
import Tag from "./Tag";
import { client } from "apollo-client";
import { gql } from "@apollo/client";
import { createSlugPairs, findOtherLocaleSlug } from "util/slug";
import Link from "next/link";

const Banner = () => {
  const { locales, slug } = useParams();

  const [currentLocale, setCurrentLocale] = useState<string>("zh-Hant-HK");
  const [currentSlug, setCurrentSlug] = useState<string>("");
  const [otherLocaleSlug, setOtherLocaleSlug] = useState<string>("/");

  useEffect(() => {
    const newLocale = locales === "en" ? "en" : "zh-Hant-HK";    
    setCurrentLocale(newLocale);
    fetchOtherLocaleSlug();
  }, [locales, slug]);

  const fetchOtherLocaleSlug = async () => {
    if (slug) {
      const decodedSlug = decodeURIComponent(slug as string);
      const newLocale = locales === "en" ? "en" : "zh-Hant-HK";
      console.log("locales",newLocale)
      setCurrentLocale(newLocale);
      setCurrentSlug(decodedSlug)
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
        const slugPairs = createSlugPairs(result)
        console.log("Query result:", findOtherLocaleSlug(newLocale, decodedSlug, slugPairs));
        const otherSlug = findOtherLocaleSlug(newLocale, decodedSlug, slugPairs)
        if (newLocale === "en") {
          setOtherLocaleSlug(`/post/${otherSlug}`)
        }
        else if (newLocale === "zh-Hant-HK") {
          setOtherLocaleSlug(`/en/post/${otherSlug}`)
        }
      } catch (error) {
        console.error("Error fetching other locale slug:", error);
        setOtherLocaleSlug(""); // Set to empty string on error
      }
    }
    else {
      if (locales === 'en') {
        setOtherLocaleSlug("/")
      }
      else {
        setOtherLocaleSlug("/en")
      }
    }
  };

  const categories: category[] = [
    {
      title: "移民",
      slug: "Immigrant",
    },
    {
      title: "生活",
      slug: "Life",
    },
    {
      title: "工作",
      slug: "Working",
    },
    {
      title: "讀書",
      slug: "Study",
    },
  ];

  console.log("Current Locale:", currentLocale);
  console.log("Current Slug:", currentSlug);
  console.log("Other Locale Slug:", otherLocaleSlug);

  return (
    <div
      className="mb-10 flex flex-col justify-between px-10 py-5 font-bold text-black
   lg:flex-row lg:space-x-5"
    >
      <a href={locales === "en" ? "/en" : "/"} className="select-none">
        <h1 className="text-5xl font-light">Otto Notes</h1>
        {locales === "en" ? (
          <h2 className="mt-5 pt-2 md:mt-0">Life in Canada</h2>
        ) : (
          <h2 className="mt-5 pt-2 md:mt-0">加拿大生活大小事</h2>
        )}
      </a>
      <div className="flex space-x-4 pt-4">
        {currentLocale === "en" ? <Link href={"/contact"} className="pl-1 select-none text-[#1FB2A5] hover:text-black">
        Contact Us
        </Link> : <Link href={"/contact"} className="pl-1 select-none text-[#1FB2A5] hover:text-black">
        聯絡我們
        </Link>}
        
      
        {categories.map((cat: category) => {
          if (currentLocale === "en") {
            return (
              <div key={cat.slug}>
                <Tag category={cat.slug} slug={cat.slug} locale="en" />
              </div>
            );
          } else {
            return (
              <div key={cat.slug}>
                <Tag category={cat.title} slug={cat.title} />
              </div>
            );
          }
        })}
        {currentLocale === "en" ? 
          <a href={otherLocaleSlug} className="pl-1 select-none hover:text-[#1FB2A5]">中文</a> 
          :
          <a href={otherLocaleSlug} className="pl-1 select-none hover:text-[#1FB2A5]">EN</a>}
      </div>
    </div>
  );
};

export default Banner;
