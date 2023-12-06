"use client";
import React from "react";
import { useParams } from "next/navigation";
import { category } from "types";
import { AiOutlineGlobal } from "react-icons/ai";
import Tag from "./Tag";
const Banner = () => {
  const locales = useParams().locales;
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

  return (
    <div
      className="mb-10 flex flex-col justify-between px-10 py-5 font-bold text-black
   lg:flex-row lg:space-x-5"
    >
      <a href={locales === "zh" ? "/zh" : "/"} className="select-none">
        <h1 className="text-5xl font-light">Otto Notes</h1>
        {locales === "zh" ? (
          <h2 className="mt-5 pt-2 md:mt-0">加拿大生活大小事</h2>
        ) : (
          <h2 className="mt-5 pt-2 md:mt-0">Life in Canada</h2>
        )}
      </a>
      <div className="flex space-x-4 pt-4">
        {categories.map((cat: category) => {
          if (locales === "zh") {
            return (
              <div key={cat.slug}>
                <Tag category={cat.title} slug={cat.title} locale="zh" />
              </div>
            );
          } else {
            return (
              <div key={cat.slug}>
                <Tag category={cat.slug} slug={cat.slug} />
              </div>
            );
          }
        })}
        {locales === "zh" ? <a href="/" className="pl-1 select-none  hover:text-[#1FB2A5]">EN</a> : <a href="/zh" className="pl-1 select-none  hover:text-[#1FB2A5]">中文</a>}
      </div>
    </div>
  );
};

export default Banner;
