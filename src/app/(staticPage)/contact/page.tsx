import React from "react";

import "styles/globals.css";

const about = () => {
  return (
    <div className="mx-auto max-w-full bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-screen-md px-4 py-4">
          <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 ">
            Contact Us
          </h2>
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
              <p className="mb-2 block text-sm font-medium text-gray-900">
                Your email
              </p>
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
              <p className="mb-2 block text-sm font-medium text-gray-900 ">
                Subject
              </p>
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
              <p className="mb-2 block text-sm font-medium text-gray-900">
                Your message
              </p>
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
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm"
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
