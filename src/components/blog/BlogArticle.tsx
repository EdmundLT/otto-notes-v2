import { AccordionDemo } from "@/components/BlogComponent/QandA";
import { ContentLocale, getPost } from "@/lib/contentful";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type BlogArticleProps = {
  locale: ContentLocale;
  slug: string;
};

export default async function BlogArticle({ locale, slug }: BlogArticleProps) {
  const blog = await getPost(locale, slug);
  if (!blog) notFound();

  const isEnglish = locale === "en-US";
  const assetMap = new Map(
    blog.body.links.assets.block.map((asset) => [asset.sys.id, asset]),
  );
  const richTextOptions = {
    renderNode: {
      [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => (
        <h2 className="mt-10 text-3xl font-semibold leading-tight text-gray-950">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
        <h2 className="mt-10 text-2xl font-semibold leading-tight text-gray-950">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
        <h3 className="mt-8 text-xl font-semibold text-gray-950">{children}</h3>
      ),
      [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
        <p className="leading-8">{children}</p>
      ),
      [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
        <ol className="list-decimal space-y-2 pl-6">{children}</ol>
      ),
      [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
        <ul className="list-disc space-y-2 pl-6">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => (
        <li className="pl-1">{children}</li>
      ),
      [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (
        <a
          className="font-medium text-[#147c74] underline decoration-[#1FB2A5]/40 underline-offset-4 hover:text-black"
          href={node.data.uri}
        >
          {children}
        </a>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = assetMap.get(node.data.target.sys.id);
        if (!asset) return null;

        return (
          <figure className="my-8">
            <img
              className="h-auto w-full rounded-2xl object-contain"
              src={asset.url}
              alt={asset.description || asset.title}
              width={asset.width}
              height={asset.height}
              loading="lazy"
            />
            {asset.description && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {asset.description}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };
  const questions = blog.questionAndAnswerCollection?.items ?? [];

  return (
    <article className="px-4 pb-16 sm:px-8">
      <header className="mx-auto max-w-4xl pt-4 text-center">
        <Link
          href={isEnglish ? "/en" : "/"}
          className="text-sm font-semibold text-[#16877e] hover:text-black"
        >
          {isEnglish ? "← Back to blog" : "← 返回網誌"}
        </Link>
        <p className="mt-6 text-sm text-gray-500">
          {isEnglish ? "Published " : "發布於 "}
          <time dateTime={blog.createdAt}>
            {new Date(blog.createdAt).toLocaleDateString(
              isEnglish ? "en-CA" : "zh-HK",
              { day: "numeric", month: "long", year: "numeric" },
            )}
          </time>
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
          {blog.title}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          {blog.description}
        </p>
        <div
          className="mt-6 flex flex-wrap justify-center gap-2"
          aria-label={isEnglish ? "Article categories" : "文章分類"}
        >
          {blog.categories.map((category) => (
            <Link
              key={category}
              href={`${isEnglish ? "/en" : ""}/category/${encodeURIComponent(
                category,
              )}`}
              className="rounded-full bg-[#effaf8] px-3 py-1 text-sm font-medium text-[#147c74] hover:bg-[#d9f2ef]"
            >
              {category}
            </Link>
          ))}
        </div>
        <img
          className="mt-8 h-auto max-h-[34rem] w-full rounded-3xl object-contain"
          src={blog.mainImage.url}
          alt={blog.mainImage.title || blog.title}
          width={blog.mainImage.width}
          height={blog.mainImage.height}
        />
      </header>

      <div className="mx-auto mt-10 max-w-3xl space-y-6 text-lg text-gray-700">
        {documentToReactComponents(blog.body.json, richTextOptions)}
        {questions.length > 0 && (
          <section className="pt-8" aria-labelledby="faq-title">
            <h2
              id="faq-title"
              className="mb-4 text-2xl font-semibold text-gray-950"
            >
              {isEnglish ? "Frequently asked questions" : "常見問題"}
            </h2>
            <AccordionDemo qAndAItems={questions} />
          </section>
        )}
      </div>
    </article>
  );
}
