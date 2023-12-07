import React from "react";
import "styles/globals.css";

const about = () => {
  return (
    <div className="mx-auto max-w-full bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="px-4 py-9 2xl:container md:px-6 md:py-12 lg:px-20 lg:py-16 2xl:mx-auto">
          <div className="flex flex-col justify-between gap-8 lg:flex-row">
            <div className="flex w-full flex-col justify-center">
              <h1 className="pb-4 text-2xl leading-9 text-gray-800 dark:text-black lg:text-3xl">
                關於我們
              </h1>
              <p className="text-base font-normal leading-6 text-gray-600 dark:text-black">
                這個 Blog
                主要記載我們在加拿大的生活、工作、唸書以及分享一些職場資訊。我們希望透過文字來紀錄這個移民的過程，讓有需要的朋友可以參考。
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 pt-12 lg:flex-row">
            <div className="flex w-full flex-col justify-center gap-y-2">
              <h1 className="pb-4 text-2xl leading-9 text-gray-800 dark:text-black lg:text-3xl">
                我們的故事
              </h1>
              <p className="text-base font-normal leading-6 text-gray-600 dark:text-black">
                我們是一對情侶，在 2021
                年離開香港移民到加拿大，目前在多倫多生活。男生目前是加拿大某一間銀行的軟體工程師，女生則是廣告公司的數據分析師。
              </p>
              <p className="text-base font-normal leading-6 text-gray-600 dark:text-black">
                至於這個 Blog 的名字為什麼是 Otto
                呢？是因為我們養的小貓咪就叫這個名字 ：）
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
