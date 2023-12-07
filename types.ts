import { Document } from "@contentful/rich-text-types";

export type Props = {
  params: {
    slug: string;
  };
};

export type LocaleProps = {
  params: {
    locales: string;
  };
};
type qa = {
  question: string;
  answer: string;
};

export type BlogPost = {
  title: string;
  body: { json: Document };
  slug: string;
  categories: string[];
  mainImage: {
    url: string;
    title: string;
  };
  description: string;
  createdAt: string;
  qa: qa[];
};

export type QuestionAndAnswer = {
  items: qa[];
};

export type category = {
  title: string;
  slug: string;
};
