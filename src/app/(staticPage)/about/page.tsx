import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "關於我",
  description: "認識 Otto Notes：由 90 後工程師分享理財、投資與實用生活筆記。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "關於我｜Otto Notes",
    description: "認識 Otto Notes：由 90 後工程師分享理財、投資與實用生活筆記。",
    url: "/about",
    locale: "zh_HK",
  },
};

const about = () => {
  return (
    <div className="mx-auto max-w-full bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="px-4 py-9 2xl:container md:px-6 md:py-12 lg:px-20 lg:py-16 2xl:mx-auto">
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            <div className="flex w-full flex-col justify-center">
              <h1 className="pb-4 text-3xl font-semibold leading-9 text-gray-900 lg:text-4xl">
                關於我
              </h1>
              <p className="text-base font-normal leading-6 text-gray-600 dark:text-black">
                Otto Notes 是一個由 90 後工程師建立的理財筆記，分享個人理財、投資觀念、實用工具及生活中的財務決策。我希望用簡單清晰的方式整理複雜資訊，讓大家更容易掌握自己的財務狀況，作出適合自己的選擇。
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 pt-12 lg:flex-row">
            <div className="flex w-full flex-col justify-center gap-y-2">
              <h2 className="pb-4 text-2xl font-semibold leading-9 text-gray-900 lg:text-3xl">
                為甚麼寫理財筆記？
              </h2>
              <p className="text-base font-normal leading-6 text-gray-600 dark:text-black">
                作為 90 後工程師，我習慣以數據、邏輯和實際情境分析問題。Otto Notes 記錄我持續學習理財的過程，並把研究所得整理成容易理解的文章和計算工具，與同樣希望做好財務規劃的讀者分享。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
