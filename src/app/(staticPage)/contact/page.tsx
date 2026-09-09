import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "聯絡 Otto Notes，提供問題、建議或合作查詢。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "聯絡我們｜Otto Notes",
    description: "聯絡 Otto Notes，提供問題、建議或合作查詢。",
    url: "/contact",
    locale: "zh_HK",
  },
};

const about = () => {
  return (
    <div className="mx-auto max-w-full bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-screen-md px-4 py-4">
          <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900">
            Contact Us
          </h1>
          <p className="mb-8 text-center font-light text-gray-800 sm:text-xl lg:mb-16">
            歡迎使用下列表格聯絡我們
          </p>
          <form
            className="space-y-8"
            method="POST"
            data-netlify="true"
            name="contact"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm"
                placeholder="abc@123.com"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm"
                placeholder="Let us know how we can help you"
                required
              ></input>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Your message
              </label>
              <textarea
                name="message"
                id="message"
                rows={6}
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg bg-[#1FB2A5] p-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16877e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FB2A5] focus-visible:ring-offset-2"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default about;
