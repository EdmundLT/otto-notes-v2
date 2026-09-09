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

export type ContentfulAsset = {
  sys: { id: string };
  title: string;
  description?: string;
  url: string;
  width?: number;
  height?: number;
};

export type BlogPost = {
  title: string;
  body: {
    json: Document;
    links: { assets: { block: ContentfulAsset[] } };
  };
  slug: string;
  enSlug: string;
  zhSlug: string;
  categories: string[];
  mainImage: {
    url: string;
    title: string;
    width?: number;
    height?: number;
  };
  description: string;
  createdAt: string;
  qa: qa[];
  questionAndAnswerCollection: {
    items: qa[];
  };
};

export type QuestionAndAnswer = {
  items: qa[];
};

export type category = {
  title: string;
  slug: string;
};
