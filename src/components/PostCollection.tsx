import { ContentLocale, getPosts } from "@/lib/contentful";
import { absoluteUrl, safeJsonLd } from "@/lib/site";
import Link from "next/link";
import Script from "next/script";

type PostCollectionProps = {
  locale: ContentLocale;
  category?: string;
};

export default async function PostCollection({
  locale,
  category,
}: PostCollectionProps) {
  const isEnglish = locale === "en-US";
  const posts = await getPosts(locale, category);
  const title = category || (isEnglish ? "Our Blog" : "網誌文章");

  const description = isEnglish
    ? "Stories and practical notes about life in Canada."
    : "分享加拿大生活、工作、讀書與移民大小事。";
  const basePath = isEnglish ? "/en" : "/";
  const collectionPath = category
    ? `${isEnglish ? "/en" : ""}/category/${encodeURIComponent(category)}`
    : basePath;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(collectionPath),
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(
          `${isEnglish ? "/en" : ""}/post/${encodeURIComponent(post.slug)}`,
        ),
      })),
    },
  };

  return (
    <section className="px-4 pb-16 sm:px-8" aria-labelledby="collection-title">
      <Script
        id="collection-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionJsonLd) }}
      />
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#16877e]">
          Otto Notes
        </p>
        <h1
          id="collection-title"
          className="font-sans text-3xl font-semibold text-gray-950 sm:text-4xl"
        >
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            {description}
          </p>
        )}
      </header>

      {posts.length === 0 ? (
        <p className="rounded-2xl bg-gray-50 px-6 py-12 text-center text-gray-600">
          {isEnglish ? "No articles found." : "目前沒有相關文章。"}
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group flex overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 transition duration-200 focus-within:-translate-y-1 focus-within:shadow-xl hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`${isEnglish ? "/en" : ""}/post/${post.slug}`}
                className="flex w-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1FB2A5]"
              >
                <img
                  className="h-56 w-full object-cover"
                  src={post.mainImage.url}
                  alt={post.mainImage.title || post.title}
                  width={post.mainImage.width}
                  height={post.mainImage.height}
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="flex flex-1 flex-col px-4 py-5">
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="select-none rounded-full bg-[#1FB2A5] px-3 py-1 text-xs font-semibold text-white"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-3 mt-4 text-xl font-semibold leading-snug group-hover:text-[#16877e]">
                    {post.title}
                  </h2>
                  <p className="line-clamp-3 text-base font-light text-gray-600">
                    {post.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
