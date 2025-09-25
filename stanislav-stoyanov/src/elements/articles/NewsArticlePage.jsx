import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { usePreviewMode } from "../../hooks/usePreviewMode";
import { fetchNewsBySlug } from "../../lib/newsQueries";
import { getNewsBySlug } from "../data/news";
import { urlFor } from "../../lib/imageBuilder";

const resolveLegacyImageSrc = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  const normalized = src.replace(/^\/+/, "");
  const withoutPublic = normalized.startsWith("public/")
    ? normalized.slice("public/".length)
    : normalized;
    return `${import.meta.env.BASE_URL}${withoutPublic}`;
};

const NewsArticlePage = () => {
  const { slug } = useParams();
  const preview = usePreviewMode();

  const initialArticle = slug ? getNewsBySlug(slug) : null;
  const [article, setArticle] = useState(initialArticle);
  const [isLoading, setIsLoading] = useState(!initialArticle);

  useEffect(() => {
    let isActive = true;

    if (!slug) {
      setArticle(null);
      setIsLoading(false);
      return () => {
        isActive = false;
      };
    }

    const fallbackArticle = getNewsBySlug(slug);
    setArticle(fallbackArticle || null);
    setIsLoading(!fallbackArticle);

    fetchNewsBySlug(slug, { preview })
      .then((freshArticle) => {
        if (!isActive) return;
        if (freshArticle) {
          setArticle(freshArticle);
        } else if (!fallbackArticle) {
          setArticle(null);
        }
      })
      .catch((error) => {
        console.error("Failed to load article", error);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [slug, preview]);

  if (isLoading && !article) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-green-900">
        <p className="text-lg">Loading article…</p>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center text-green-900">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-4">
          The piece you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/news"
          className="mt-6 inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back to news archive</span>
        </Link>
      </main>
    );
  }

  const imageUrl = article.image
    ? urlFor(article.image).width(1200).quality(80).url()
    : article.imageSrc
      ? resolveLegacyImageSrc(article.imageSrc)
      : null;

  const isPortableTextArray = Array.isArray(article.body)
    && article.body.some((block) => block && typeof block === "object" && "_type" in block);

  const fallbackParagraphs = !isPortableTextArray
    ? (Array.isArray(article.body) ? article.body : [article.excerpt].filter(Boolean))
    : [];

  return (
    <article className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16 text-green-900">
      <div className="mx-auto max-w-4xl px-6">
        <header>
          <time className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600/80">
            {article.date}
          </time>
          <h1 className="mt-4 text-4xl font-sans font-bold uppercase tracking-wide">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mt-3 text-[1.55rem] italic text-emerald-800">
              {article.subtitle}
            </p>
          )}
          {imageUrl && (
            <figure className="mt-8 overflow-hidden shadow-xl">
              <img
                src={imageUrl}
                alt={article.image?.altText || article.imageAlt || ""}
                className="w-full object-cover object-top"
                loading="lazy"
              />
            </figure>
          )}
        </header>

        <section className="mt-10 space-y-7 font-sans text-[1.25rem] leading-[2.1rem] text-emerald-900 md:text-[1.45rem] md:leading-[2.6rem]">
          {isPortableTextArray ? (
            <PortableText value={article.body} />
          ) : (
            fallbackParagraphs.map((paragraph, index) => (
              <p key={index} className="text-pretty">
                {paragraph}
              </p>
            ))
          )}
        </section>

        <nav className="mt-12">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700 hover:text-emerald-900"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to news archive</span>
          </Link>
        </nav>
      </div>
    </article>
  );
};

export default NewsArticlePage;
