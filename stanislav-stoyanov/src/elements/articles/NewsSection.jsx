import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import Footer from "../footer/Footer";
import newsData from "../../generated/news.json";

const DATE_FORMATTER = new Intl.DateTimeFormat("bg-BG", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const resolveImageSrc = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `https:${src.replace(/^\/+/, "")}`;
};

const normalizeBody = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((paragraph) => typeof paragraph === "string" && paragraph.trim());
  }
  if (typeof value === "string" && value.trim()) return [value];
  return [];
};

const extractLeadBlurb = (article) => {
  if (!article) return "";
  const source =
    typeof article.excerpt === "string" && article.excerpt.trim()
      ? article.excerpt
      : Array.isArray(article.body)
        ? article.body.join(" ")
        : "";
  if (!source) return "";

  const [sentence] = source.split(".").map((part) => part.trim()).filter(Boolean);
  if (!sentence) return "";
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
};

const rawArticles = Array.isArray(newsData?.items) ? newsData.items : [];

const articles = rawArticles
  .map((article, index) => {
    const slug = article.slug ?? `article-${index}`;
    const publishedAtString = typeof article.publishedAt === "string" ? article.publishedAt : null;
    const publishedAt = publishedAtString ? Date.parse(publishedAtString) : null;
    const formattedDate =
      publishedAt && !Number.isNaN(publishedAt) ? DATE_FORMATTER.format(publishedAt) : "";

    const heroImageUrl = resolveImageSrc(
      article.heroImage?.url ?? article.heroImageUrl ?? "",
    );

    return {
      id: article.id ?? slug,
      slug,
      title: article.title ?? "?????",
      subtitle: article.subtitle ?? "",
      heroImageUrl,
      heroImageAlt: article.heroImage?.alt ?? article.heroImageAlt ?? article.title ?? "",
      excerpt: article.excerpt ?? "",
      blurb: extractLeadBlurb(article),
      rawBody: article.rawBody ?? null,
      body: normalizeBody(article.body),
      publishedAt,
      publishedAtString,
      formattedDate,
    };
  })
  .filter((article) => Boolean(article.slug) && Boolean(article.title));

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="text-pretty">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-wide text-emerald-900">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="mt-10 text-xl font-semibold tracking-wide text-emerald-900">
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="list-disc space-y-3 pl-6 text-pretty">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="list-decimal space-y-3 pl-6 text-pretty">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className="text-emerald-700 underline underline-offset-4 transition hover:text-emerald-900"
        target={node.data.uri?.startsWith("http") ? "_blank" : undefined}
        rel={node.data.uri?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

const buildArticleShareUrl = (slug) => {
  if (!slug) return "";

  const baseUrl =
    typeof import.meta !== "undefined" && import.meta.env?.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";

  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const relativePath = `${normalizedBase}/news/${slug}` || `/news/${slug}`;

  if (typeof window === "undefined") {
    return relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  }

  try {
    return new URL(relativePath, window.location.origin).toString();
  } catch {
    const prefix = relativePath.startsWith("/") ? "" : "/";
    return `${window.location.origin}${prefix}${relativePath}`;
  }
};

const SOCIAL_PLATFORMS = [
  {
    name: "Facebook",
    buildHref: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
        <path
          d="M9.6 6.002V4.884c0-.54.13-.812.94-.812h1.094V2h-1.75C7.95 2 7.2 2.818 7.2 4.422v1.58H5.6V8h1.6v6h2V8h1.586L11.2 6.002H9.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Twitter",
    buildHref: (url) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
        <path
          d="M13.8 4.312a4.63 4.63 0 0 1-1.323.363 2.31 2.31 0 0 0 1.015-1.275 4.64 4.64 0 0 1-1.466.56 2.3 2.3 0 0 0-3.918 1.57c0 .18.02.356.06.523-1.91-.095-3.603-1.01-4.737-2.402a2.283 2.283 0 0 0-.312 1.156 2.3 2.3 0 0 0 1.023 1.914 2.29 2.29 0 0 1-1.042-.288v.03a2.3 2.3 0 0 0 1.846 2.252 2.32 2.32 0 0 1-1.04.04 2.302 2.302 0 0 0 2.148 1.596 4.616 4.616 0 0 1-2.853.983c-.185 0-.366-.01-.546-.03A6.53 6.53 0 0 0 6.196 13c4.196 0 6.492-3.477 6.492-6.49 0-.099-.002-.196-.007-.293a4.64 4.64 0 0 0 1.12-1.205Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    buildHref: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
        <path
          d="M4.178 13H2V5.667h2.178V13Zm-.26-8.433a1.298 1.298 0 0 1-1.32-1.28c0-.7.573-1.287 1.32-1.287.747 0 1.313.588 1.327 1.287a1.3 1.3 0 0 1-1.327 1.28Zm10.082 8.433h-2.177V9.446c0-.848-.303-1.428-1.062-1.428-.58 0-.925.39-1.077.766-.056.135-.07.324-.07.513V13H7.438s.029-5.788 0-6.333h2.176v.896c.289-.445.806-1.081 1.958-1.081 1.429 0 2.428.936 2.428 2.946V13Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const NewsSection = ({
  showBackLink = true,
  initialSlug = null,
  onActiveSlugChange = () => {},
} = {}) => {
  const sectionRef = useRef(null);
  const [activeSlug, setActiveSlug] = useState(initialSlug);

  useEffect(() => {
    setActiveSlug(initialSlug ?? null);
  }, [initialSlug]);

  const leadArticle = articles[0] ?? null;
  const secondaryArticles = articles.slice(1, 5);

  const activeArticle = useMemo(() => {
    if (!activeSlug) return null;
    return articles.find((article) => article.slug === activeSlug) ?? null;
  }, [activeSlug]);

  const fallbackParagraphs = useMemo(() => {
    if (!activeArticle) return [];
    if (Array.isArray(activeArticle.body) && activeArticle.body.length > 0) {
      return activeArticle.body;
    }
    if (activeArticle.excerpt) return [activeArticle.excerpt];
    return [];
  }, [activeArticle]);

  const shareUrl = useMemo(
    () => (activeArticle ? buildArticleShareUrl(activeArticle.slug) : ""),
    [activeArticle],
  );

  const shareLinks = useMemo(() => {
    if (!shareUrl) return [];
    return SOCIAL_PLATFORMS.map((platform) => ({
      name: platform.name,
      href: platform.buildHref(shareUrl),
      icon: platform.icon,
    }));
  }, [shareUrl]);

  const handleOpenArticle = (slug) => {
    if (!slug || slug === activeSlug) return;
    setActiveSlug(slug);
    onActiveSlugChange(slug);
  };

  const handleCloseArticle = () => {
    if (activeSlug === null) return;
    setActiveSlug(null);
    onActiveSlugChange(null);
  };

  useEffect(() => {
    if (!activeSlug || !sectionRef.current) return;
    if (typeof sectionRef.current.scrollIntoView !== "function") return;
    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeSlug]);

  if (!articles.length) {
    return (
      <>
        <section
          id="news"
          className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <p className="text-sm text-emerald-900/70">??? ??? ???? ??????????? ??????.</p>
          </div>
        </section>
        {showBackLink && <Footer />}
      </>
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="news"
        className="bg-gradient-to-b from-white via-emerald-50 to-emerald-100 py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          {showBackLink && (
            <div className="mb-8 flex justify-end">
              <Link
                to="/"
                className="inline-flex items-center gap-3 border border-emerald-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-900 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                <span aria-hidden="true" className="text-xl leading-none text-emerald-500">
                  &larr;
                </span>
                <span>Назад към началото</span>
              </Link>
            </div>
          )}

          <div className="relative">
            {activeArticle ? (
              <article
                className="relative mx-auto max-w-3xl text-emerald-900"
                style={{ fontFamily: "'PT Serif', serif" }}
              >
                <div className="flex w-full justify-end pb-6">
                  <button
                    type="button"
                    onClick={handleCloseArticle}
                    className="bg-emerald-600 px-4 py-3 text-white shadow-lg transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                    aria-label="Close article"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M3.22 3.22a.75.75 0 0 1 1.06 0L7 5.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L8.06 7l2.72 2.72a.75.75 0 0 1-1.06 1.06L7 8.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L5.94 7 3.22 4.28a.75.75 0 0 1 0-1.06Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <header className="space-y-4">
                  <time
                    className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600/80"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                  >
                    {activeArticle.formattedDate || activeArticle.publishedAtString || ""}
                  </time>
                  <h2
                    className="text-3xl font-bold uppercase tracking-wide md:text-4xl"
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
                  >
                    {activeArticle.title}
                  </h2>
                  {activeArticle.excerpt && (
                    <p className="text-base text-emerald-800 md:text-lg">
                      {activeArticle.excerpt}
                    </p>
                  )}
                  {shareLinks.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-emerald-700">
                      {shareLinks.map(({ name, href, icon }) => (
                        <a
                          key={name}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 w-9 items-center justify-center border border-emerald-200 bg-white text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                          aria-label={`Share on ${name}`}
                        >
                          {icon}
                          <span className="sr-only">Share on {name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                  {activeArticle.subtitle && (
                    <p className="text-base italic text-emerald-800 md:text-lg">
                      {activeArticle.subtitle}
                    </p>
                  )}
                  {activeArticle.heroImageUrl && (
                    <figure className="overflow-hidden border border-emerald-100">
                      <img
                        src={activeArticle.heroImageUrl}
                        alt={activeArticle.heroImageAlt}
                        className="w-full object-cover object-top"
                        loading="lazy"
                      />
                    </figure>
                  )}
                </header>

                <section className="mt-8 space-y-6 text-lg leading-8 text-emerald-900 md:text-[1.25rem] md:leading-[2.2rem]">
                  {activeArticle.rawBody
                    ? documentToReactComponents(activeArticle.rawBody, richTextOptions)
                    : fallbackParagraphs.map((paragraph, index) => (
                        <p key={index} className="text-pretty">
                          {paragraph}
                        </p>
                      ))}
                </section>
              </article>
            ) : (
              <div className="space-y-10 text-emerald-900">
                {leadArticle && (
                  <button
                    type="button"
                    onClick={() => handleOpenArticle(leadArticle.slug)}
                    className="group relative block w-full overflow-hidden bg-emerald-950 shadow-2xl shadow-emerald-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                  >
                    {leadArticle.heroImageUrl && (
                      <img
                        src={leadArticle.heroImageUrl}
                        alt={leadArticle.heroImageAlt}
                        className="h-96 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 text-left text-white">
                      <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                        {leadArticle.formattedDate || leadArticle.publishedAtString || ""}
                      </time>
                      <h3 className="mt-3 text-3xl font-semibold">{leadArticle.title}</h3>
                      {leadArticle.blurb && (
                        <p className="mt-4 text-base text-green-100/90">{leadArticle.blurb}</p>
                      )}
                    </div>
                  </button>
                )}

                {secondaryArticles.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {secondaryArticles.map((article) => (
                      <button
                        key={article.slug}
                        type="button"
                        onClick={() => handleOpenArticle(article.slug)}
                        className="group relative block overflow-hidden bg-white shadow-xl shadow-emerald-200/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                      >
                        {article.heroImageUrl ? (
                          <img
                            src={article.heroImageUrl}
                            alt={article.heroImageAlt}
                            className="h-72 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-72 w-full bg-emerald-100" aria-hidden="true" />
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 text-left text-white">
                          <time className="text-xs font-semibold uppercase tracking-[0.4em] text-green-200/80">
                            {article.formattedDate || article.publishedAtString || ""}
                          </time>
                          <h3 className="mt-3 text-2xl font-semibold">{article.title}</h3>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {showBackLink && <Footer />}
    </>
  );
};

export default NewsSection;
